import { Input } from "antd";
import { useThemeSwitcher } from "react-css-theme-switcher";

import "./transitional-input.component.css";

const { Password } = Input;

interface TransitionalInputProps {
  placeholder: string;
  value?: string;
  type?: string;
  onChange?: any;
}

export function TransitionalInputComponent(props: TransitionalInputProps) {
  const { value, type, onChange, placeholder } = props;

  const { currentTheme } = useThemeSwitcher();
  const theme = currentTheme === "dark" ? "dark" : "light";

  const labelClassName = theme + (value && " filled");
  console.log(labelClassName);

  function retrieveInputType() {
    if (type === "password") {
      return <Password onChange={onChange} />;
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
