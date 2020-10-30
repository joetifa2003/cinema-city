import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TextBox from "../../components/UI/TextBox";
import { ls } from "../../utility/LocalStorage";

const Auth = () => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    console.log(process.env.REACT_APP_PASSWORD);
    if (
      username === process.env.REACT_APP_USERNAME &&
      password === process.env.REACT_APP_PASSWORD
    ) {
      ls.set("isLoggedIn", true);
      history.push("/admin");
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full " dir="ltr">
      <div className="w-full c-gap-wrapper">
        <div className="container flex flex-col p-5 text-black bg-white border-4 border-black c-gap c-gap-5">
          <TextBox
            label="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextBox
            label="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div>
            <button onClick={login} className="btn-primary">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
