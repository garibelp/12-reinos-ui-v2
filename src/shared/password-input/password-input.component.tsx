import { Form } from "antd";
import { TransitionalInputComponent } from "../transactional-input/transitional-input.component";

const { Item } = Form;

interface Props {
  extraRules: any[];
  name: string;
  placeholder: string;
  dependencies: string[];
}

export function PasswordInputComponent({
  extraRules,
  placeholder,
  dependencies,
  name,
}: Props) {
  const rules = [
    {
      required: true,
      pattern: new RegExp("(?=.*[a-z])"),
      message: "Necessário ao menos um caractere minúsculo",
    },
    {
      required: true,
      pattern: new RegExp("(?=.*[A-Z])"),
      message: "Necessário ao menos um caractere maiúsculo",
    },
    {
      required: true,
      pattern: new RegExp("(?=.*[0-9])"),
      message: "Necessário ao menos um número",
    },
    {
      required: true,
      pattern: new RegExp("(?=.*[!@#$%^&+=])"),
      message: "Necessário ao menos um caractere especial",
    },
    {
      required: true,
      min: 8,
      max: 20,
      message: "Tamanho deve ser entre 8 e 20 caracteres",
    },
  ];

  return (
    <Item
      name={name}
      rules={[...rules, ...extraRules]}
      dependencies={dependencies}
    >
      <TransitionalInputComponent placeholder={placeholder} type="password" />
    </Item>
  );
}

PasswordInputComponent.defaultProps = {
  extraRules: [],
  dependencies: [],
};
