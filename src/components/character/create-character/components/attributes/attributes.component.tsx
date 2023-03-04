import { Button, Form, FormInstance, Modal, Row } from "antd";
import { useEffect, useState } from "react";

import D4Icon from "../../../../../assets/images/D4.png";
import D6Icon from "../../../../../assets/images/D6.png";
import D8Icon from "../../../../../assets/images/D8.png";
import { AttributeEnum } from "../../../../../enum/attribute.enum";
import { ColorsEnum } from "../../../../../enum/colors.enum";
import { DiceEnum } from "../../../../../enum/dice.enum";
import { useAppSelector } from "../../../../../redux/hooks";
import { RootState } from "../../../../../redux/store";
import { getEnumKey } from "../../../../../utils/enum-utils";

import "./attribute.component.css";

const { Item } = Form;

interface AttributeDice {
  attribute: AttributeEnum | null;
  diceValue: DiceEnum;
}

const initialAttributesState = [
  { diceValue: DiceEnum.D4, attribute: null },
  { diceValue: DiceEnum.D4, attribute: null },
  { diceValue: DiceEnum.D6, attribute: null },
  { diceValue: DiceEnum.D8, attribute: null },
];

export function AttributesComponent({
  hidden,
  form,
}: {
  hidden: boolean;
  form: FormInstance;
}) {
  const [showModal, setShowModal] = useState(false);
  const { detailedList } = useAppSelector((state: RootState) => state.job);
  const [currAttr, setCurrAttr] = useState<AttributeEnum | null>(null);
  const [attributes, setAttributes] = useState<AttributeDice[]>(
    initialAttributesState
  );

  const jobId = form.getFieldValue("jobId");

  useEffect(() => {
    const selectedJob = detailedList.find((j) => j.id === jobId);
    if (selectedJob) {
      const { mainAttribute } = selectedJob;
      // @ts-ignore
      const attribute = AttributeEnum[mainAttribute];
      setAttributes(
        attributes.map((a, i) => {
          a.attribute = i !== 3 ? null : attribute;
          return a;
        })
      );
      updateForm(3, attribute);
    }
  }, [detailedList, jobId]);

  function updateForm(diceIndex: number, attribute: AttributeEnum | null) {
    const attrKey = getEnumKey(attribute, AttributeEnum, true);
    const diceKey = getEnumKey(attributes[diceIndex].diceValue, DiceEnum);
    form.setFieldValue(attrKey, diceKey);
  }

  function handleDiceSelection(diceIndex: number) {
    setAttributes(
      attributes.map((a, i) => {
        if (i === diceIndex) {
          a.attribute = !a.attribute ? currAttr : null;
        } else if (a.attribute === currAttr) {
          a.attribute = null;
        }
        return a;
      })
    );
    updateForm(diceIndex, currAttr);
    setShowModal(false);
  }

  function renderDiceButton(icon: any, index: number) {
    let background = "green";

    const isAlreadySelected = !!attributes[index].attribute;
    const isCurrentAttribute = attributes[index].attribute === currAttr;

    if (isAlreadySelected) background = "red";
    if (isCurrentAttribute) background = "gray";

    return (
      <Button
        className="circle-button"
        style={{ background }}
        shape="circle"
        type="text"
        disabled={isAlreadySelected && !isCurrentAttribute}
        onClick={() => handleDiceSelection(index)}
        icon={<img src={icon} alt="" className="circle-button-icon" />}
      />
    );
  }

  function renderModal() {
    return (
      <Modal
        className="dice-modal"
        footer={null}
        open={showModal}
        title={`Dado de ${currAttr}`}
        onCancel={() => setShowModal(false)}
      >
        <Row justify="space-evenly">
          {renderDiceButton(D4Icon, 0)}
          {renderDiceButton(D4Icon, 1)}
        </Row>
        <Row justify="space-evenly" style={{ paddingTop: "15px" }}>
          {renderDiceButton(D6Icon, 2)}
          {renderDiceButton(D8Icon, 3)}
        </Row>
      </Modal>
    );
  }

  function renderAttrButton(background: ColorsEnum, attribute: AttributeEnum) {
    const displayValue = () => {
      const selected = attributes.find((a) => a.attribute === attribute);

      if (selected) {
        const { diceValue } = selected;
        let icon: any;
        if (diceValue !== null) {
          if (diceValue === DiceEnum.D4) icon = D4Icon;
          if (diceValue === DiceEnum.D6) icon = D6Icon;
          if (diceValue === DiceEnum.D8) icon = D8Icon;
          return <img src={icon} alt="" className="circle-button-icon" />;
        }
      }
      return (
        <>
          Selecionar <br /> {attribute}
        </>
      );
    };

    return (
      <Item name={getEnumKey(attribute, AttributeEnum, true)}>
        <Button
          style={{ background }}
          className="circle-button"
          shape="circle"
          type="text"
          onClick={() => {
            setCurrAttr(attribute);
            setShowModal(true);
          }}
        >
          {displayValue()}
        </Button>
      </Item>
    );
  }

  return (
    <div hidden={hidden}>
      <Row justify="space-evenly">
        {renderAttrButton(ColorsEnum.INTELLIGENCE, AttributeEnum.INTELLIGENCE)}
        {renderAttrButton(ColorsEnum.CUNNING, AttributeEnum.CUNNING)}
      </Row>
      <Row justify="space-evenly" style={{ paddingTop: "32px" }}>
        {renderAttrButton(ColorsEnum.TENACITY, AttributeEnum.TENACITY)}
        {renderAttrButton(ColorsEnum.CELERITY, AttributeEnum.CELERITY)}
      </Row>
      {renderModal()}
    </div>
  );
}
