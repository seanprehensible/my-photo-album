import axios from "axios";
import { toast } from "material-react-toastify";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ToolBar = () => {
  const [me, setMe] = useContext(AuthContext);

  const logoutHandler = async () => {
    try {
      await axios.patch("/users/logout");
      setMe();
      toast.success("로그아웃 완료!");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div style={{ padding: 10 }}>
      <Link to="/">
        <span>홈</span>
      </Link>
      {!me ? (
        <>
          <Link to="/auth/register">
            <span style={{ float: "right" }}>회원가입</span>
          </Link>
          <Link to="/auth/login">
            <span style={{ float: "right", marginRight: 15 }}>로그인</span>
          </Link>
        </>
      ) : (
        <>
          <span
            style={{ float: "right", cursor: "pointer" }}
            onClick={logoutHandler}
          >
            로그아웃
          </span>
          <span style={{ float: "right", marginRight: 15, fontWeight: "bold" }}>
            {me.name}
          </span>
        </>
      )}
    </div>
  );
};

export default ToolBar;
