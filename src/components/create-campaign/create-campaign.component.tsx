import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Form, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  TransactionalInputType,
  TransitionalInputComponent,
} from "../../shared/components/transactional-input/transitional-input.component";
import { createCampaign } from "../../api/requests/campaign";
import { messageError } from "../../shared/messages";
import { HttpStatusEnum } from "../../enum/http-status.enum";

import "./create-campaign.component.css";
import { CampaignCharacterListComponent } from "./components/campaign-character-list/campaign-character-list.component";
import { BasicCharacter } from "../../interfaces/character.interface";
import { logout } from "../../api/requests/auth";

const { Item } = Form;

function CreateCampaignHeader() {
  return <div className="create-campaign-title">Criar Mesa</div>;
}

function CreateCampaignFooter({ loading }: { loading: boolean }) {
  const navigate = useNavigate();

  return (
    <Row justify="space-between">
      <Button
        type="text"
        className="footer-button"
        icon={<LeftOutlined />}
        onClick={() => {
          navigate("/campaign/list");
        }}
      >
        Cancelar
      </Button>
      <Button
        disabled={loading}
        className="footer-button"
        type="text"
        htmlType="submit"
      >
        Finalizar <RightOutlined />
      </Button>
    </Row>
  );
}

export function CreateCampaignComponent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedList, setSelectedList] = useState<BasicCharacter[]>([]);
  const [form] = useForm();

  function onFinish(values: any) {
    setLoading(true);
    createCampaign({ ...values, sheetList: selectedList.map((v) => v.id) })
      .then(() => {
        navigate("/campaign/list");
      })
      .catch((ex) => {
        const {
          response: { status },
        } = ex;
        if (status === HttpStatusEnum.UNAUTHORIZED) {
          messageError("Sessão expirada, favor logar novamente");
          logout();
        } else {
          messageError("Falha ao criar personagem. Tente novamente mais tarde");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="horizontal"
      className="create-campaign-wrapper"
    >
      <Card
        title={<CreateCampaignHeader />}
        actions={[<CreateCampaignFooter loading={loading} />]}
      >
        <Item
          name="name"
          rules={[
            {
              required: true,
              min: 5,
              max: 30,
              message: "Necessário preencher nome (Min. 5, Max. 30)!",
              type: "string",
            },
          ]}
        >
          <TransitionalInputComponent placeholder={"Nome"} />
        </Item>
        <Item name="notes">
          <TransitionalInputComponent
            placeholder="Descrição"
            type={TransactionalInputType.TEXT_AREA}
          />
        </Item>
        <Divider plain>Adicionar Personagens (Opcional)</Divider>
        <CampaignCharacterListComponent
          selectedList={selectedList}
          setSelectedList={setSelectedList}
        />
      </Card>
    </Form>
  );
}
