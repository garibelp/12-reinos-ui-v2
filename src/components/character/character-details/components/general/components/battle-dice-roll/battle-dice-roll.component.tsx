import { useState } from "react";
import {
  Button,
  Card,
  Divider,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
  Switch,
  notification,
} from "antd";

import { getDiceValue, rollDice } from "../../../../../../../utils/dice-utils";
import { AttributeEnum } from "../../../../../../../enum/attribute.enum";

import "./battle-dice-roll.component.css";

const { Group, Button: RadioButton } = Radio;

interface Props {
  intelligence?: string;
  cunning?: string;
  tenacity?: string;
  celerity?: string;
  attackRoll: boolean;
  baseDamage?: number;
  mainAttribute?: any;
}

const SELECTION = {
  CEL: 1,
  CUN: 2,
  INT: 3,
  TEN: 4,
};

function rollAttackDice(
  value: number,
  baseDamage: number,
  isAptitudeRoll: boolean
) {
  const diceRolls: number[] = [];

  const rollAttacks = () => {
    const result = rollDice(value);
    diceRolls.push(result.value);
    if (result.criticalHit) {
      rollAttacks();
    }
  };

  rollAttacks();

  const aptitudeBonus = isAptitudeRoll ? 1 : 0;
  const result =
    diceRolls.reduce((partialSum, a) => partialSum + a, 0) +
    baseDamage +
    aptitudeBonus;

  notification.success({
    message: `Rolagem de Ataque (D${value})`,
    description: `[${diceRolls}] + ${baseDamage} (base)${
      isAptitudeRoll ? " + " + aptitudeBonus + " (aptidão)" : ""
    } = ${result}`,
    placement: "bottomRight",
  });
}

function rollDefenseDice(value: number, isGuardUp: boolean) {
  const baseRoll = rollDice(value).value;
  const guardRoll = isGuardUp ? rollDice(value).value : 0;
  notification.success({
    message: `Rolagem de Defesa (D${value})`,
    description: `${baseRoll} + ${guardRoll} (guarda) = ${
      baseRoll + guardRoll
    }`,
    placement: "bottomRight",
  });
}

export function BattleDiceRollComponent(props: Props) {
  const {
    celerity,
    cunning,
    intelligence,
    tenacity,
    attackRoll,
    baseDamage,
    mainAttribute,
  } = props;
  const [currentDice, setCurrentAttribute] = useState(SELECTION.INT);
  const [switchToggled, setSwitchToggled] = useState(false);

  const title = attackRoll
    ? // @ts-ignore
      `Atributo de ataque: ${AttributeEnum[mainAttribute]}`
    : "Usar qual atributo para rolagem?";
  const switchText = attackRoll ? "Usar aptidão?" : "Guarda levantada?";

  function getCurrentDice(): number {
    if (SELECTION.CEL === currentDice) return getDiceValue(celerity);
    if (SELECTION.CUN === currentDice) return getDiceValue(cunning);
    if (SELECTION.INT === currentDice) return getDiceValue(intelligence);
    if (SELECTION.TEN === currentDice) return getDiceValue(tenacity);
    return 0;
  }

  function getAttackDice() {
    if (mainAttribute) {
      // TODO: fix to use a proper logic (i hate js typing...)
      return getDiceValue(
        // @ts-ignore
        props[`${mainAttribute.toLowerCase()}`]
      );
    }
    return 0;
  }

  function onDiceRoll() {
    if (attackRoll) {
      rollAttackDice(getAttackDice(), baseDamage || 0, switchToggled);
    } else {
      rollDefenseDice(getCurrentDice(), switchToggled);
    }
  }

  function onRadioChange(event: RadioChangeEvent) {
    const {
      target: { value },
    } = event;
    setCurrentAttribute(value);
  }

  function renderDefenseRoll() {
    return (
      <>
        <Group value={currentDice} onChange={onRadioChange} buttonStyle="solid">
          <Space className="full-width" direction="vertical">
            <Row justify="space-evenly">
              <RadioButton className="attribute-button" value={SELECTION.INT}>
                Inteligência
              </RadioButton>
              <RadioButton className="attribute-button" value={SELECTION.CUN}>
                Astúcia
              </RadioButton>
            </Row>
            <Row justify="space-evenly">
              <RadioButton className="attribute-button" value={SELECTION.TEN}>
                Tenacidade
              </RadioButton>
              <RadioButton className="attribute-button" value={SELECTION.CEL}>
                Celeridade
              </RadioButton>
            </Row>
          </Space>
        </Group>
        <Divider dashed />
      </>
    );
  }

  return (
    <Card title={title}>
      {!attackRoll && renderDefenseRoll()}
      <Space className="full-width" direction="vertical">
        <Space>
          <Switch onChange={setSwitchToggled} />
          {switchText}
        </Space>
        <Divider />
        <Button type="primary" onClick={onDiceRoll}>
          Rolar!
        </Button>
      </Space>
    </Card>
  );
}
