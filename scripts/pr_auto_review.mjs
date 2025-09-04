import fs from 'node:fs';
import path from 'node:path';

const openaiKey = process.env.OPENAI_API_KEY;
const githubToken = process.env.GITHUB_TOKEN;
const repo = process.env.REPO;
const prNumber = process.env.PR_NUMBER;
const model = process.env.LLM_MODEL || 'gpt-4o-mini';

if (!openaiKey) {
  console.log('OPENAI_API_KEY is not set. Skipping AI review.');
  process.exit(0);
}

const diffPath = path.resolve('pr.diff');
const diff = fs.existsSync(diffPath) ? fs.readFileSync(diffPath, 'utf8') : '';
if (!diff.trim()) {
  console.log('Empty diff. Skipping AI review.');
  process.exit(0);
}

// Limit very large diffs
const MAX_DIFF_CHARS = 120_000;
const trimmedDiff = diff.length > MAX_DIFF_CHARS ? diff.slice(0, MAX_DIFF_CHARS) + '\n\n[diff truncated]' : diff;

const systemPrompt =
  'You are a senior code reviewer. Provide precise, actionable findings with clear severity. ' +
  'Focus on correctness, security, performance, API contracts, concurrency, tests, and maintainability. ' +
  'Prefer minimal, concrete patch suggestions.';

const userPrompt = `
Review the following Git diff like a GitHub PR review.

Output format:
- Group by severity: Critical / High / Medium / Low
- For each finding: file:line(s), concise rationale, and minimal patch suggestion (if applicable)
- End with "Proposed tests" (list edge cases)

Repo: ${repo}
PR: #${prNumber}

Diff:
${trimmedDiff}
`.trim();

async function callOpenAI(modelName, system, user) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${openaiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: modelName,
      temperature: 0.2,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user }
      ]
    })
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI API error: ${res.status} ${text}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || '';
}

async function postComment(body) {
  const url = `https://api.github.com/repos/${repo}/issues/${prNumber}/comments`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${githubToken}`,
      'Accept': 'application/vnd.github+json'
    },
    body: JSON.stringify({ body })
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub comment error: ${res.status} ${text}`);
  }
}

function chunk(text, size) {
  const parts = [];
  for (let i = 0; i < text.length; i += size) parts.push(text.slice(i, i + size));
  return parts;
}

(async () => {
  try {
    const review = await callOpenAI(model, systemPrompt, userPrompt);
    if (!review) {
      console.log('Empty AI review result.');
      return;
    }
    const header = `Automated AI Code Review for PR #${prNumber}\n\n`;
    const footer = `\n\n— 🤖 AI Reviewer (model: ${model})`;
    const full = header + review + footer;

    // GitHub comment size is generous but chunk to be safe
    for (const part of chunk(full, 55000)) {
      await postComment(part);
    }
    console.log('AI review posted.');
  } catch (err) {
    console.error(err);
    // Post a failure note without leaking details
    if (githubToken && repo && prNumber) {
      try { await postComment('AI review failed to run. Maintainers: please check workflow logs.'); } catch {}
    }
    process.exit(0);
  }
})();

