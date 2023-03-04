import { LeftOutlined } from "@ant-design/icons";
import { Button, Card, Col, Modal, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  deleteCharacter,
  getCharacterDetails,
} from "../../../api/requests/character";
import PersonIcon from "../../../assets/images/Face.png";
import PotionIcon from "../../../assets/images/Potion.png";
import WandIcon from "../../../assets/images/Wand.png";
import { ColorsEnum } from "../../../enum/colors.enum";
import { SkillTypeEnum } from "../../../enum/skill-type.enum";
import { DetailedCharacter } from "../../../interfaces/character.interface";
import { useAppSelector } from "../../../redux/hooks";
import { addCharacterDetails } from "../../../redux/slices/character.slice";
import { RootState } from "../../../redux/store";
import { messageError, messageSuccess } from "../../../shared/messages";
import { GeneralComponent } from "./components/general/general.component";
import { SkillsComponent } from "./components/skills/skills.component";
import { HttpStatusEnum } from "../../../enum/http-status.enum";
import { ItemsComponent } from "./components/items/items.component";

import "./character-details.component.css";

enum StepsEnum {
  GENERAL,
  SKILLS,
  ITEMS,
}

export function CharacterDetailsComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentStep, setCurrentStep] = useState<StepsEnum>(StepsEnum.GENERAL);
  const [character, setCharacter] = useState<DetailedCharacter | null>(null);
  const { list } = useAppSelector((state: RootState) => state.character);
  const { id } = useParams<{ id: string | undefined }>();

  useEffect(() => {
    if (typeof id !== "string") {
      navigate("/character/list");
    }
    setLoading(true);
    const storeChar = list.find((c) => c.id === id);
    if (storeChar) {
      setCharacter(storeChar);
      setLoading(false);
    } else {
      // @ts-ignore
      getCharacterDetails(id)
        .then((r) => {
          const { data } = r;
          setCharacter(data);
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
        .finally(() => setLoading(false));
    }
  }

  function renderHeader() {
    if (!character) return null;
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
            <h1>{character.name}</h1>
            <div>{`${character.job.name}, Capítulo ${character.level}`}</div>
            <div>{`${character.lineage.name} ${character.background.name}`}</div>
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
          span={8}
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
          span={8}
        >
          {renderIcon(WandIcon)} Habilidades
        </Col>
        <Col
          style={{
            background: currentStep === StepsEnum.ITEMS ? "white" : "",
            borderRadius: "10px",
          }}
          onClick={() => setCurrentStep(StepsEnum.ITEMS)}
          span={8}
        >
          {renderIcon(PotionIcon)} Itens
        </Col>
      </Row>
    );
  }

  function renderDeleteConfirmation() {
    return (
      <Modal
        title="Deletar Personagem?"
        open={showDeleteConfirm}
        style={{ textAlignLast: "center" }}
        bodyStyle={{ margin: 0, padding: 0 }}
        onCancel={() => setShowDeleteConfirm(false)}
        onOk={() => handleDelete()}
      />
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
        {character && (
          <>
            <GeneralComponent
              intelligence={character.intelligence}
              cunning={character.cunning}
              tenacity={character.tenacity}
              celerity={character.celerity}
              mentalCurrent={character.mentalCurrent}
              mentalTotal={character.mentalTotal}
              physicalCurrent={character.physicalCurrent}
              physicalTotal={character.physicalTotal}
              heroismCurrent={character.heroismCurrent}
              heroismTotal={character.heroismTotal}
              basicAttack={character.job.skills.find(
                (s) => s.skillType === SkillTypeEnum.BASIC
              )}
              hidden={currentStep !== StepsEnum.GENERAL}
            />
            <SkillsComponent
              lineage={character.lineage}
              background={character.background}
              job={character.job}
              aptitudes={character.aptitudes}
              hidden={currentStep !== StepsEnum.SKILLS}
            />
            <ItemsComponent hidden={currentStep !== StepsEnum.ITEMS} />
          </>
        )}
      </Card>
      {renderDeleteConfirmation()}
    </div>
  );
}
