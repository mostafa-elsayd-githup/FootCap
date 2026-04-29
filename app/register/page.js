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
import { registerAction } from "./action";
import { useActionState } from "react";


const RegisterPage = () => {
  const [state, formAction, pending] = useActionState(registerAction, {
    message: "",
    state: null,
  });
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
              <FontAwesomeIcon icon={faUserPlus} className={styles.userIcon} />
            </div>
            <h2 className="text-center mb-4 fw-bold">إنشاء حساب جديد</h2>

            <form action={formAction} onClick={(e) => e.stopPropagation()} noValidate>
              <Form.Group className="mb-3">
                {/* name */}
                <Form.Label>الاسم بالكامل</Form.Label>
                <InputGroup className={styles.inputGroupCustom}>
                  <InputGroup.Text className={styles.iconBg}>
                    <FontAwesomeIcon icon={faUser} />
                  </InputGroup.Text>
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="اسمك الثلاثي"
                    required
                  />
                </InputGroup>
              </Form.Group>
              {/* mail */}
              <Form.Group className="mb-3">
                <Form.Label>البريد الإلكتروني</Form.Label>
                <InputGroup className={styles.inputGroupCustom}>
                  <InputGroup.Text className={styles.iconBg}>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </InputGroup.Text>
                  {state?.messageemail&&(
                    <p>{state.messageemail}</p>
                  )}
                  <Form.Control
                    name="email"
                    // type="email"
                    placeholder="example@mail.com"
                    required
                  />
                </InputGroup>
              </Form.Group>

              {/* password*/}
              <Form.Group className="mb-4">
                <Form.Label>كلمة المرور</Form.Label>
                <InputGroup className={styles.inputGroupCustom}>
                  <InputGroup.Text className={styles.iconBg}>
                    <FontAwesomeIcon icon={faLock} />
                  </InputGroup.Text>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="أدخل كلمة مرور قوية"
                    required
                  />
                </InputGroup>
              </Form.Group>

              <Button
                variant="dark"
                type="submit"
                className={styles.loginButton}
              >
                اشترك الآن
              </Button>
              {state?.message && (
                <p className="text-danger text-center mt-3">{state.message}</p>
              )}
            </form>

            <div className="text-center mt-4">
              <span className="text-muted">لديك حساب بالفعل؟ </span>
              <Link href="/login" className={styles.signUpLink}>
                تسجيل الدخول
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default RegisterPage;
