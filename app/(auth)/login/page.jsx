"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button, Card, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./login.module.css";
import Link from "next/link";
import { loginAction } from "@/server/login_server";
import { useActionState } from "react";
import Loader from "@/Components/loaderFecthing/loader";

const LoginPage = () => {
  const [state, formAction, pending] = useActionState(loginAction, {
    message: "",
    state: null,
  });
  return (
    <div className={styles.mainWrapper}>
      {pending && <Loader />}
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <Card className={styles.loginCard}>
          <Card.Body className={styles.cardBody}>
            <div className={styles.iconWrapper}>
              <FontAwesomeIcon
                icon={faUserCircle}
                className={styles.userIcon}
              />
            </div>
            <h2 className="text-center mb-4 text-white-50 fw-bold">Sign In</h2>
            <p className="text-center text-white-50 mb-4">
              Enter your details to access your athletic account
            </p>

            <form
              action={formAction}
              onClick={(e) => e.stopPropagation()}
              noValidate
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{ color: "#ffffff80" }}>
                  Email Address
                </Form.Label>
                <InputGroup className={styles.inputGroupCustom}>
                  <InputGroup.Text className={styles.iconBg}>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </InputGroup.Text>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    className={styles.inputField}
                  />
                </InputGroup>
                {state?.message?.email && (
                  <p className="text-danger small mt-1 JSON_error">
                    {state.message.email[0]}
                  </p>
                )}
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label style={{ color: "#ffffff80" }}>Password</Form.Label>
                <InputGroup className={styles.inputGroupCustom}>
                  <InputGroup.Text className={styles.iconBg}>
                    <FontAwesomeIcon icon={faLock} />
                  </InputGroup.Text>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className={styles.inputField}
                  />
                </InputGroup>
                {state?.message?.password && (
                  <p className="text-danger small mt-1 JSON_error">
                    {state.message.password[0]}
                  </p>
                )}
              </Form.Group>

              <Button
                variant="dark"
                type="submit"
                className={styles.loginButton}
              >
                Sign In Now
              </Button>
            </form>
            <div className="text-center mt-4">
              <span className="text-muted">Don&apos;t have an account? </span>
              <Link href="/register" className={styles.signUpLink}>
                Create New Account
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default LoginPage;
