import { Button, Form, FormInstance, Modal, Row } from "antd";
import { useState } from "react";
import D4Icon from "../../../../assets/images/D4.png";
import D6Icon from "../../../../assets/images/D6.png";
import D8Icon from "../../../../assets/images/D8.png";

import { AttributeEnum } from "../../../../enum/attribute.enum";
import { ColorsEnum } from "../../../../enum/colors.enum";
import { DiceEnum } from "../../../../enum/dice.enum";
import { getEnumKey } from "../../../../utils/enum-utils";

import "./attribute.component.css";

const { Item } = Form;

interface AttributeDice {
  attribute: AttributeEnum;
  diceIndex: number | null;
  diceValue: DiceEnum | null;
}

export function AttributesComponent({
  hidden,
  form,
}: {
  hidden: boolean;
  form: FormInstance;
}) {
  const [currentAttribute, setCurrentAttribute] =
    useState<AttributeEnum | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [attributes, setAttributes] = useState<AttributeDice[]>([
    { attribute: AttributeEnum.INTELLIGENCE, diceIndex: null, diceValue: null },
    { attribute: AttributeEnum.CUNNING, diceIndex: null, diceValue: null },
    { attribute: AttributeEnum.TENACITY, diceIndex: null, diceValue: null },
    { attribute: AttributeEnum.CELERITY, diceIndex: null, diceValue: null },
  ]);

  function isCurrentAttribute(index: number) {
    return !!attributes.find(
      (a) => a.attribute === currentAttribute && a.diceIndex === index
    );
  }

  function handleDiceSelection(diceIndex: number, value: DiceEnum) {
    setAttributes((prevState) => {
      const currentAttributeIndex = attributes.findIndex(
        (a) => a.attribute === currentAttribute
      );
      const attributeKey = getEnumKey(currentAttribute, AttributeEnum, true);
      if (isCurrentAttribute(diceIndex)) {
        prevState[currentAttributeIndex].diceIndex = null;
        prevState[currentAttributeIndex].diceValue = null;
        form.setFieldsValue({ [attributeKey]: null });
      } else {
        prevState[currentAttributeIndex].diceIndex = diceIndex;
        prevState[currentAttributeIndex].diceValue = value;
        form.setFieldsValue({
          [attributeKey]: getEnumKey(value, DiceEnum),
        });
      }
      return prevState;
    });
    setShowModal(false);
  }

  function renderDiceButton(icon: any, index: number, value: DiceEnum) {
    const isAlreadySelected = !!attributes.find(
      (a) => a.attribute !== currentAttribute && a.diceIndex === index
    );

    let background = "green";
    if (isAlreadySelected) background = "red";
    if (isCurrentAttribute(index)) background = "gray";

    return (
      <Button
        className="circle-button"
        style={{ background }}
        shape="circle"
        type="text"
        disabled={isAlreadySelected && !isCurrentAttribute(index)}
        onClick={() => handleDiceSelection(index, value)}
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
        title={`Dado de ${currentAttribute}`}
        onCancel={() => setShowModal(false)}
      >
        <Row justify="space-evenly">
          {renderDiceButton(D4Icon, 0, DiceEnum.D4)}
          {renderDiceButton(D4Icon, 1, DiceEnum.D4)}
        </Row>
        <Row justify="space-evenly" style={{ paddingTop: "15px" }}>
          {renderDiceButton(D6Icon, 2, DiceEnum.D6)}
          {renderDiceButton(D8Icon, 3, DiceEnum.D8)}
        </Row>
      </Modal>
    );
  }

  function renderAttributeButton(
    background: ColorsEnum,
    attribute: AttributeEnum
  ) {
    // TODO: Improve gambi
    const selected = attributes.find((a) => a.attribute === attribute);
    const displayValue = () => {
      if (selected) {
        const { diceValue } = selected;
        let icon: any = "Selecionar";
        if (diceValue !== null) {
          if (diceValue === DiceEnum.D4) icon = D4Icon;
          if (diceValue === DiceEnum.D6) icon = D6Icon;
          if (diceValue === DiceEnum.D8) icon = D8Icon;
          return <img src={icon} alt="" className="circle-button-icon" />;
        }
        return icon;
      }
    };
    return (
      <Item name={getEnumKey(attribute, AttributeEnum, true)}>
        <Button
          style={{ background }}
          className="circle-button"
          shape="circle"
          type="text"
          onClick={() => {
            setCurrentAttribute(attribute);
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
        {renderAttributeButton(
          ColorsEnum.INTELLIGENCE,
          AttributeEnum.INTELLIGENCE
        )}
        {renderAttributeButton(ColorsEnum.CUNNING, AttributeEnum.CUNNING)}
      </Row>
      <Row justify="space-evenly" style={{ paddingTop: "32px" }}>
        {renderAttributeButton(ColorsEnum.TENACITY, AttributeEnum.TENACITY)}
        {renderAttributeButton(ColorsEnum.CELERITY, AttributeEnum.CELERITY)}
      </Row>
      {renderModal()}
    </div>
  );
}
