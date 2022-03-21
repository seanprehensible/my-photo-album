import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [me, setMe] = useState(null);

  useEffect(() => {
    if (me) {
      axios.defaults.headers.common.sessionid = me.sessionId;
    } else {
      delete axios.defaults.headers.common.sessionid;
    }
  }, [me]);

  return (
    <AuthContext.Provider value={[me, setMe]}>{children}</AuthContext.Provider>
  );
};
