import { Col, Modal, Row } from "antd";
import { useEffect, useState } from "react";

import { retrieveExpire, retrieveUser } from "../../../../utils/auth-utils";
import packageInfo from "../../../../../package.json";

import "./settings.componen.css";

interface Props {
  hidden: boolean;
  callback: () => void;
}

export function SettingsComponent(props: Props) {
  const [expire, setExpire] = useState<string>("");
  const { hidden, callback } = props;
  const user = retrieveUser();
  useEffect(() => {
    const interval = setInterval(() => {
      const duration = retrieveExpire();
      const seconds = Math.floor((duration / 1000) % 60);
      const minutes = Math.floor((duration / (1000 * 60)) % 60);
      const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
      setExpire(
        `${hours < 10 ? "0" + hours : hours}:${
          minutes < 10 ? "0" + minutes : minutes
        }:${seconds < 10 ? "0" + seconds : seconds}`
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [expire]);
  return (
    <Modal
      open={!hidden}
      closeIcon={null}
      onCancel={callback}
      className="settings-modal"
      footer={null}
    >
      {user && (
        <>
          <Row>
            <Col span={12}>
              <b>Logon:</b>
            </Col>
            <Col span={12}>{user.username}</Col>
          </Row>
          <Row>
            <Col span={12}>
              <b>Email:</b>
            </Col>
            <Col span={12}>{user.email}</Col>
          </Row>
          <Row>
            <Col span={12}>
              <b>Expires:</b>
            </Col>
            <Col span={12}>{expire}</Col>
          </Row>
          <Row>
            <Col span={12}>
              <b>Versão:</b>
            </Col>
            <Col span={12}>{packageInfo.version}</Col>
          </Row>
        </>
      )}
    </Modal>
  );
}
