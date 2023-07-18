import { Col, List, Row } from "antd";

import "./dice-history.component.css";

const { Item } = List;

export function DiceHistoryComponent({
  diceRollHistory,
}: {
  diceRollHistory: { type: string; message: string; description: string }[];
}) {
  return (
    <List
      className="roll-list"
      dataSource={diceRollHistory}
      renderItem={(item) => (
        <Item>
          <Row className="w-100" align="middle">
            <Col span={24}>
              <b>
                [{item.type}] - {item.message}
              </b>
            </Col>
            <Col span={24}>{item.description}</Col>
          </Row>
        </Item>
      )}
    ></List>
  );
}
