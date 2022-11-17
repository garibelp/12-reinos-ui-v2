import "./transitional-input.component.css";
import { Input } from "antd";

const { Password } = Input;

interface TransitionalInputProps {
  placeholder: string;
  value?: string;
  type?: string;
  onChange?: any;
}

export function TransitionalInputComponent(props: TransitionalInputProps) {
  const { value, type, onChange, placeholder } = props;

  function retrieveInputType() {
    if (type === "password") {
      return <Password onChange={onChange} />;
    }
    return <Input style={{ height: "30px" }} onChange={onChange} />;
  }

  return (
    <div className="input-container">
      {retrieveInputType()}
      <label className={value && "filled"}> {placeholder} </label>
    </div>
  );
}
