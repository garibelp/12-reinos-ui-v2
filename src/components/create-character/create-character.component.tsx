import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Row } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { messageWarning } from "../../shared/messages";
import { AptitudesComponent } from "./components/aptitudes/aptitudes.component";
import { BackgroundComponent } from "./components/background/background.component";
import { JobComponent } from "./components/job/job.component";
import { LineageComponent } from "./components/lineage/lineage.component";

import "./create-character.component.css";

const { useForm } = Form;

const Steps = [
  { index: 0, name: "Antecedente" },
  { index: 1, name: "Classe" },
  { index: 2, name: "Linhagem" },
  { index: 3, name: "Aptidões" },
];

interface Props {
  step: string;
}

function CreateCharacterHeader(props: Props) {
  const navigate = useNavigate();
  const { step } = props;

  return (
    <Row className="create-character-card-header">
      <Col span={12}>
        <Button
          type="text"
          className="return-button"
          icon={<LeftOutlined />}
          onClick={() => {
            navigate("/home");
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
  const [currentStep, setCurrentStep] = useState(Steps[0]);
  const [form] = useForm();

  function onFinish(values: any) {
    console.log("FORM", values);
  }

  function returnStep() {
    setCurrentStep(Steps[currentStep.index - 1]);
  }

  function advanceStep() {
    console.log("F", form.getFieldsValue());
    if (isStepFilled()) setCurrentStep(Steps[currentStep.index + 1]);
    else messageWarning("Preencher etapa atual para prosseguir");
  }

  function isStepFilled(): boolean {
    const index = currentStep.index;
    if (index === 0 && form.getFieldValue("backgroundId")) return true;
    if (index === 1 && form.getFieldValue("jobId")) return true;
    if (index === 2 && form.getFieldValue("lineageId")) return true;
    return !!(
      index === 3 &&
      form.getFieldValue("firstAptitude") &&
      form.getFieldValue("secondAptitude") &&
      form.getFieldValue("thirdAptitude")
    );
  }

  function CreateCharacterFooter() {
    const secondaryButton =
      currentStep.index === 3 ? (
        <Button className="footer-button" type="text" htmlType="submit">
          Finalizar
        </Button>
      ) : (
        <Button onClick={advanceStep} className="footer-button" type="text">
          Avançar <RightOutlined />
        </Button>
      );

    return (
      <div className="footer">
        <Button
          className="footer-button"
          type="text"
          disabled={currentStep.index === 0}
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
        title={<CreateCharacterHeader step={currentStep.name} />}
        actions={[<CreateCharacterFooter />]}
      >
        <BackgroundComponent hidden={currentStep.index !== 0} />
        <JobComponent hidden={currentStep.index !== 1} />
        <LineageComponent hidden={currentStep.index !== 2} />
        <AptitudesComponent hidden={currentStep.index !== 3} />
      </Card>
    </Form>
  );
}
