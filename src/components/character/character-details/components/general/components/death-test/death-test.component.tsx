import { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Divider, Row } from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";

import {
  messageError,
  messageSuccess,
} from "../../../../../../../shared/messages";
import { updateDeathRoll } from "../../../../../../../api/requests/character";
import { updateDeathRolls } from "../../../../../../../redux/slices/character.slice";
import { DeathRollEnum } from "../../../../../../../enum/death-roll.enum";

import "./death-test.component.css";

interface Props {
  deathRollBody: DeathRollEnum;
  deathRollMind: DeathRollEnum;
  deathRollSpirit: DeathRollEnum;
  sheetId: string;
  callback: Function;
}

export function DeathTestComponent({
  deathRollBody,
  deathRollMind,
  deathRollSpirit,
  callback,
  sheetId,
}: Props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState(DeathRollEnum.UNCHECKED);
  const [mind, setMind] = useState(DeathRollEnum.UNCHECKED);
  const [spirit, setSpirit] = useState(DeathRollEnum.UNCHECKED);

  useEffect(() => {
    setStoreData();
  }, []);

  function setStoreData() {
    setBody(deathRollBody);
    setMind(deathRollMind);
    setSpirit(deathRollSpirit);
  }

  function handleSave() {
    const data = {
      deathRollBody: body,
      deathRollMind: mind,
      deathRollSpirit: spirit,
    };
    setLoading(true);
    updateDeathRoll(sheetId, data)
      .then(() => {
        messageSuccess("Rolagens de morte salvas com sucesso!");
        dispatch(updateDeathRolls({ id: sheetId, data }));
      })
      .catch(() => {
        messageError("Falha ao tentar salvar rolagens de morte!");
        setStoreData();
      })
      .finally(() => {
        setLoading(false);
        callback();
      });
  }

  function handleCancel() {
    callback();
    setStoreData();
  }

  function disableSave(): boolean {
    return (
      body === deathRollBody &&
      mind === deathRollMind &&
      spirit === deathRollSpirit
    );
  }

  function renderIcon(roll: DeathRollEnum, updateRoll: Function): ReactNode {
    switch (roll) {
      case DeathRollEnum.FAILURE:
        return (
          <CloseCircleFilled
            style={{ color: "red", fontSize: "20px" }}
            onClick={() => updateRoll(DeathRollEnum.SUCCESS)}
          />
        );
      case DeathRollEnum.SUCCESS:
        return (
          <CheckCircleFilled
            style={{ color: "green", fontSize: "20px" }}
            onClick={() => updateRoll(DeathRollEnum.UNCHECKED)}
          />
        );
      default:
        return (
          <MinusCircleFilled
            style={{ fontSize: "20px" }}
            onClick={() => updateRoll(DeathRollEnum.FAILURE)}
          />
        );
    }
  }

  return (
    <Row className="death-row-details">
      <Col span={12}>Teste do corpo:</Col>
      <Col span={12} className="death-col-details">
        {renderIcon(body, setBody)}
      </Col>
      <Col span={12}>Teste da mente:</Col>
      <Col span={12} className="death-col-details">
        {renderIcon(mind, setMind)}
      </Col>
      <Col span={12}>Teste do espírito:</Col>
      <Col span={12} className="death-col-details">
        {renderIcon(spirit, setSpirit)}
      </Col>
      <Divider />
      <Col span={12}>
        <Button
          onClick={handleCancel}
          type="primary"
          className="death-row-button"
          loading={loading}
          danger
        >
          Cancelar
        </Button>
      </Col>
      <Col span={12}>
        <Button
          onClick={handleSave}
          type="primary"
          className="death-row-button"
          loading={loading}
          disabled={disableSave()}
        >
          Salvar
        </Button>
      </Col>
    </Row>
  );
}
