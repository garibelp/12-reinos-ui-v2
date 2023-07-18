import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { updateAttributes } from "../../../../../api/requests/character";
import BrainIcon from "../../../../../assets/images/Brain.png";
import D4Icon from "../../../../../assets/images/D4.png";
import D6Icon from "../../../../../assets/images/D6.png";
import D8Icon from "../../../../../assets/images/D8.png";
import PersonIcon from "../../../../../assets/images/Person.png";
import ShieldIcon from "../../../../../assets/images/Shield.png";
import SwordIcon from "../../../../../assets/images/Sword.png";
import DicesIcon from "../../../../../assets/images/Dices.png";
import { AttributeEnum } from "../../../../../enum/attribute.enum";
import { ColorsEnum } from "../../../../../enum/colors.enum";
import { DiceEnum } from "../../../../../enum/dice.enum";
import { EnergyTypeEnum } from "../../../../../enum/energy-type.enum";
import { UpdateAttributePayload } from "../../../../../interfaces/character.interface";
import { Skill } from "../../../../../interfaces/skill.interface";
import { updateCurrentPoints } from "../../../../../redux/slices/character.slice";
import { CircleButtonComponent } from "../../../../../shared/components/circle-button/circle-button.component";
import {
  messageError,
  messageSuccess,
  messageWarning,
} from "../../../../../shared/messages";
import { getEnumKey } from "../../../../../utils/enum-utils";
import { BattleDiceRollComponent } from "./components/battle-dice-roll/battle-dice-roll.component";
import { AttributeRollComponent } from "./components/attribute-roll-component/attribute-roll-component";
import { DiceHistoryComponent } from "./components/dice-history/dice-history.component";

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
  mainAttribute: AttributeEnum;
  lineage?: string;
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
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string | undefined }>();
  const [mentalCurrent, setMentalCurrent] = useState(0);
  const [physicalCurrent, setPhysicalCurrent] = useState(0);
  const [heroismCurrent, setHeroismCurrent] = useState(0);
  const [firstTrigger, setFirstTrigger] = useState(true);
  const [diceRollHistory, setDiceRollHistory] = useState<
    { type: string; message: string; description: string }[]
  >([]);

  const {
    intelligence,
    cunning,
    tenacity,
    celerity,
    mentalCurrent: initMentalCurrent,
    mentalTotal,
    physicalCurrent: initPhysicalCurrent,
    physicalTotal,
    heroismCurrent: initHeroismCurrent,
    heroismTotal,
    basicAttack,
    mainAttribute,
    lineage,
    hidden,
  } = props;

  useEffect(() => {
    setMentalCurrent(initMentalCurrent);
    setPhysicalCurrent(initPhysicalCurrent);
    setHeroismCurrent(initHeroismCurrent);
  }, []);

  useEffect(() => {
    if (firstTrigger) {
      const initialLoad = setTimeout(() => {
        setFirstTrigger(false);
      }, 1000);
      return () => clearTimeout(initialLoad);
    } else {
      const updateData = setTimeout(() => {
        if (id) {
          const data: UpdateAttributePayload = {
            mentalCurrent,
            physicalCurrent,
            heroismCurrent,
          };
          messageWarning("Salvando atualizações de personagem...");
          updateAttributes(id, data)
            .then(() => {
              dispatch(updateCurrentPoints({ id, data }));
              messageSuccess("Atualizações salvas com sucesso!");
            })
            .catch((ex) => {
              console.error(ex);
              messageError(
                "Ocorreu um erro durante salvamento automático. Favor atualizar a página!"
              );
            });
        }
      }, 5000);
      return () => clearTimeout(updateData);
    }
  }, [mentalCurrent, physicalCurrent, heroismCurrent]);

  function reduceMental() {
    if (mentalCurrent > 0) {
      setMentalCurrent(mentalCurrent - 1);
    }
  }

  function increaseMental() {
    if (mentalCurrent < mentalTotal) {
      setMentalCurrent(mentalCurrent + 1);
    }
  }

  function reducePhysical() {
    if (physicalCurrent > 0) {
      setPhysicalCurrent(physicalCurrent - 1);
    }
  }

  function increasePhysical() {
    if (physicalCurrent < physicalTotal) {
      setPhysicalCurrent(physicalCurrent + 1);
    }
  }

  function reduceHeroism() {
    if (heroismCurrent > 0) {
      setHeroismCurrent(heroismCurrent - 1);
    }
  }

  function increaseHeroism() {
    if (heroismCurrent < heroismTotal) {
      setHeroismCurrent(heroismCurrent + 1);
    }
  }

  function handleRoll(
    type: string,
    value: { message: string; description: string }
  ) {
    setDiceRollHistory([{ type, ...value }, ...diceRollHistory]);
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
          value={<b>INT</b>}
          customBody={
            <AttributeRollComponent
              dice={intelligence}
              invertRoll={lineage === "Anão"}
              callback={(v: any) => handleRoll("INT", v)}
            />
          }
        />
        <CircleButtonComponent
          icon={getDice(cunning)}
          name={AttributeEnum.CUNNING}
          backgroundColor={ColorsEnum.CUNNING}
          value={<b>AST</b>}
          customBody={
            <AttributeRollComponent
              dice={cunning}
              invertRoll={lineage === "Anão"}
              callback={(v: any) => handleRoll("AST", v)}
            />
          }
        />
      </Row>
      <Divider />
      <Row justify="space-evenly">
        <CircleButtonComponent
          icon={getDice(tenacity)}
          name={AttributeEnum.TENACITY}
          backgroundColor={ColorsEnum.TENACITY}
          value={<b>TEN</b>}
          customBody={
            <AttributeRollComponent
              dice={tenacity}
              invertRoll={lineage === "Anão"}
              callback={(v: any) => handleRoll("TEN", v)}
            />
          }
        />
        <CircleButtonComponent
          icon={getDice(celerity)}
          name={AttributeEnum.CELERITY}
          backgroundColor={ColorsEnum.CELERITY}
          value={<b>CEL</b>}
          customBody={
            <AttributeRollComponent
              dice={celerity}
              invertRoll={lineage === "Anão"}
              callback={(v: any) => handleRoll("CEL", v)}
            />
          }
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
          customBody={
            <BattleDiceRollComponent
              celerity={celerity}
              cunning={cunning}
              intelligence={intelligence}
              tenacity={tenacity}
              attackRoll={true}
              baseDamage={basicAttack.cost}
              mainAttribute={mainAttribute}
              callback={(v: any) => handleRoll("ATK", v)}
            />
          }
        />
        <CircleButtonComponent
          icon={ShieldIcon}
          name="Defesa"
          backgroundColor={ColorsEnum.DEFENSE}
          size="small"
          customBody={
            <BattleDiceRollComponent
              celerity={celerity}
              cunning={cunning}
              intelligence={intelligence}
              tenacity={tenacity}
              attackRoll={false}
              callback={(v: any) => handleRoll("DEF", v)}
            />
          }
        />
        <CircleButtonComponent
          icon={DicesIcon}
          name="Rolagens"
          backgroundColor={ColorsEnum.BASE_GRAY}
          size="small"
          customBody={
            <DiceHistoryComponent diceRollHistory={diceRollHistory} />
          }
        />
      </Row>
      <Row justify="space-evenly">
        <Space size="large">
          {renderAttributeChangeButton(<MinusOutlined />, reduceHeroism)}
          <div>
            Heroismo {heroismCurrent}/{heroismTotal}
          </div>
          {renderAttributeChangeButton(<PlusOutlined />, increaseHeroism)}
        </Space>
      </Row>
    </Space>
  );
}

GeneralComponent.defaultProps = defaultProps;
