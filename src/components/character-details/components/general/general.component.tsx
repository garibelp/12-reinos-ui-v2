import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Row, Space } from "antd";
import { useEffect } from "react";

import BrainIcon from "../../../../assets/images/Brain.png";
import D4Icon from "../../../../assets/images/D4.png";
import D6Icon from "../../../../assets/images/D6.png";
import D8Icon from "../../../../assets/images/D8.png";
import PersonIcon from "../../../../assets/images/Person.png";
import SwordIcon from "../../../../assets/images/Sword.png";

import { AttributeEnum } from "../../../../enum/attribute.enum";
import { ColorsEnum } from "../../../../enum/colors.enum";
import { DiceEnum } from "../../../../enum/dice.enum";
import { EnergyTypeEnum } from "../../../../enum/energy-type.enum";
import { Skill } from "../../../../interfaces/skill.interface";
import { CircleButtonComponent } from "../../../../shared/circle-button/circle-button.component";
import { getEnumKey } from "../../../../utils/enum-utils";

import "./general.component.css";

interface Props {
  intelligence?: string;
  cunning?: string;
  tenacity?: string;
  celerity?: string;
  mentalCurrent: number;
  mentalTotal: number;
  physicalCurrent: number;
  physicalTotal: number;
  heroismCurrent: number;
  heroismTotal: number;
  basicAttack: Skill;
  hidden: boolean;
}

const defaultProps = {
  mentalCurrent: 0,
  mentalTotal: 0,
  physicalCurrent: 0,
  physicalTotal: 0,
  heroismCurrent: 0,
  heroismTotal: 0,
  basicAttack: {
    cost: 99,
    range: 0,
    energyType: EnergyTypeEnum.PHYSICAL,
  },
};

function getDice(attribute?: string) {
  if (attribute) {
    if (attribute === getEnumKey(DiceEnum.D4, DiceEnum)) return D4Icon;
    if (attribute === getEnumKey(DiceEnum.D6, DiceEnum)) return D6Icon;
    if (attribute === getEnumKey(DiceEnum.D8, DiceEnum)) return D8Icon;
  }
  return "";
}

export function GeneralComponent(props: Props) {
  const {
    intelligence,
    cunning,
    tenacity,
    celerity,
    mentalCurrent,
    mentalTotal,
    physicalCurrent,
    physicalTotal,
    heroismCurrent,
    heroismTotal,
    basicAttack,
    hidden,
  } = props;

  useEffect(() => {}, []);

  function reduceMental() {
    console.log("reduceMental");
  }

  function increaseMental() {
    console.log("increaseMental");
  }

  function reducePhysical() {
    console.log("reducePhysical");
  }

  function increasePhysical() {
    console.log("increasePhysical");
  }

  function renderAttributeChangeButton(icon: any, callback = () => {}) {
    return (
      <Button
        className="attribute-change-button"
        shape="circle"
        type="text"
        icon={icon}
        onClick={callback}
      />
    );
  }

  return (
    <Space hidden={hidden} style={{ width: "100%" }} direction="vertical">
      <Row justify="center" style={{ alignItems: "center" }}>
        <Space size="large">
          {renderAttributeChangeButton(<MinusOutlined />, reduceMental)}
          <CircleButtonComponent
            icon={BrainIcon}
            name="Energia Mental"
            backgroundColor={ColorsEnum.BASE_GRAY}
            value={`${mentalCurrent}/${mentalTotal}`}
          />
          {renderAttributeChangeButton(<PlusOutlined />, increaseMental)}
        </Space>
      </Row>
      <Row justify="space-evenly">
        <CircleButtonComponent
          icon={getDice(intelligence)}
          name={AttributeEnum.INTELLIGENCE}
          backgroundColor={ColorsEnum.INTELLIGENCE}
        />
        <CircleButtonComponent
          icon={getDice(cunning)}
          name={AttributeEnum.CUNNING}
          backgroundColor={ColorsEnum.CUNNING}
        />
      </Row>
      <Divider />
      <Row justify="space-evenly">
        <CircleButtonComponent
          icon={getDice(tenacity)}
          name={AttributeEnum.TENACITY}
          backgroundColor={ColorsEnum.TENACITY}
        />
        <CircleButtonComponent
          icon={getDice(celerity)}
          name={AttributeEnum.CELERITY}
          backgroundColor={ColorsEnum.CELERITY}
        />
      </Row>
      <Row justify="space-evenly">
        <Space size="large">
          {renderAttributeChangeButton(<MinusOutlined />, reducePhysical)}
          <CircleButtonComponent
            icon={PersonIcon}
            name="Energia Física"
            backgroundColor={ColorsEnum.BASE_GRAY}
            value={`${physicalCurrent}/${physicalTotal}`}
          />
          {renderAttributeChangeButton(<PlusOutlined />, increasePhysical)}
        </Space>
      </Row>
      <Divider />
      <Row justify="space-evenly">
        <CircleButtonComponent
          icon={SwordIcon}
          name="Ataque Básico"
          backgroundColor={ColorsEnum.BASIC_ATTACK}
          size="small"
          description={`Custo: ${basicAttack.cost}\\nAlcance: ${basicAttack.range}`}
        />
      </Row>
      <Row justify="space-evenly">
        <Space size="large">
          {renderAttributeChangeButton(<MinusOutlined />, reducePhysical)}
          <div>
            Heroismo {heroismCurrent}/{heroismTotal}
          </div>
          {renderAttributeChangeButton(<PlusOutlined />, increasePhysical)}
        </Space>
      </Row>
    </Space>
  );
}

GeneralComponent.defaultProps = defaultProps;
