import { Divider, Row, Space } from "antd";

import { SkillTypeEnum } from "../../../../../enum/skill-type.enum";
import { ExpandableDetailsComponent } from "../../../../../shared/components/expandable-details/expandable-details.component";
import { useAppSelector } from "../../../../../redux/hooks";
import { RootState } from "../../../../../redux/store";
import { groupBy } from "../../../../../utils/array-utils";

interface Props {
  sheetId: string;
  hidden: boolean;
}

export function SkillsComponent({ sheetId, hidden }: Props) {
  const { list } = useAppSelector((state: RootState) => state.character);
  const storeChar = list.find((c) => c.id === sheetId);

  if (hidden || !storeChar) return null;

  const { lineage, background, job, aptitudes, level } = storeChar;

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
    const groupedSkills = groupBy(
      skills.filter(
        (s) => s.skillType !== SkillTypeEnum.BASIC && s.skillLevel <= level
      ),
      "skillLevel"
    );

    return Object.entries(groupedSkills).map(([key, value]) => {
      return (
        <>
          <div style={{ fontStyle: "italic", paddingLeft: "15px" }}>
            Capítulo {key}
          </div>
          {/* @ts-ignore */}
          {value.map((s) => (
            <Row key={s.id}>
              <ExpandableDetailsComponent
                title={`${s.name}`}
                description={s.description}
              />
            </Row>
          ))}
        </>
      );
    });
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
