import React from 'react';
import './login.css'
import {Routes, Route, useNavigate} from 'react-router-dom';
import Account from '../pages/Account';
import { useState } from "react";
const Login = () => {
    const navigate = useNavigate();
    const navigateAccount = () => {
        // 👇️ navigate to /contacts
        navigate('/Account');
      };
  const [username, setusername] = useState("");
  const [user, setuser] = useState(localStorage.getItem(localStorage.getItem("user")|| null))
  const [password, setpassword] = useState("");
  const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
  const users = [{ username: "Jane", password: "testpassword" }];
  const handleSubmit = (e) => {
    e.preventDefault()
    const account = users.find((user) => user.username === "Jane");
    if (account && account.password === "testpassword") {
        setauthenticated(true)
        setuser(account);
        localStorage.setItem("user",account);
        localStorage.setItem("authenticated", true);
        console.log("LOGGIN IN ...." + account.username + "   " + account.password);
        navigate("/Account");

    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input type="submit" value="Login 42" />
      </form>
    </div>
  )
};

export default Login;