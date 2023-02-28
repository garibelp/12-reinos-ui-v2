import { Input } from "antd";
import { useThemeSwitcher } from "react-css-theme-switcher";

import "./transitional-input.component.css";
import TextArea from "antd/lib/input/TextArea";

const { Password } = Input;

export enum TransactionalInputType {
  PASSWORD,
  TEXT_AREA,
}

interface TransitionalInputProps {
  placeholder: string;
  value?: string;
  type?: TransactionalInputType;
  onChange?: any;
}

export function TransitionalInputComponent(props: TransitionalInputProps) {
  const { value, type, onChange, placeholder } = props;

  const { currentTheme } = useThemeSwitcher();
  const theme = currentTheme === "dark" ? "dark" : "light";

  const labelClassName = theme + (value && " filled");

  function retrieveInputType() {
    if (type === TransactionalInputType.PASSWORD) {
      return <Password onChange={onChange} />;
    }
    if (type === TransactionalInputType.TEXT_AREA) {
      return <TextArea onChange={onChange} />;
    }
    return <Input style={{ height: "30px" }} onChange={onChange} />;
  }

  return (
    <div className="input-container">
      {retrieveInputType()}
      <label className={labelClassName}>{placeholder}</label>
    </div>
  );
}
