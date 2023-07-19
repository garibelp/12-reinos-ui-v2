import { Space } from "antd";

import { CampaignCharacter } from "../../../../interfaces/character.interface";
import BrainIcon from "../../../../assets/images/Brain.png";
import PersonIcon from "../../../../assets/images/Person.png";

import "./campaign-character.component.css";

function retrieveColor(current: number, total: number): string {
  const percentage = (current / total) * 100;
  if (percentage >= 75)
    return "invert(54%) sepia(97%) saturate(1733%) hue-rotate(79deg) brightness(111%) contrast(129%)";
  if (percentage >= 50)
    return "invert(93%) sepia(45%) saturate(3106%) hue-rotate(344deg) brightness(95%) contrast(113%)";
  if (percentage >= 25)
    return "invert(68%) sepia(91%) saturate(2552%) hue-rotate(0deg) brightness(103%) contrast(103%)";
  return "invert(14%) sepia(77%) saturate(6620%) hue-rotate(358deg) brightness(105%) contrast(112%)";
}

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

  const colorMental = retrieveColor(mentalCurrent, mentalTotal);
  const colorPhysical = retrieveColor(physicalCurrent, physicalTotal);

  return (
    <Space className="campaign-char-space" key={id}>
      <div className="dark-grey">
        <h3>{name}</h3>
        <div>Capítulo {level}</div>
        <div style={{ paddingBottom: "5px" }}>
          {lineage} - {background}
        </div>
      </div>
      <div className="campaign-char-attr">
        <Space direction="vertical">
          <img
            src={BrainIcon}
            alt=""
            className="campaign-char-attr-icon"
            style={{ filter: colorMental }}
          />
          <>{`${mentalCurrent}/${mentalTotal}`}</>
        </Space>
      </div>
      <div className="campaign-char-attr">
        <Space direction="vertical" align="center">
          <img
            src={PersonIcon}
            alt=""
            className="campaign-char-attr-icon"
            style={{ filter: colorPhysical }}
          />
          <>{`${physicalCurrent}/${physicalTotal}`}</>
        </Space>
      </div>
    </Space>
  );
}
