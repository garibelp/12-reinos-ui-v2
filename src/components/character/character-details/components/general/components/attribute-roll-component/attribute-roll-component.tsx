import { Button, Card, Divider, Space, Switch, notification } from "antd";
import "./attribute-roll-component.css";
import { useState } from "react";
import {
  getDiceValue,
  isFailure,
  rollDice,
} from "../../../../../../../utils/dice-utils";

interface Props {
  dice?: string;
}

export function AttributeRollComponent(props: Props) {
  const [switchToggled, setSwitchToggled] = useState(false);
  const { dice } = props;

  function onDiceRoll() {
    const aptitudeBonus = switchToggled ? 1 : 0;

    const { value, criticalHit, criticalFailure } = rollDice(
      getDiceValue(dice)
    );

    let notificationType = "warning";
    let message = "Sucesso de rolagem";

    let description = `${value} (dado) + ${aptitudeBonus} (aptidão) = ${
      value + aptitudeBonus
    }`;

    if (criticalHit) {
      notificationType = "success";
      message = "SUCESSO ABSOLUTO!";
    }
    if (isFailure(value + aptitudeBonus) || criticalFailure) {
      notificationType = "error";
      if (criticalFailure) {
        message = "FALHA CRÍTICA!!!";
        description = "O famoso 1 natural";
      } else {
        message = "Falha de rolagem";
      }
    }

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
