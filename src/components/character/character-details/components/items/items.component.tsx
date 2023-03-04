import { CoffeeOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";

export function ItemsComponent({ hidden }: { hidden: boolean }) {
  if (hidden) return null;
  return (
    <Row justify="space-between" align="bottom" style={{ textAlign: "center" }}>
      <Col span={24}>
        <CoffeeOutlined style={{ fontSize: "60px" }} />
      </Col>
      <Col span={24}>
        Funcionalidade será implementada no futuro
        <div style={{ fontSize: "6px" }}> (...talvez) </div>
      </Col>
    </Row>
  );
}
