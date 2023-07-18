import { useState } from "react";
import { Button, Col, Row, Space } from "antd";
import { useDispatch } from "react-redux";

import { Wound } from "../../../../../../interfaces/wound.interface";
import { ExpandableDetailsComponent } from "../../../../../../shared/components/expandable-details/expandable-details.component";
import { useAppSelector } from "../../../../../../redux/hooks";
import { RootState } from "../../../../../../redux/store";
import { rollDice } from "../../../../../../utils/dice-utils";
import { addWound, removeWound } from "../../../../../../api/requests/wounds";
import {
  messageError,
  messageSuccess,
} from "../../../../../../shared/messages";
import { updateWound } from "../../../../../../redux/slices/character.slice";

import "./wounds.component.css";

interface Props {
  currentWound?: Wound;
  sheetId: string;
}

export function WoundsComponent({ currentWound, sheetId }: Props) {
  const dispatch = useDispatch();
  const { list } = useAppSelector((state: RootState) => state.wound);
  const [loading, setLoading] = useState(false);

  function handleAdd() {
    setLoading(true);
    const { value } = rollDice(12);
    const wound = list.find((v) => {
      const { diceRange } = v;
      const range = diceRange.split("-").map((r) => Number(r));
      return range[0] <= value && value <= range[1];
    });
    addWound(sheetId, wound?.id)
      .then(() => {
        messageSuccess("Ferimento adicionado com sucesso!");
        dispatch(updateWound({ id: sheetId, data: wound }));
      })
      .catch(() => {
        messageError("Falha ao tentar adicionar ferimento!");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleRemove() {
    setLoading(true);
    removeWound(sheetId)
      .then(() => {
        messageSuccess("Ferimento removido com sucesso!");
        dispatch(updateWound({ id: sheetId, data: undefined }));
      })
      .catch(() => {
        messageError("Falha ao tentar remover ferimento!");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function woundBody() {
    if (currentWound) {
      return (
        <Col span={24} className="wound-details">
          <ExpandableDetailsComponent
            key={currentWound.id}
            title={currentWound.name}
            description={
              <Space direction="vertical" align="center" size="large">
                {currentWound.description}
                <Button loading={loading} type="primary" onClick={handleRemove}>
                  Remover ferimento
                </Button>
              </Space>
            }
          />
        </Col>
      );
    }
    return <></>;
  }

  return (
    <Row justify="space-between" align="middle">
      <Col span={12}>
        <b>Ferimento Grave </b>
      </Col>
      <Col className="wound-button" span={12}>
        {!currentWound && (
          <Button type="primary" loading={loading} onClick={handleAdd}>
            Adicionar ferimento
          </Button>
        )}
      </Col>
      {woundBody()}
    </Row>
  );
}
