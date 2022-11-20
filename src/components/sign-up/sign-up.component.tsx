import { Button, Card, Col, Form, Row } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../api/requests/auth";
import { LogoComponent } from "../../shared/logo/logo.component";
import { messageError, messageSuccess } from "../../shared/messages";
import { TransitionalInputComponent } from "../../shared/transactional-input/transitional-input.component";

import "./sign-up.component.css";

const { Item, useForm } = Form;

interface SignUpPayload {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export function SignUpComponent() {
  const [loading, isLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = useForm();

  function onFinish(values: SignUpPayload) {
    const { username, password, email, firstName, lastName } = values;
    isLoading(true);
    signUp(username, password, email, firstName, lastName)
      .then((r) => {
        messageSuccess("Usuário cadastrado com sucesso!");
        navigate("/signin");
      })
      .catch((ex) => {
        console.error(ex);
        messageError("Ocorreu uma falha durante cadastro de conta");
      })
      .finally(() => isLoading(false));
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  function SignUpHeader() {
    return (
      <div>
        <Row>
          <Col span={24}>
            <LogoComponent className="sign-up-card-header-icon" />
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
  }

  return (
    <Form onFinish={onFinish} form={form} onFinishFailed={onFinishFailed}>
      <Card
        className="sign-in-card"
        title={<SignUpHeader />}
        actions={[
          <Item>
            <Button
              className="sign-up-card-button"
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
        <Item
          name="confirm"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              pattern: new RegExp(
                "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
              ),
              message: "Senha inválida!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Senhas devem ser iguais!"));
              },
            }),
          ]}
        >
          <TransitionalInputComponent
            placeholder="Confirmar senha"
            type="password"
          />
        </Item>
        <Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Email inválido!",
            },
          ]}
        >
          <TransitionalInputComponent placeholder="Email" />
        </Item>
        <Item
          name="firstName"
          rules={[
            {
              required: true,
              min: 3,
              max: 20,
              message: "Nome inválido (min = 3, max = 20)!",
            },
          ]}
        >
          <TransitionalInputComponent placeholder="Nome" />
        </Item>
        <Item
          name="lastName"
          rules={[
            {
              required: true,
              min: 3,
              max: 30,
              message: "Nome inválido (min = 3, max = 30)!",
            },
          ]}
        >
          <TransitionalInputComponent placeholder="Sobrenome" />
        </Item>
      </Card>
    </Form>
  );
}
