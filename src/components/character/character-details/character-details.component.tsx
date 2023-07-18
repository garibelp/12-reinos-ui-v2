import { LeftOutlined } from "@ant-design/icons";
import { Button, Card, Col, Modal, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  deleteCharacter,
  getCharacterDetails,
  levelUp,
} from "../../../api/requests/character";
import LevelUpIcon from "../../../assets/images/Levelup.png";
import PersonIcon from "../../../assets/images/Face.png";
import PotionIcon from "../../../assets/images/Potion.png";
import WandIcon from "../../../assets/images/Wand.png";
import NotesIcon from "../../../assets/images/Notes.png";
import { ColorsEnum } from "../../../enum/colors.enum";
import { SkillTypeEnum } from "../../../enum/skill-type.enum";
import { useAppSelector } from "../../../redux/hooks";
import { addCharacterDetails } from "../../../redux/slices/character.slice";
import { RootState } from "../../../redux/store";
import { messageError, messageSuccess } from "../../../shared/messages";
import { GeneralComponent } from "./components/general/general.component";
import { SkillsComponent } from "./components/skills/skills.component";
import { HttpStatusEnum } from "../../../enum/http-status.enum";
import { ItemsComponent } from "./components/items/items.component";
import { NotesComponent } from "./components/notes/notes.component";
import { getWoundList } from "../../../api/requests/wounds";
import { setWoundList } from "../../../redux/slices/wound.slice";

import "./character-details.component.css";

enum StepsEnum {
  GENERAL,
  SKILLS,
  NOTES,
  ITEMS,
}

