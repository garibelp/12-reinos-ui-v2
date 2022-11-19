import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { getCharacterDetails } from "../../api/requests/character";
import PersonIcon from "../../assets/images/Face.png";
import PotionIcon from "../../assets/images/Potion.png";
import WandIcon from "../../assets/images/Wand.png";
import { ColorsEnum } from "../../enum/colors.enum";
import { DetailedCharacter } from "../../interfaces/character.interface";
import { useAppSelector } from "../../redux/hooks";
import { addCharacterDetails } from "../../redux/slices/character.slice";
import { RootState } from "../../redux/store";
import { messageError } from "../../shared/messages";

import "./character-details.component.css";
import { GeneralComponent } from "./components/general/general.component";
import { ItemsComponent } from "./components/items/items.component";
import { SkillsComponent } from "./components/skills/skills.component";

enum StepsEnum {
  GENERAL,
  SKILLS,
  ITEMS,
}

export function CharacterDetailsComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<StepsEnum>(StepsEnum.GENERAL);
  const [character, setCharacter] = useState<DetailedCharacter | null>(null);
  const { list } = useAppSelector((state: RootState) => state.character);
  const { id } = useParams<{ id: string | undefined }>();

  useEffect(() => {
    if (typeof id !== "string") {
      navigate("/home");
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
          console.log(r);
          const { data } = r;
          setCharacter(data);
          dispatch(addCharacterDetails(data));
        })
        .catch(() => {
          messageError("ID inválido! Redirecionando para página inicial");
          navigate("/home");
        })
        .finally(() => setLoading(false));
    }
  }, []);

  function renderHeader() {
    if (!character) return null;
    return (
      <div className="character-details-card-header">
        <h1>{character.name}</h1>
        <div>{`${character.job.name}, Capítulo ${character.level}`}</div>
        <div>{`${character.lineage.name} ${character.background.name}`}</div>
      </div>
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
          }}
          span={8}
          onClick={() => setCurrentStep(StepsEnum.GENERAL)}
        >
          {renderIcon(PersonIcon)} Geral
        </Col>
        <Col
          style={{
            background: currentStep === StepsEnum.SKILLS ? "white" : "",
          }}
          onClick={() => setCurrentStep(StepsEnum.SKILLS)}
          span={8}
        >
          {renderIcon(WandIcon)} Habilidades
        </Col>
        <Col
          style={{
            background: currentStep === StepsEnum.ITEMS ? "white" : "",
          }}
          onClick={() => setCurrentStep(StepsEnum.ITEMS)}
          span={8}
        >
          {renderIcon(PotionIcon)} Itens
        </Col>
      </Row>
    );
  }

  return (
    <Card
      className="character-details-card"
      loading={loading}
      title={renderHeader()}
      headStyle={{ background: ColorsEnum.BASE_GRAY }}
      actions={[renderFooter()]}
    >
      <GeneralComponent hidden={currentStep !== StepsEnum.GENERAL} />
      <SkillsComponent hidden={currentStep !== StepsEnum.SKILLS} />
      <ItemsComponent hidden={currentStep !== StepsEnum.ITEMS} />
    </Card>
  );
}
