import Button from "../compoents/Button";
import PageNav from "../compoents/PageNav";
import { useAuth } from "../context/FakeAuthContext";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
export default function Login() {
  const navigate = useNavigate();
  const { login, isAuther } = useAuth();
  // console.log(login);
  // PRE-FILL FOR DEV PURPOSESs
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  function handlelogin(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }
  //通过身份验证后自动跳转
  useEffect(
    function () {
      if (isAuther) navigate("/app", { replace: true });
    },
    [isAuther, navigate]
  );
  return (
    <main className={styles.login}>
      <PageNav></PageNav>
      <form className={styles.form} onSubmit={handlelogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">login</Button>
        </div>
      </form>
    </main>
  );
}
