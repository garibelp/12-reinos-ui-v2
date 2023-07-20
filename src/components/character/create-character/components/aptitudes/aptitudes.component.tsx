import { Checkbox, Col, Divider, Form, Modal, Row, Space } from "antd";

import { useAppSelector } from "../../../../../redux/hooks";
import { RootState } from "../../../../../redux/store";
import {
  TransactionalInputType,
  TransitionalInputComponent,
} from "../../../../../shared/components/transactional-input/transitional-input.component";

import "./aptitudes.component.css";
import { EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Aptitude } from "../../../../../interfaces/aptitude.interface";
import { TextWithBreaklineComponent } from "../../../../../shared/components/text-with-breakline/text-with-breakline.component";

const { Item } = Form;
const { Group: CheckboxGroup } = Checkbox;

export function AptitudesComponent({
  hidden,
  jobId,
}: {
  hidden: boolean;
  jobId: string | undefined;
}) {
  const [showDescription, setShowDescription] = useState(false);
  const [detailedAptitude, setDetailedAptitude] = useState<
    Aptitude | undefined
  >();
  const detailedJobList = useAppSelector(
    (state: RootState) => state.job.detailedList
  );

  function retrieveOptions() {
    const selectedJob = detailedJobList.find((j) => j.id === jobId);
    if (!selectedJob) return null;
    function handleDescriptionDisplay(a: Aptitude) {
      setDetailedAptitude(a);
      setShowDescription(true);
    }

    return selectedJob.aptitudes.map((a) => (
      <Row justify="space-between" align="middle">
        <Col>
          <Checkbox key={a.id} value={a.id}>
            {a.name}
          </Checkbox>
        </Col>
        <Col>
          <EyeOutlined
            onClick={() => {
              handleDescriptionDisplay(a);
            }}
          />
        </Col>
      </Row>
    ));
  }

  function renderDetails() {
    if (hidden) return null;
  }

  return (
    <div>
      <Modal
        title={detailedAptitude?.name}
        open={showDescription}
        closable={false}
        footer={null}
        onOk={() => {
          setShowDescription(false);
        }}
        onCancel={() => {
          setShowDescription(false);
        }}
      >
        <TextWithBreaklineComponent text={detailedAptitude?.description} />
      </Modal>
      <Item
        name="name"
        hidden={hidden}
        rules={[
          {
            required: true,
            min: 5,
            max: 20,
            message: "Necessário preencher nome (Min. 5, Max. 20)!",
            type: "string",
          },
        ]}
      >
        <TransitionalInputComponent placeholder="Nome de Personagem" />
      </Item>
      <Item
        name="bond"
        hidden={hidden}
        rules={[
          {
            required: true,
            whitespace: true,
            max: 200,
            message: "Necessário preencher vínculo (Max. 200)!",
            type: "string",
          },
        ]}
      >
        <TransitionalInputComponent
          placeholder="Vínculo"
          type={TransactionalInputType.TEXT_AREA}
        />
      </Item>
      <Item
        name="motivation"
        hidden={hidden}
        rules={[
          {
            required: true,
            whitespace: true,
            max: 200,
            message: "Necessário preencher motivação (Max. 200)!",
            type: "string",
          },
        ]}
      >
        <TransitionalInputComponent
          placeholder="Motivação"
          type={TransactionalInputType.TEXT_AREA}
        />
      </Item>
      {!hidden && <Divider plain> Selecionar Aptidões </Divider>}
      <Item
        hidden={hidden}
        name="aptitudeList"
        rules={[
          {
            required: true,
            min: 3,
            max: 3,
            message: "Necessário selecionar exatamente 3 aptidões!",
            type: "array",
          },
        ]}
        style={{ marginBottom: 0 }}
      >
        <CheckboxGroup style={{ width: "100%" }}>
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            {retrieveOptions()}
          </Space>
        </CheckboxGroup>
      </Item>
      {renderDetails()}
    </div>
  );
}
