import { Button, Card, Col, Form, Row } from "antd";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

import { signIn } from "../../api/requests/auth";
import { HttpStatusEnum } from "../../enum/http-status.enum";
import { LogoComponent } from "../../shared/logo/logo.component";
import { messageError } from "../../shared/messages";
import { ThemeSwitcherComponent } from "../../shared/theme-switcher/theme-switcher.component";
import { TransitionalInputComponent } from "../../shared/transactional-input/transitional-input.component";

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
          <b style={{ color: "#47525E" }}>12 Reinos</b>
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
  // TODO: Examples of redux usage
  // const player = useAppSelector((state: RootState) => state.player);
  // const dispatch = useAppDispatch();
  // dispatch(setPlayer(data));

  function onFinish(values: LoginInterface) {
    console.log(values);
    const { username, password } = values;
    isLoading(true);
    signIn(username, password)
      .then((r) => {
        const { data } = r;
        console.log(data);
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
          <Item>
            <Button
              className="sign-in-card-button"
              loading={loading}
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
          </Item>,
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
        <Item
          name="password"
          rules={[
            {
              required: true,
              pattern: new RegExp(
                "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
              ),
              message: "Senha inválida!",
            },
          ]}
        >
          <TransitionalInputComponent placeholder="Senha" type="password" />
        </Item>
      </Card>
      <ThemeSwitcherComponent />
    </Form>
  );
}
