import { Button, Card, Divider, Space, Switch, notification } from "antd";
import { useState } from "react";

import { getDiceValue, rollDice } from "../../../../../../../utils/dice-utils";

import "./attribute-roll-component.css";

interface Props {
  dice?: string;
  invertRoll: boolean;
  callback?: Function;
}

export function AttributeRollComponent(props: Props) {
  const [switchToggled, setSwitchToggled] = useState(false);
  const { dice, invertRoll, callback } = props;

  function onDiceRoll() {
    const aptitudeBonus = switchToggled ? 1 : 0;

    const { value, bonus, criticalHit, criticalFailure, failure } = rollDice(
      getDiceValue(dice),
      aptitudeBonus,
      invertRoll
    );

    let notificationType = "warning";
    let message = "Sucesso de rolagem";

    let description = `${value} (dado) + ${bonus} (aptidão) = ${value + bonus}`;

    if (criticalHit) {
      notificationType = "success";
      message = "SUCESSO ABSOLUTO!";
    }
    if (failure || criticalFailure) {
      notificationType = "error";
      if (criticalFailure) {
        message = "FALHA CRÍTICA!!!";
        description = `O famoso ${invertRoll ? "valor máximo" : "1 natural"}`;
      } else {
        message = "Falha de rolagem";
      }
    }

    if (callback) callback({ message, description });

    // @ts-ignore
    notification[notificationType]({
      message,
      description,
      placement: "bottomRight",
    });
  }

  return (
    <Card title={`Rolagem de atributo (${dice})`}>
      <Space className="full-width" direction="vertical">
        <Space>
          <Switch onChange={setSwitchToggled} />
          Usar aptidão?
        </Space>
        <Divider />
        <Button type="primary" onClick={onDiceRoll}>
          Rolar!
        </Button>
      </Space>
    </Card>
  );
}
