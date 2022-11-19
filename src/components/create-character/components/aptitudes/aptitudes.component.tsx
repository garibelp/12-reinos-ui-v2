import { Form, Select } from "antd";
import "./aptitudes.component.css";

const { Item } = Form;
const { Option } = Select;

export function AptitudesComponent({ hidden }: { hidden: boolean }) {
  return (
    <Item
      hidden={hidden}
      name="aptitudes"
      rules={[
        {
          required: true,
          message: "Please select your favourite colors!",
          type: "array",
        },
      ]}
    >
      <Select mode="multiple" placeholder="Please select favourite colors">
        <Option value="red">Red</Option>
        <Option value="green">Green</Option>
        <Option value="blue">Blue</Option>
      </Select>
    </Item>
  );
}
