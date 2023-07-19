import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Popconfirm, Row, Tooltip } from "antd";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import {
  deleteCampaign,
  getCampaignDetails,
} from "../../../api/requests/campaign";
import { HttpStatusEnum } from "../../../enum/http-status.enum";
import { messageError, messageSuccess } from "../../../shared/messages";
import { DetailedCampaign } from "../../../interfaces/campaign.interface";
import { BaseCardComponent } from "../../../shared/components/base-card/base-card.component";
import { CampaignCharacterComponent } from "../shared/campaign-character/campaign-character.component";

import "./campaign-details.component.css";

export function CampaignDetailsComponent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState<DetailedCampaign | null>(null);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const { id } = useParams<{ id: string | undefined }>();

  function fetchCampaignDetails() {
    if (typeof id !== "string") {
      navigate("/campaign/list");
    }
    setLoading(true);
    // @ts-ignore
    getCampaignDetails(id)
      .then((r) => {
        const { data } = r;
        setCampaign(data);
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

  function handleDelete() {
    setLoading(true);
    // @ts-ignore
    deleteCampaign(id)
      .then(() => {
        messageSuccess("Mesa deletada com sucesso!");
        navigate("/campaign/list");
      })
      .catch(() => {
        messageError("Falha ao tentar deletar mesa");
      })
      .finally(() => {
        setOpenDeleteConfirm(false);
        setLoading(false);
      });
  }

  function handleEdit() {
    navigate(`/campaign/edit/${id}`);
  }

  useEffect(() => {
    fetchCampaignDetails();
  }, []);

  return (
    <BaseCardComponent
      className="campaign-details-body"
      leftButton={
        <Tooltip placement="bottom" title="Voltar">
          <Button
            type="primary"
            shape="circle"
            disabled={loading}
            onClick={() => {
              navigate("/campaign/list");
            }}
            icon={<ArrowLeftOutlined />}
          />
        </Tooltip>
      }
      rightButton={
        <Tooltip placement="bottom" title="Atualizar">
          <Button
            type="primary"
            shape="circle"
            loading={loading}
            onClick={() => {
              fetchCampaignDetails();
            }}
            icon={<ReloadOutlined />}
          />
        </Tooltip>
      }
      cardBody={
        <>
          <Row justify="space-between" className="campaign-details-title">
            <Col span={3}>
              <Tooltip placement="bottom" title="Deletar">
                <Popconfirm
                  title="Deletar mesa?"
                  open={openDeleteConfirm}
                  okText="Confirmar"
                  cancelText="Cancelar"
                  cancelButtonProps={{ color: "red" }}
                  okButtonProps={{ loading: loading }}
                  onConfirm={handleDelete}
                  onCancel={() => {
                    setOpenDeleteConfirm(false);
                  }}
                >
                  <Button
                    type="primary"
                    danger
                    shape="circle"
                    loading={loading}
                    onClick={() => {
                      setOpenDeleteConfirm(true);
                    }}
                    icon={<DeleteOutlined />}
                  />
                </Popconfirm>
              </Tooltip>
            </Col>
            <Col span={18}>
              <h1>Mesa: {campaign?.name}</h1>
            </Col>
            <Col span={3}>
              <Tooltip placement="bottom" title="Editar">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={handleEdit}
                />
              </Tooltip>
            </Col>
          </Row>
          <div className="campaign-char-container">
            {campaign?.sheets.map((s, i) => (
              <div key={`char-${i}-${s.id}`} className="campaign-char">
                <CampaignCharacterComponent character={s} />
              </div>
            ))}
          </div>
        </>
      }
    />
  );
}
