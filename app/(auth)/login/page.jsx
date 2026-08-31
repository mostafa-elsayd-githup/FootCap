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
import { useState } from "react";
import Loader from "@/Components/loaderFecthing/loader";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import loginAction from "@/server/login_server";
// import { syncGuestDataToSupabase } from "@/server/sync_user_data";
import { setInitialWishlist } from "@/RTK/wishlistslice";
import { setInitialCart } from "@/RTK/cardslice";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);

    try {
      const loginRes = await loginAction(null, formData);
      if (loginRes && !loginRes.success) {
        setErrorMessage(loginRes.message);
        setPending(false);
        return;
      }

      const localWishlist =
        JSON.parse(localStorage.getItem("guest_wishlist")) || [];
      const localCart = JSON.parse(localStorage.getItem("guest_cart")) || [];

      if (localWishlist.length > 0 || localCart.length > 0) {
        const syncRes = await syncGuestDataToSupabase({
          localWishlist,
          localCart,
        });
        if (syncRes?.success) {
          localStorage.removeItem("guest_wishlist");
          localStorage.removeItem("guest_cart");
          if (syncRes.updatedWishlist)
            dispatch(setInitialWishlist(syncRes.updatedWishlist));
          if (syncRes.updatedCart)
            dispatch(setInitialCart(syncRes.updatedCart));
        }
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Login Submission Error:", error);
      setErrorMessage("Something woring Please try again later");
      setPending(false);
    }
  };

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

            <Form onSubmit={handleLoginSubmit} noValidate>
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
                {errorMessage?.email && (
                  <p className="text-danger small mt-1 JSON_error">
                    {Array.isArray(errorMessage.email)
                      ? errorMessage.email[0]
                      : errorMessage.email}
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
                {errorMessage?.password && (
                  <p className="text-danger small mt-1 JSON_error">
                    {Array.isArray(errorMessage.password)
                      ? errorMessage.password[0]
                      : errorMessage.password}
                  </p>
                )}
                {typeof errorMessage === "string" && (
                  <p className="text-danger small mt-1 JSON_error">
                    {errorMessage}
                  </p>
                )}
              </Form.Group>

              <Button
                variant="dark"
                type="submit"
                disabled={pending}
                className={styles.loginButton}
              >
                {pending ? "Signing In..." : "Sign In Now"}
              </Button>
            </Form>

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
