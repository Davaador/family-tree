import { Col, Form, FormInstance, Input, Row, Select } from "antd";
import validations from "context/validations";
import { RegisterType } from "pages/public/auth/auth.model";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
const { Option } = Select;

type RegisterInputProps = {
  name?: string;
  defaultValue?: string;
  onChange?(e: string): void;
  form: FormInstance;
};

const FormRegisterInput = (props: RegisterInputProps) => {
  const { form, defaultValue } = props;
  const [numbers, setNumbers] = useState<string | undefined>(
    defaultValue?.substring(2, 10)
  );
  const [firstLetter, setFirstLetter] = useState<string>();
  const [secondLetter, setSecondLetter] = useState<string>();
  const { t } = useTranslation();

  useEffect(() => {
    form.setFieldValue(
      "register",
      [firstLetter, secondLetter, numbers].join("")
    );
  }, [firstLetter, secondLetter, numbers, form]);

  useEffect(() => {
    setFirstLetter(defaultValue?.charAt(0));
    setSecondLetter(defaultValue?.charAt(1));
  }, [defaultValue]);

  const onTouch = (fn: any, key: string) => {
    if (validations.mongolianUpperLetter.test(key.toUpperCase())) {
      fn(key.toUpperCase());
    }
  };

  return (
    <>
      <Form.Item<RegisterType>
        label={t("register.registerNumber")}
        required={true}
        layout="vertical"
      >
        <Row gutter={12}>
          <Col span={6}>
            <Select
              showSearch
              optionFilterProp="label"
              allowClear
              value={firstLetter}
              onChange={(value) => setFirstLetter(value)}
              onInputKeyDown={(e) => onTouch(setFirstLetter, e.key)}
            >
              <Option value=""> </Option>
              <Option value="А">А</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Select
              showSearch
              optionFilterProp="label"
              allowClear
              onChange={(value) => setSecondLetter(value)}
              value={secondLetter}
              onInputKeyDown={(e) => onTouch(setSecondLetter, e.key)}
            >
              <Option value=""> </Option>
              <Option value="А">А</Option>
            </Select>
          </Col>
          <Col span={12}>
            <Form.Item
              noStyle
              name={"register"}
              rules={[
                { required: true, message: "oruulssna uu" },
                ({ setFieldValue }) => ({
                  validator(rule, value) {
                    if (
                      ((numbers && numbers.length > 0) ||
                        (firstLetter && firstLetter.length > 0) ||
                        (secondLetter && secondLetter.length > 0)) &&
                      !validations.register.test(
                        [firstLetter, secondLetter, numbers].join("")
                      )
                    ) {
                      return Promise.reject("utga buruu bna");
                    }

                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input type="hidden" />
            </Form.Item>
            <Form.Item>
              <Input
                defaultValue={numbers}
                maxLength={8}
                onChange={(e) => setNumbers(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
    </>
  );
};

export default FormRegisterInput;
