"use client";
import { Container, Form, Button, Card, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./register.module.css";
import Link from "next/link";
import { registerAction } from "../../../server/register_server";
import { useActionState } from "react";

const RegisterPage = () => {
  const [state, formAction, pending] = useActionState(registerAction, {
    message: "",
    state: null,
  });

  return (
    <div className={styles.mainWrapper}>

      {pending && (
        <div className={styles.overlay}>
          <div className={styles.halfCircleLoader}></div>
        </div>
      )}

      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <Card className={styles.loginCard}>
          <Card.Body className={styles.cardBody}>
  
            <div className={styles.iconWrapper}>
              <FontAwesomeIcon icon={faUserPlus} className={styles.userIcon} />
            </div>

            <h2 className="text-center mb-2 fw-bold text-muted">Create Account</h2>
            <p className="text-center text-muted small mb-4">Get started with your athletic account</p>

            <form action={formAction} onClick={(e) => e.stopPropagation()} noValidate>
      
              <Form.Group className="mb-3">
                <Form.Label className="text-white-50 small fw-semibold">Full Name</Form.Label>
                <InputGroup className={styles.inputGroupCustom}>
                  <InputGroup.Text className={styles.iconBg}>
                    <FontAwesomeIcon icon={faUser} />
                  </InputGroup.Text>
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="John Doe (letters only)"
                    required
                    className={styles.customControl}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-white-50 small fw-semibold">Email Address</Form.Label>
                <InputGroup className={styles.inputGroupCustom}>
                  <InputGroup.Text className={styles.iconBg}>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </InputGroup.Text>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    className={styles.customControl}
                  />
                </InputGroup>
                {state?.messageemail && (
                  <p className="text-danger small mt-1 JSON_error">{state.messageemail}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="text-white-50 small fw-semibold">Password</Form.Label>
                <InputGroup className={styles.inputGroupCustom}>
                  <InputGroup.Text className={styles.iconBg}>
                    <FontAwesomeIcon icon={faLock} />
                  </InputGroup.Text>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className={styles.customControl}
                  />
                </InputGroup>
              </Form.Group>
              <Button
                variant="dark"
                type="submit"
                className={styles.loginButton}
                disabled={pending}
              >
                {pending ? "Creating Account..." : "Sign Up Now"}
              </Button>

              {state?.message && (
                <p className="text-danger text-center small mt-3 fw-medium">{state.message}</p>
              )}
            </form>
            <div className="text-center mt-4">
              <span className="text-white-50 small">Already have an account? </span>
              <Link href="/login" className={styles.signUpLink}>
                Sign In
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default RegisterPage;