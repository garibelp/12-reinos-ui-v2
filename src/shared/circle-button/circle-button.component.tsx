import { Button, Modal } from "antd";
import { useState } from "react";
import { ColorsEnum } from "../../enum/colors.enum";
import { TextWithBreaklineComponent } from "../text-with-breakline/text-with-breakline.component";

import "./circle-button-component.css";

interface CircleButtonProps {
  icon: string;
  value?: string | number;
  name: string;
  description?: string;
  backgroundColor: ColorsEnum;
  textColor?: ColorsEnum;
  size?: "normal" | "small";
}

const defaultProps = {
  size: "normal",
};

export function CircleButtonComponent(props: CircleButtonProps) {
  const [showDetails, setShowDetails] = useState(false);
  const { icon, value, name, backgroundColor, description, size } = props;
  const extraProps = { style: { background: backgroundColor } };

  const bodyStyle = description ? "" : " hide-modal-body";

  return (
    <>
      {value ? (
        <Button
          className={`button-size-${size}`}
          shape="circle"
          type="text"
          icon={
            <img src={icon} alt="" className={`circle-button-icon-${size}`} />
          }
          onClick={() => setShowDetails(true)}
          {...extraProps}
        >
          {value}
        </Button>
      ) : (
        <Button
          className={`button-size-${size}`}
          shape="circle"
          type="text"
          style={{ background: backgroundColor }}
          icon={
            <img src={icon} alt="" className={`circle-button-icon-${size}`} />
          }
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
        {/*@ts-ignore*/}
        <TextWithBreaklineComponent text={description} />
      </Modal>
    </>
  );
}

CircleButtonComponent.defaultProps = defaultProps;
