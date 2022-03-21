import { toast } from "material-react-toastify";
import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [, setMe] = useContext(AuthContext);
  const navigate = useNavigate();

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
  };

  const onSubmitForm = async (e) => {
    try {
      e.preventDefault();
      if (username.length < 3) {
        throw new Error("아이디는 3자 이상이어야 합니다.");
      }
      if (password.length < 8) {
        throw new Error("비밀번호는 8자 이상이어야 합니다.");
      }
      if (password !== passwordCheck) {
        throw new Error("비밀번호가 다릅니다.");
      }
      const result = await axios.post("/users/register", {
        name,
        username,
        password,
      });
      setMe({
        userId: result.data.userId,
        sessionId: result.data.sessionId,
        name: result.data.name,
      });
      navigate("/");
      toast.success("회원가입 완료!");
    } catch (err) {
      console.error(err.response);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div
      style={{
        maxWidth: "50%",
        margin: "0 auto",
      }}
    >
      <h3>회원가입</h3>
      <form onSubmit={onSubmitForm}>
        <div style={{ marginBottom: 10 }}>
          <label htmlFor="name" style={{ display: "block" }}>
            이름
          </label>
          <input
            id="name"
            value={name}
            onChange={onChangeName}
            style={{ width: "100%" }}
          />
        </div>
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
        <div style={{ marginBottom: 10 }}>
          <label htmlFor="password-check" style={{ display: "block" }}>
            비밀번호 확인
          </label>
          <input
            id="password-check"
            type="password"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            style={{ width: "100%" }}
          />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default RegisterPage;
