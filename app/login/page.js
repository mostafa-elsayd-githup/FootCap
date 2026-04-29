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
import { loginAction } from "./action";
import { useActionState } from "react";

const LoginPage = () => {
  const [state, formAction, pending] = useActionState(loginAction, { message: "" , state:null});
  return (
    <div className={styles.mainWrapper}>
      {/* loader */}
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
              <FontAwesomeIcon
                icon={faUserCircle}
                className={styles.userIcon}
              />
            </div>
            <h2 className="text-center mb-4 fw-bold">تسجيل الدخول</h2>
            <p className="text-center text-muted mb-4">
              ادخل بياناتك للوصول إلى حسابك الرياضي
            </p>

            {/* هنا نربط الفورم بالأكشن مباشرة */}
            <form
              action={formAction}
              onClick={(e) => e.stopPropagation()}
              noValidate
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>البريد الإلكتروني</Form.Label>
                <InputGroup className={styles.inputGroupCustom}>
                  <InputGroup.Text className={styles.iconBg}>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </InputGroup.Text>
                  <Form.Control
                    name="email"
                    // type="email"
                    placeholder="example@mail.com"
                    required
                    className={styles.inputField}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>كلمة المرور</Form.Label>
                <InputGroup className={styles.inputGroupCustom}>
                  <InputGroup.Text className={styles.iconBg}>
                    <FontAwesomeIcon icon={faLock} />
                  </InputGroup.Text>
                  <Form.Control
                    name="password" // مهم جداً للـ Server Action
                    type="password"
                    placeholder="******"
                    required
                    className={styles.inputField}
                  />
                </InputGroup>
              </Form.Group>

              <Button
                variant="dark"
                type="submit"
                className={styles.loginButton}
              >
                تسجيل الدخول الآن
              </Button>
            </form>
            {state?.message && (
              <p className="text-danger text-center mt-3">{state.message}</p>
            )}
            <div className="text-center mt-4">
              <span className="text-muted">ليس لديك حساب؟ </span>
              <Link href="/register" className={styles.signUpLink}>
                أنشئ حساباً جديداً
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};
export default LoginPage;
