import { Button, Card, Col, Row } from "antd";
import { ReactElement } from "react";

import { LogoComponent } from "../logo/logo.component";
import { logout } from "../../../api/requests/auth";

import "./base-card.component.css";

function BaseHeader({
  rightButton,
  leftButton,
}: {
  rightButton?: ReactElement;
  leftButton?: ReactElement;
}) {
  return (
    <Row>
      <Col span={6} className="base-header-button">
        {leftButton}
      </Col>
      <Col span={12}>
        <LogoComponent className="base-card-logo" />
      </Col>
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
  className,
}: {
  rightButton?: ReactElement;
  leftButton?: ReactElement;
  cardBody?: ReactElement;
  className?: string;
}) {
  return (
    <div className={`base-wrapper ${className}`}>
      <Card
        className="base-card"
        title={<BaseHeader rightButton={rightButton} leftButton={leftButton} />}
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
