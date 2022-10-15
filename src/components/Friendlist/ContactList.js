import React from "react";

import Contact from "./Contact";
import './ContactList.css'

const ContactList = (props) => 
{
    return (
        <div className="FriendList-container">
            <h1>Friends</h1> 
            <ul className="Friend-list-redirection">
                
            {props.contacts.map(c => < Contact  key = {c.name} user ={c} />)}
            </ul> 
        </div>
    );
};
export default ContactList;