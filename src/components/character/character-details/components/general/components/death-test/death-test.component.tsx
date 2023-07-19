import { useState } from "react";
import { Button, Col, Divider, Row } from "antd";
import { CloseCircleFilled, MinusCircleFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import {
  messageError,
  messageSuccess,
} from "../../../../../../../shared/messages";
import { getDiceValue, rollDice } from "../../../../../../../utils/dice-utils";
import {
  failDeathRoll,
  resetDeathRoll,
} from "../../../../../../../api/requests/character";

import "./death-test.component.css";
import { updateDeathRolls } from "../../../../../../../redux/slices/character.slice";

interface Props {
  deathRolls: number;
  tenacity?: string;
  intelligence?: string;
  cunning?: string;
  sheetId: string;
}

export function DeathTestComponent({
  deathRolls,
  tenacity,
  intelligence,
  cunning,
  sheetId,
}: Props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  function renderStatus(step: number) {
    return (
      <>
        {step <= deathRolls ? (
          <CloseCircleFilled color="red" />
        ) : (
          <MinusCircleFilled />
        )}
      </>
    );
  }

  function rollDeathTest(type: string, dice?: string) {
    const { failure } = rollDice(getDiceValue(dice));
    if (failure) {
      messageError(`Falha em teste de morte de ${type}!`);
      setLoading(true);
      failDeathRoll(sheetId)
        .then(() => {
          // TODO: Sync store
          dispatch(
            updateDeathRolls({ id: sheetId, deathRolls: deathRolls + 1 })
          );
        })
        .catch(() => {
          messageError(`Falha ao tentar salvar teste de morte de ${type}!`);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      messageSuccess(`Sucesso em teste de morte de ${type}!`);
      if (deathRolls > 0) {
        onResetClicked();
      }
    }
  }

  function onRollClicked() {
    switch (deathRolls) {
      case 0:
        rollDeathTest("Corpo", tenacity);
        break;
      case 1:
        rollDeathTest("Mente", intelligence);
        break;
      case 2:
        rollDeathTest("Espírito", cunning);
        break;
      default:
        messageError("Personagem faleceu!");
    }
  }

  function onResetClicked() {
    setLoading(true);
    resetDeathRoll(sheetId)
      .then(() => {
        dispatch(updateDeathRolls({ id: sheetId, deathRolls: 0 }));
      })
      .catch(() => {
        messageError(`Falha ao tentar resetar teste de morte!`);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Row className="death-row-details">
      <Col span={12}>Teste do corpo</Col>
      <Col span={12}>{renderStatus(1)}</Col>
      <Col span={12}>Teste da mente</Col>
      <Col span={12}>{renderStatus(2)}</Col>
      <Col span={12}>Teste do espírito</Col>
      <Col span={12}>{renderStatus(3)}</Col>
      <Divider />
      <Col span={12}>
        <Button
          type="primary"
          disabled={deathRolls === 0}
          loading={loading}
          className="death-row-button"
          onClick={onResetClicked}
        >
          Resetar testes
        </Button>
      </Col>
      <Col span={12}>
        <Button
          type="primary"
          loading={loading}
          className="death-row-button"
          onClick={onRollClicked}
        >
          Rolar!
        </Button>
      </Col>
    </Row>
  );
}
