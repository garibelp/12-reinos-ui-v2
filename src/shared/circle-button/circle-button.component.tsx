import { Button, Modal } from "antd";
import { useState } from "react";
import { ButtonColorsEnum } from "../../enum/button-colors.enum";

import "./circle-button-component.css";

interface CircleButtonProps {
  icon: string;
  value?: string | number;
  name: string;
  description?: string;
  backgroundColor: ButtonColorsEnum;
  textColor?: ButtonColorsEnum;
}

export function CircleButtonComponent(props: CircleButtonProps) {
  const [showDetails, setShowDetails] = useState(false);
  const { icon, value, name, backgroundColor, description } = props;
  const extraProps = { style: { background: backgroundColor } };

  const bodyStyle = description ? "" : " hide-modal-body";

  return (
    <>
      {value ? (
        <Button
          className="circle-button"
          shape="circle"
          type="text"
          icon={<img src={icon} alt="" className="circle-button-icon" />}
          onClick={() => setShowDetails(true)}
          {...extraProps}
        >
          {value}
        </Button>
      ) : (
        <Button
          className="circle-button"
          shape="circle"
          type="text"
          style={{ background: backgroundColor }}
          icon={<img src={icon} alt="" className="circle-button-icon" />}
          onClick={() => setShowDetails(true)}
        />
      )}
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
