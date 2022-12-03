import { Button, Card, Col, Form, Row } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../api/requests/auth";
import { LogoComponent } from "../../shared/logo/logo.component";
import { messageError, messageSuccess } from "../../shared/messages";
import { PasswordInputComponent } from "../../shared/password-input/password-input.component";
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
              max: 20,
              message: "Tamanho deve ser entre 5 e 20 caracteres",
            },
          ]}
        >
          <TransitionalInputComponent placeholder="Usuário" />
        </Item>
        <PasswordInputComponent name="password" placeholder="Senha" />
        <PasswordInputComponent
          name="confirm"
          placeholder="Confirmar senha"
          dependencies={["password"]}
          extraRules={[
            ({ getFieldValue }: any) => ({
              validator(_: any, value: any) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Senhas devem ser iguais"));
              },
            }),
          ]}
        />
        <Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Formato de email inválido",
            },
          ]}
        >
          <TransitionalInputComponent placeholder="Email" />
        </Item>
        <Item
          name="firstName"
          rules={[
            {
              min: 3,
              max: 20,
              message: "Tamanho deve ser entre 3 e 20 caracteres",
            },
          ]}
        >
          <TransitionalInputComponent placeholder="Nome" />
        </Item>
        <Item
          name="lastName"
          rules={[
            {
              min: 3,
              max: 30,
              message: "Tamanho deve ser entre 3 e 30 caracteres",
            },
          ]}
        >
          <TransitionalInputComponent placeholder="Sobrenome" />
        </Item>
      </Card>
    </Form>
  );
}
