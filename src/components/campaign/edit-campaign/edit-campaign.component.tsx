import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Divider, Row, Tooltip } from "antd";
import {
  CloseOutlined,
  DeleteOutlined,
  PlusOutlined,
  SaveOutlined,
  UndoOutlined,
} from "@ant-design/icons";

import { messageError, messageWarning } from "../../../shared/messages";
import { HttpStatusEnum } from "../../../enum/http-status.enum";
import { CampaignCharacterEdit } from "../../../interfaces/character.interface";
import { getCampaignDetails } from "../../../api/requests/campaign";
import { BaseCardComponent } from "../../../shared/components/base-card/base-card.component";
import { CampaignCharacterComponent } from "../shared/campaign-character/campaign-character.component";

import "./edit-campaign.component.css";

export function EditCampaignComponent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState<CampaignCharacterEdit[]>([]);
  const { id } = useParams<{ id: string | undefined }>();

  function fetchCampaignDetails() {
    if (typeof id !== "string") {
      navigate("/campaign/list");
    }
    setLoading(true);
    // @ts-ignore
    getCampaignDetails(id)
      .then((r) => {
        const {
          data: { sheets },
        } = r;
        setCharacters(
          sheets.map((s) => ({
            ...s,
            addedChar: false,
            removedChar: false,
            initial: true,
          }))
        );
      })
      .catch((ex) => {
        const {
          response: { status },
        } = ex;
        if (status === HttpStatusEnum.FORBIDDEN) {
          messageError("Operação não autorizada!");
        } else {
          messageError("ID inválido!");
        }
        navigate("/campaign/list");
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchCampaignDetails();
  }, []);

  function handleRedirect() {
    navigate(`/campaign/${id}`);
  }

  function handleSave() {
    messageWarning("Função ainda não implementada.");
  }

  function handleAdd() {
    messageWarning("Função ainda não implementada.");
  }

  function handleRemove(id: string) {
    const char = characters.find((c) => c.id === id);

    if (char?.addedChar) {
      setCharacters(characters.filter((c) => c.id !== id));
    } else {
      setCharacters(
        characters.map((c) => {
          if (c.id === id) {
            c.removedChar = true;
          }
          return c;
        })
      );
    }
  }

  function handleCancelRemove(id: string) {
    setCharacters(
      characters.map((c) => {
        if (c.id === id) {
          c.removedChar = false;
        }
        return c;
      })
    );
  }

  function EditCampaignBody() {
    const sheetRender = characters.map((c, i) => (
      <div className={`${i === characters.length - 1 && "last-element"}`}>
        <Row
          align="middle"
          key={`char-${c.id}`}
          className={`${c.removedChar && "disabled"}`}
        >
          <Col span={20}>
            <CampaignCharacterComponent character={c} />
          </Col>
          <Col span={4}>
            {!c.removedChar ? (
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => {
                  handleRemove(c.id);
                }}
              />
            ) : (
              <Button
                type="primary"
                shape="circle"
                icon={<UndoOutlined />}
                onClick={() => {
                  handleCancelRemove(c.id);
                }}
              />
            )}
          </Col>
        </Row>
        {i !== characters.length - 1 && <Divider />}
      </div>
    ));

    return (
      <>
        <Row align="middle" justify="center" className="edit-campaign-add">
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Adicionar
          </Button>
        </Row>
        {sheetRender}
      </>
    );
  }

  return (
    <BaseCardComponent
      className="edit-campaign-body"
      leftButton={
        <Tooltip placement="bottom" title="Cancelar">
          <Button
            type="primary"
            shape="circle"
            danger
            onClick={handleRedirect}
            loading={loading}
            icon={<CloseOutlined />}
          />
        </Tooltip>
      }
      rightButton={
        <Tooltip placement="bottom" title="Salvar">
          <Button
            type="primary"
            shape="circle"
            onClick={handleSave}
            loading={loading}
            icon={<SaveOutlined />}
          />
        </Tooltip>
      }
      cardBody={<EditCampaignBody />}
    />
  );
}
