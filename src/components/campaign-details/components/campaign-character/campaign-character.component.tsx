import { Col, Row, Space } from "antd";

import { CampaignCharacter } from "../../../../interfaces/character.interface";
import BrainIcon from "../../../../assets/images/Brain.png";
import PersonIcon from "../../../../assets/images/Person.png";

import "./campaign-character.component.css";

export function CampaignCharacterComponent({
  character,
}: {
  character: CampaignCharacter;
}) {
  const {
    id,
    name,
    level,
    lineage,
    background,
    mentalCurrent,
    mentalTotal,
    physicalCurrent,
    physicalTotal,
  } = character;
  return (
    <Row key={id} justify="space-around" align="middle">
      <Col className="dark-grey" span={12}>
        <h3>{name}</h3>
        <div>{level}</div>
        <div>
          {lineage} {background}
        </div>
      </Col>
      <Col span={6}>
        <Space direction="vertical">
          <img src={BrainIcon} alt="" className="campaign-char-attr-icon" />
          <>{`${mentalCurrent}/${mentalTotal}`}</>
        </Space>
      </Col>
      <Col span={6}>
        <Space direction="vertical" align="center">
          <img src={PersonIcon} alt="" className="campaign-char-attr-icon" />
          <>{`${physicalCurrent}/${physicalTotal}`}</>
        </Space>
      </Col>
    </Row>
  );
}
