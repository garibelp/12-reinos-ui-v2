import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Row } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCharacter } from "../../api/requests/character";
import { AttributeEnum } from "../../enum/attribute.enum";
import { HttpStatusEnum } from "../../enum/http-status.enum";
import { messageError, messageWarning } from "../../shared/messages";
import { getEnumKey } from "../../utils/enum-utils";
import { AptitudesComponent } from "./components/aptitudes/aptitudes.component";
import { AttributesComponent } from "./components/attributes/attributes.component";
import { BackgroundComponent } from "./components/background/background.component";
import { JobComponent } from "./components/job/job.component";
import { LineageComponent } from "./components/lineage/lineage.component";

import "./create-character.component.css";

const { useForm } = Form;

const Steps = [
  { index: 0, name: "Antecedente" },
  { index: 1, name: "Classe" },
  { index: 2, name: "Linhagem" },
  { index: 3, name: "Atributos" },
  { index: 4, name: "Aptidões" },
];

interface Props {
  step: string;
  disableCancel: boolean;
}

function CreateCharacterHeader(props: Props) {
  const navigate = useNavigate();
  const { step, disableCancel } = props;

  return (
    <Row className="create-character-card-header">
      <Col span={12}>
        <Button
          type="text"
          className="return-button"
          disabled={disableCancel}
          icon={<LeftOutlined />}
          onClick={() => {
            navigate("/character/list");
          }}
        >
          Cancelar
        </Button>
      </Col>
      <Col className="create-character-step" span={12}>
        {step}
      </Col>
    </Row>
  );
}

export function CreateCharacterComponent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(Steps[0]);
  const [disableNext, setDisableNext] = useState(false);
  const [form] = useForm();

  function onFinish(values: any) {
    setLoading(true);
    createCharacter(values)
      .then(() => {
        navigate("/character/list");
      })
      .catch((ex) => {
        const {
          response: { status },
        } = ex;
        if (status === HttpStatusEnum.UNAUTHORIZED) {
          messageError("Sessão expirada, favor logar novamente");
          navigate("/character/list");
        } else {
          messageError("Falha ao criar personagem. Tente novamente mais tarde");
        }
      })
      .finally(() => setLoading(false));
  }

  function returnStep() {
    setCurrentStep(Steps[currentStep.index - 1]);
  }

  function advanceStep() {
    if (isStepFilled()) setCurrentStep(Steps[currentStep.index + 1]);
    else messageWarning("Preencher etapa atual para prosseguir");
  }

  function isStepFilled(): boolean {
    const index = currentStep.index;
    if (index === 0 && form.getFieldValue("backgroundId")) return true;
    if (index === 1 && form.getFieldValue("jobId")) return true;
    if (index === 2 && form.getFieldValue("lineageId")) return true;
    const int = form.getFieldValue(
      getEnumKey(AttributeEnum.INTELLIGENCE, AttributeEnum, true)
    );
    const cun = form.getFieldValue(
      getEnumKey(AttributeEnum.CUNNING, AttributeEnum, true)
    );
    const cel = form.getFieldValue(
      getEnumKey(AttributeEnum.CELERITY, AttributeEnum, true)
    );
    const ten = form.getFieldValue(
      getEnumKey(AttributeEnum.TENACITY, AttributeEnum, true)
    );
    return !!(index === 3 && int && cun && cel && ten);
  }

  function CreateCharacterFooter() {
    const secondaryButton =
      currentStep.index === 4 ? (
        <Button
          disabled={loading}
          className="footer-button"
          type="text"
          htmlType="submit"
        >
          Finalizar
        </Button>
      ) : (
        <Button
          disabled={disableNext}
          onClick={advanceStep}
          className="footer-button"
          type="text"
        >
          Avançar <RightOutlined />
        </Button>
      );

    return (
      <div className="footer">
        <Button
          className="footer-button"
          type="text"
          disabled={currentStep.index === 0 || loading}
          onClick={returnStep}
          icon={<LeftOutlined />}
        >
          Voltar
        </Button>
        {secondaryButton}
      </div>
    );
  }

  return (
    <Form form={form} onFinish={onFinish} className="create-character-wrapper">
      <Card
        className="create-character-card"
        title={
          <CreateCharacterHeader
            disableCancel={loading}
            step={currentStep.name}
          />
        }
        actions={[<CreateCharacterFooter />]}
        loading={loading}
      >
        <BackgroundComponent
          setDisableNext={setDisableNext}
          hidden={currentStep.index !== 0}
        />
        <JobComponent
          setDisableNext={setDisableNext}
          hidden={currentStep.index !== 1}
        />
        <LineageComponent
          setDisableNext={setDisableNext}
          hidden={currentStep.index !== 2}
        />
        <AttributesComponent form={form} hidden={currentStep.index !== 3} />
        <AptitudesComponent
          jobId={form.getFieldValue("jobId")}
          hidden={currentStep.index !== 4}
        />
      </Card>
    </Form>
  );
}
