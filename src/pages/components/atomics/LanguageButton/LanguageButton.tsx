import { Button } from "antd";
import { languageStore } from "context/auth/store";
import Flag from "react-world-flags";

const LanguageButton = () => {
  const { language, changeLanguage } = languageStore();
  return (
    <Button
      className="flag-button"
      icon={
        <Flag
          code={language === "mn" ? "US" : "MN"}
          style={{ width: 20, height: 20 }}
        />
      }
      title="English"
      onClick={() => {
        changeLanguage(language);
      }}
    />
  );
};

export default LanguageButton;
