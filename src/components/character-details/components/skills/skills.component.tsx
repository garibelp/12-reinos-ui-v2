import { Divider, Row, Space } from "antd";
import { SkillTypeEnum } from "../../../../enum/skill-type.enum";
import { Aptitude } from "../../../../interfaces/aptitude.interface";
import { Background } from "../../../../interfaces/background.interface";
import { DetailedJob } from "../../../../interfaces/job.interface";
import { DetailedLineage } from "../../../../interfaces/lineage.interface";
import { ExpandableDetailsComponent } from "../../../../shared/components/expandable-details/expandable-details.component";

interface Props {
  lineage?: DetailedLineage;
  background?: Background;
  job?: DetailedJob;
  aptitudes?: Aptitude[];
  hidden: boolean;
}

export function SkillsComponent(props: Props) {
  const { lineage, background, job, aptitudes, hidden } = props;

  if (hidden) return null;

  function renderBackground() {
    if (!background?.advantage) return null;
    const {
      advantage: { name, description },
    } = background;
    return (
      <ExpandableDetailsComponent title={name} description={description} />
    );
  }

  function renderJobSkills() {
    if (!job || !job?.skills) return null;
    const { skills } = job;
    return skills
      .filter((s) => s.skillType !== SkillTypeEnum.BASIC)
      .map((s) => (
        <Row key={s.id}>
          <ExpandableDetailsComponent
            title={s.name}
            description={s.description}
          />
        </Row>
      ));
  }

  function renderAptitudeList() {
    if (!aptitudes) return null;
    return aptitudes.map((a) => (
      <Row key={a.id}>
        <ExpandableDetailsComponent
          title={a.name}
          description={a.description}
        />
      </Row>
    ));
  }

  return (
    <>
      <Space style={{ width: "100%" }} direction="vertical">
        <Row>
          <b>Linhagem</b>
        </Row>
        <Row>
          <ExpandableDetailsComponent
            title="Característica Positiva"
            description={lineage?.positiveTraitDescription || ""}
          />
        </Row>
        <Row>
          <ExpandableDetailsComponent
            title="Característica Negativa"
            description={lineage?.negativeTraitDescription || ""}
          />
        </Row>
      </Space>
      <Divider />
      <Space style={{ width: "100%" }} direction="vertical">
        <Row>
          <b>Antecedente</b>
        </Row>
        <Row> {renderBackground()}</Row>
      </Space>
      <Divider />
      <Space style={{ width: "100%" }} direction="vertical">
        <Row>
          <b>Classe</b>
        </Row>
        {renderJobSkills()}
      </Space>
      <Divider />
      <Space style={{ width: "100%" }} direction="vertical">
        <Row>
          <b>Aptidões</b>
        </Row>
        {renderAptitudeList()}
      </Space>
    </>
  );
}
