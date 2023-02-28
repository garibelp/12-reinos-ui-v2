import { Button, Card, Col, Row } from "antd";
import { ReactElement } from "react";

import { LogoComponent } from "../logo/logo.component";
import { logout } from "../../../api/requests/auth";

import "./base-card.component.css";

function BaseHeader({
  rightButton,
  leftButton,
  centerIcon,
}: {
  rightButton?: ReactElement;
  leftButton?: ReactElement;
  centerIcon?: ReactElement;
}) {
  const center = centerIcon || <LogoComponent className="base-card-logo" />;
  return (
    <Row>
      <Col span={6} className="base-header-button">
        {leftButton}
      </Col>
      <Col span={12}>{center}</Col>
      <Col span={6} className="base-header-button">
        {rightButton}
      </Col>
    </Row>
  );
}

export function BaseCardComponent({
  rightButton,
  leftButton,
  cardBody,
  centerIcon,
  className,
}: {
  rightButton?: ReactElement;
  leftButton?: ReactElement;
  cardBody?: ReactElement;
  centerIcon?: ReactElement;
  className?: string;
}) {
  return (
    <div className={`base-wrapper ${className}`}>
      <Card
        className="base-card"
        title={
          <BaseHeader
            rightButton={rightButton}
            leftButton={leftButton}
            centerIcon={centerIcon}
          />
        }
        actions={[
          <Button type="primary" danger onClick={logout}>
            Logout
          </Button>,
        ]}
      >
        {cardBody}
      </Card>
    </div>
  );
}
