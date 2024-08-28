import React from "react";
import { SubmitButtonProps } from "../SubmitButton/SubmitButton";
import { useTranslation } from "react-i18next";
import { Button } from "antd";

const TextButton = (props: Readonly<SubmitButtonProps>) => {
  const { text, disabled, loading, onPress, block } = props;
  const { t } = useTranslation();
  return (
    <Button
      onClick={onPress && onPress}
      disabled={disabled}
      loading={loading}
      type="text"
      block={block}
    >
      {text ?? t("general.text")}
    </Button>
  );
};

export default TextButton;
