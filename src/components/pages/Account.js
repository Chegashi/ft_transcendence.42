import React from 'react';
import { useEffect, useState } from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import person from "../users/users.json"
  
const Account = () => {
  const navigate = useNavigate();
  const [authenticated, setauthenticated] = useState(null);
  const [loggeduser, setuser] = useState(null);

  useEffect(() => {
    const authenticated = localStorage.getItem("authenticated");
    const loggeduser = localStorage.getItem("user");
    console.log("User is " + authenticated);
  
    if (authenticated) {
      setauthenticated(authenticated);
    }
  }, []);
  if(person[0].isActive == false)
  {console.log("You are not logged in ! " + authenticated)
navigate("/Pong")}
else
  {
    if (authenticated === "false")
    {
      return (<div>
          <p>
            Not logged in 
          </p>
      </div>);
    }
    else
    {
    return (
      <div>
        <p>Welcome to your Dashboard ! </p>
        {person[0].name}
       <img src={person[0].ProfilePic} height="35"/>
    
        
      </div>
    );
    }
  }
};
  
export default Account;
