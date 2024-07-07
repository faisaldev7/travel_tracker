import styles from "./Login.module.css";
import {useState, useEffect} from "react"
import PageNav from "../components/PageNav"
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom"

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login, isAuthenticate } = useAuth()
  const navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault()

    if (!email || !password) return

    login(email, password)
  }

  useEffect(
    function () {
      if (isAuthenticate) navigate("/app", { replace: true })
    },
    [isAuthenticate, navigate]
  )

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
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
          <button className="primary">Login</button>
        </div>
      </form>
    </main>
  );
}
