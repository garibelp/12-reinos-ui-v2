import { Button, Card, Col, Form, Row, Space } from "antd";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

import { signIn } from "../../api/requests/auth";
import { HttpStatusEnum } from "../../enum/http-status.enum";
import { LogoComponent } from "../../shared/components/logo/logo.component";
import { messageError } from "../../shared/messages";
import { PasswordInputComponent } from "../../shared/components/password-input/password-input.component";
import { TransitionalInputComponent } from "../../shared/components/transactional-input/transitional-input.component";

import "./sign-in.component.css";

const { Item } = Form;

interface LoginInterface {
  username: string;
  password: string;
}

const SignInHeader = (): ReactNode => {
  return (
    <div>
      <Row>
        <Col span={24}>
          <LogoComponent className="sign-in-card-header-icon" />
        </Col>
        <Col span={24}>
          <small style={{ color: "#8190A5" }}>
            O sistema de RPG oficial do Sindicato do RPG.
          </small>
        </Col>
      </Row>
    </div>
  );
};

export function SignInComponent() {
  const [loading, isLoading] = useState(false);
  const navigate = useNavigate();

  function onFinish(values: LoginInterface) {
    const { username, password } = values;
    isLoading(true);
    signIn(username, password)
      .then((r) => {
        const { data } = r;
        localStorage.setItem("jwt", data.jwt);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: data.id,
            username: data.username,
            email: data.email,
            roles: data.roles,
          })
        );
        navigate("/home");
      })
      .catch((ex) => {
        const {
          response: { status },
        } = ex;
        if (status === HttpStatusEnum.UNAUTHORIZED) {
          messageError("Usuário ou senha inválidos!");
        }
      })
      .finally(() => isLoading(false));
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Card
        className="sign-in-card"
        title={SignInHeader()}
        actions={[
          <Space
            size="large"
            direction="vertical"
            style={{ alignItems: "center" }}
          >
            <Row>
              <Button
                className="sign-in-card-button"
                loading={loading}
                type="primary"
                htmlType="submit"
              >
                Login
              </Button>
            </Row>
            <Row>
              <div onClick={() => navigate("/signup")}>
                Não possui uma conta? Cadastre-se
              </div>
            </Row>
          </Space>,
        ]}
      >
        <Item
          name="username"
          rules={[
            {
              required: true,
              min: 5,
              message: "Usuário inválido!",
            },
          ]}
        >
          <TransitionalInputComponent placeholder="Usuário" />
        </Item>
        <PasswordInputComponent name="password" placeholder="Senha" />
      </Card>
      {/*<ThemeSwitcherComponent />*/}
    </Form>
  );
}