export function CharacterDetailsComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showLevelUpConfirm, setShowLevelUpConfirm] = useState(false);
  const [currentStep, setCurrentStep] = useState<StepsEnum>(StepsEnum.GENERAL);
  const { list } = useAppSelector((state: RootState) => state.character);
  const { list: woundList } = useAppSelector((state: RootState) => state.wound);
  const { id } = useParams<{ id: string | undefined }>();

  const storeChar = list.find((c) => c.id === id);

  useEffect(() => {
    if (typeof id !== "string") {
      navigate("/character/list");
    }
    setLoading(true);
    loadWounds();
    if (storeChar) {
      setLoading(false);
    } else {
      // @ts-ignore
      getCharacterDetails(id)
        .then((r) => {
          const { data } = r;
          dispatch(addCharacterDetails(data));
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
          navigate("/character/list");
        })
        .finally(() => setLoading(false));
    }
  }, []);

  function loadWounds() {
    if (woundList.length === 0) {
      getWoundList().then((r) => {
        const {
          data: { list },
        } = r;
        dispatch(setWoundList(list));
      });
    }
  }

  function handleDelete() {
    if (id) {
      setLoading(true);
      deleteCharacter(id)
        .then(() => {
          messageSuccess("Personagem deletado com sucesso!");
          navigate("/character/list");
        })
        .catch((ex) => {
          console.error(ex);
          messageError("Erro ao tentar deletar personagem.");
        })
        .finally(() => {
          setShowDeleteConfirm(false);
          setLoading(false);
        });
    }
  }

  function handleLevelUp(): void {
    if (id) {
      setLoading(true);
      levelUp(id)
        .then(() => {
          messageSuccess(
            "Personagem subiu de nível com sucesso! Atualizando ficha."
          );
          setTimeout(() => {
            window.location.reload();
            setLoading(false);
          }, 2000);
        })
        .catch((ex) => {
          console.error(ex);
          messageError("Erro ao tentar subir personagem de nível.");
          setLoading(false);
        })
        .finally(() => {
          setShowLevelUpConfirm(false);
        });
    }
  }

  function renderHeader() {
    if (!storeChar) return null;

    return (
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Row justify="space-between">
          <Button
            type="text"
            icon={<LeftOutlined />}
            style={{ color: ColorsEnum.DARK_GRAY }}
            onClick={() => navigate("/character/list")}
          >
            Voltar
          </Button>
          <Button
            danger
            type="text"
            style={{ paddingRight: "18px" }}
            onClick={() => setShowDeleteConfirm(true)}
          >
            Deletar
          </Button>
        </Row>
        <Row>
          <div className="character-details-card-header">
            <div>
              <h1>{storeChar.name}</h1>
              <div>{`${storeChar.job.name}, Capítulo ${storeChar.level}`}</div>
              <div>{`${storeChar.lineage.name} ${storeChar.background.name}`}</div>
            </div>
            <div className="character-details-levelup">
              <Button
                hidden={storeChar.level > 2}
                onClick={() => setShowLevelUpConfirm(true)}
              >
                <img src={LevelUpIcon} alt="" />
              </Button>
            </div>
          </div>
        </Row>
      </Space>
    );
  }

  function renderIcon(iconSrc: string) {
    return (
      <img
        src={iconSrc}
        alt=""
        className="character-details-card-footer-icon"
      />
    );
  }

  function renderFooter() {
    return (
      <Row className="character-details-card-footer" justify="space-evenly">
        <Col
          style={{
            background: currentStep === StepsEnum.GENERAL ? "white" : "",
            borderRadius: "10px",
          }}
          span={6}
          onClick={() => setCurrentStep(StepsEnum.GENERAL)}
        >
          {renderIcon(PersonIcon)} Geral
        </Col>
        <Col
          style={{
            background: currentStep === StepsEnum.SKILLS ? "white" : "",
            borderRadius: "10px",
          }}
          onClick={() => setCurrentStep(StepsEnum.SKILLS)}
          span={6}
        >
          {renderIcon(WandIcon)} Habilidades
        </Col>
        <Col
          style={{
            background: currentStep === StepsEnum.ITEMS ? "white" : "",
            borderRadius: "10px",
          }}
          onClick={() => setCurrentStep(StepsEnum.ITEMS)}
          span={6}
        >
          {renderIcon(PotionIcon)} Itens
        </Col>
        <Col
          style={{
            background: currentStep === StepsEnum.NOTES ? "white" : "",
            borderRadius: "10px",
          }}
          onClick={() => setCurrentStep(StepsEnum.NOTES)}
          span={6}
        >
          {renderIcon(NotesIcon)} Notas
        </Col>
      </Row>
    );
  }

  function renderConfirmationModal(
    title: string,
    open: boolean,
    callbackConfirm: (e: any) => void,
    callbackDelete: (e: any) => void
  ) {
    return (
      <Modal
        title={title}
        open={open}
        style={{ textAlignLast: "center" }}
        bodyStyle={{ margin: 0, padding: 0 }}
        onCancel={callbackDelete}
        onOk={callbackConfirm}
        cancelText="Cancelar"
        okText="Confirmar"
      />
    );
  }

  function renderDeleteConfirmation() {
    return renderConfirmationModal(
      "Deletar Personagem?",
      showDeleteConfirm,
      () => handleDelete(),
      () => setShowDeleteConfirm(false)
    );
  }

  function renderLevelUpConfirmation() {
    return renderConfirmationModal(
      "Subir de capítulo?",
      showLevelUpConfirm,
      () => handleLevelUp(),
      () => setShowLevelUpConfirm(false)
    );
  }

  return (
    <div className="character-details-wrapper">
      <Card
        className="character-details-card"
        loading={loading}
        title={renderHeader()}
        headStyle={{ padding: 0 }}
        actions={[renderFooter()]}
      >
        {storeChar && (
          <>
            <GeneralComponent
              intelligence={storeChar.intelligence}
              cunning={storeChar.cunning}
              tenacity={storeChar.tenacity}
              celerity={storeChar.celerity}
              mentalCurrent={storeChar.mentalCurrent}
              mentalTotal={storeChar.mentalTotal}
              physicalCurrent={storeChar.physicalCurrent}
              physicalTotal={storeChar.physicalTotal}
              heroismCurrent={storeChar.heroismCurrent}
              heroismTotal={storeChar.heroismTotal}
              mainAttribute={storeChar.job.mainAttribute}
              lineage={storeChar.lineage.name}
              basicAttack={storeChar.job.skills.find(
                (s) => s.skillType === SkillTypeEnum.BASIC
              )}
              hidden={currentStep !== StepsEnum.GENERAL}
            />
            <SkillsComponent
              lineage={storeChar.lineage}
              background={storeChar.background}
              job={storeChar.job}
              aptitudes={storeChar.aptitudes}
              hidden={currentStep !== StepsEnum.SKILLS}
              level={storeChar.level}
            />
            <ItemsComponent hidden={currentStep !== StepsEnum.ITEMS} />
            <NotesComponent
              hidden={currentStep !== StepsEnum.NOTES}
              currentWound={storeChar.wound}
              sheetId={storeChar.id}
            />
          </>
        )}
      </Card>
      {renderDeleteConfirmation()}
      {renderLevelUpConfirmation()}
    </div>
  );
}
