import axios from "axios";
import { toast } from "material-react-toastify";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [, setMe] = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      if (username.length < 3 || password.length < 8) {
        throw new Error("입력하신 정보가 올바르지 않습니다.");
      }
      const result = await axios.patch("/users/login", { username, password });
      setMe({
        name: result.data.name,
        userId: result.data.userId,
        sessionId: result.data.sessionId,
      });
      navigate("/");
      toast.success("로그인 완료!");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div
      style={{
        maxWidth: "50%",
        margin: "0 auto",
      }}
    >
      <h3>로그인</h3>
      <form onSubmit={loginHandler}>
        <div style={{ marginBottom: 10 }}>
          <label htmlFor="username" style={{ display: "block" }}>
            아이디
          </label>
          <input
            id="username"
            value={username}
            onChange={onChangeUsername}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label htmlFor="password" style={{ display: "block" }}>
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={onChangePassword}
            style={{ width: "100%" }}
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;
