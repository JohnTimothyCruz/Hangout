import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(history.push("/groups"))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  const signInDemoUser = () => {
    return dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' }))
      .then(history.push("/groups"))
      .then(closeModal)
  }

  return (
    <div className="log-in">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className='form'>
        <ul>
          {errors.map((error, idx) => (
            <li className='error' key={idx}>{error}</li>
          ))}
        </ul>
        <div className="inputs">
          <div className="input">
            <label>
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
                placeholder='Username or Email'
              />
            </label>
          </div>
          <div className="input">
            <label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='Password'
              />
            </label>
          </div>
        </div>
        <button type="submit" className="login" disabled={password.length < 6 || credential.length < 4}>Log In</button>
      </form>
      <button className="demo-user" onClick={signInDemoUser}>Demo User</button>
    </div>
  );
}

export default LoginFormModal;
