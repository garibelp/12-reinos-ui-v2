import { Button, Col, Form, Modal, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { getDetailedJob, getJobList } from "../../../../api/requests/job";
import BrainIcon from "../../../../assets/images/Brain.png";
import D8Icon from "../../../../assets/images/D8.png";
import PersonIcon from "../../../../assets/images/Person.png";
import SwordIcon from "../../../../assets/images/Sword.png";
import { AttributeEnum } from "../../../../enum/attribute.enum";
import { ColorsEnum } from "../../../../enum/colors.enum";
import { SkillTypeEnum } from "../../../../enum/skill-type.enum";
import { IdName } from "../../../../interfaces/id-name.interface";
import { DetailedJob } from "../../../../interfaces/job.interface";
import { Skill } from "../../../../interfaces/skill.interface";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  addDetailedJob,
  setBasicJobs,
} from "../../../../redux/slices/job.slice";
import { RootState } from "../../../../redux/store";
import { CircleButtonComponent } from "../../../../shared/circle-button/circle-button.component";
import { ExpandableDetailsComponent } from "../../../../shared/expandable-details/expandable-details.component";
import { TextWithBreaklineComponent } from "../../../../shared/text-with-breakline/text-with-breakline.component";
import "./job.component.css";

const { Item } = Form;
const { Option } = Select;

export function JobComponent({
  hidden,
  setDisableNext,
}: {
  hidden: boolean;
  setDisableNext: Function;
}) {
  const dispatch = useAppDispatch();
  const [showCombatSkill, setShowCombatSkill] = useState(false);
  const [showInterpretationSkill, setShowInterpretationSkill] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jobList, setJobList] = useState<IdName[]>([]);
  const [selectedJob, setSelectedJob] = useState<DetailedJob | null>(null);
  const jobRedux = useAppSelector((state: RootState) => state.job);

  useEffect(() => {
    setLoading(true);
    setDisableNext(true);
    if (jobRedux.list.length > 0) {
      setJobList(jobRedux.list);
      setLoading(false);
      setDisableNext(false);
    } else {
      getJobList()
        .then((r) => {
          const {
            data: { list },
          } = r;
          setJobList(list);
          dispatch(setBasicJobs(list));
        })
        .catch((ex) => {
          console.error(ex);
        })
        .finally(() => {
          setLoading(false);
          setDisableNext(false);
        });
    }
  }, []);

  function handleSelect(id: string) {
    setLoading(true);
    setDisableNext(true);
    const { detailedList } = jobRedux;
    const job = detailedList.find((j) => j.id === id);
    if (job) {
      setSelectedJob(job);
      setLoading(false);
      setDisableNext(false);
    } else {
      getDetailedJob(id)
        .then((r) => {
          const { data } = r;
          dispatch(addDetailedJob(data));
          setSelectedJob(data);
        })
        .catch((ex) => {
          console.error(ex);
        })
        .finally(() => {
          setLoading(false);
          setDisableNext(false);
        });
    }
  }

  function retrieveOptions() {
    return jobList.map((job) => (
      <Option key={job.id} value={job.id}>
        {job.name}
      </Option>
    ));
  }

  function renderDetails() {
    if (!selectedJob || hidden) return null;
    // @ts-ignore
    const attributeColor = ColorsEnum[selectedJob.mainAttribute];
    const { skills } = selectedJob;

    const basicAttack = skills.find((s) => s.skillType === SkillTypeEnum.BASIC);
    const combatSkill = skills.find(
      (s) => s.skillType === SkillTypeEnum.COMBAT
    );
    const interpretationSkill = skills.find(
      (s) => s.skillType === SkillTypeEnum.INTERPRETATION
    );

    function renderModal(
      skill: Skill | undefined,
      showModal: boolean,
      callback: any
    ) {
      return (
        <Modal
          title={skill && skill.name}
          open={showModal}
          onCancel={() => callback(false)}
          footer={null}
        >
          {/*@ts-ignore*/}
          <TextWithBreaklineComponent text={skill && skill.description} />
        </Modal>
      );
    }

    return (
      <>
        <Row justify="space-evenly" className="job-details">
          <CircleButtonComponent
            icon={BrainIcon}
            value={selectedJob.mentalPoints}
            name="Energia Mental"
            backgroundColor={ColorsEnum.BASE_GRAY}
          />
          <CircleButtonComponent
            icon={PersonIcon}
            value={selectedJob.physicalPoints}
            name="Energia Física"
            backgroundColor={ColorsEnum.BASE_GRAY}
          />
        </Row>
        <Row justify="space-evenly" className="job-details">
          <CircleButtonComponent
            icon={SwordIcon}
            value={`${basicAttack && basicAttack.cost} / ${
              basicAttack && basicAttack.range
            }m`}
            name="Ataque Básico"
            description="Dano / Distância em metros"
            textColor={ColorsEnum.WHITE}
            backgroundColor={ColorsEnum.BASIC_ATTACK}
          />
          <CircleButtonComponent
            icon={D8Icon}
            name="Atributo Principal"
            // @ts-ignore
            description={AttributeEnum[selectedJob.mainAttribute]}
            backgroundColor={attributeColor}
          />
        </Row>
        <Row className="job-details">
          <ExpandableDetailsComponent description={selectedJob.description} />
        </Row>
        <Row className="job-details">
          <Col span={12}>
            <Button
              className="job-details-skill-button"
              type="primary"
              onClick={() => setShowCombatSkill(true)}
            >
              {combatSkill && combatSkill.name}
            </Button>
          </Col>
          <Col span={12}>
            <Button
              className="job-details-skill-button"
              type="primary"
              onClick={() => setShowInterpretationSkill(true)}
            >
              {interpretationSkill && interpretationSkill.name}
            </Button>
          </Col>
        </Row>
        {renderModal(combatSkill, showCombatSkill, setShowCombatSkill)}
        {renderModal(
          interpretationSkill,
          showInterpretationSkill,
          setShowInterpretationSkill
        )}
      </>
    );
  }

  return (
    <>
      <Row hidden={hidden}>
        <Col span={24}>
          <Item hidden={hidden} name="jobId">
            <Select
              style={{ width: "100%" }}
              loading={loading}
              disabled={loading}
              onSelect={handleSelect}
              placeholder="Selecionar classe"
            >
              {retrieveOptions()}
            </Select>
          </Item>
        </Col>
      </Row>
      {renderDetails()}
    </>
  );
}
