import React from "react";
import { Link } from "react-router-dom";

const ToolBar = () => {
  return (
    <div style={{ padding: 10 }}>
      <Link to="/">
        <span>홈</span>
      </Link>
      <Link to="/auth/register">
        <span style={{ float: "right" }}>회원가입</span>
      </Link>
      <Link to="/auth/login">
        <span style={{ float: "right", marginRight: 15 }}>로그인</span>
      </Link>
    </div>
  );
};

export default ToolBar;
