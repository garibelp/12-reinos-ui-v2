import { Button, Modal } from "antd";
import { useState } from "react";
import { ButtonColorsEnum } from "../../enum/button-colors.enum";

import "./circle-button-component.css";

interface CircleButtonProps {
  icon: string;
  value: string | number;
  name: string;
  description?: string;
  backgroundColor: ButtonColorsEnum;
  textColor?: ButtonColorsEnum;
}

export function CircleButtonComponent(props: CircleButtonProps) {
  const [showDetails, setShowDetails] = useState(false);
  const { icon, value, name, backgroundColor, description } = props;

  const bodyStyle = description ? "" : " hide-modal-body";

  return (
    <>
      <Button
        className="circle-button"
        shape="circle"
        type="text"
        style={{ background: backgroundColor }}
        icon={<img src={icon} alt="" className="circle-button-icon" />}
        onClick={() => setShowDetails(true)}
      >
        {value}
      </Button>
      <Modal
        title={name}
        open={showDetails}
        className={"details-modal" + bodyStyle}
        onCancel={() => setShowDetails(false)}
        footer={null}
      >
        {description}
      </Modal>
    </>
  );
}
