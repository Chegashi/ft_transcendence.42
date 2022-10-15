import React from "react";
import {Link} from'react-router-dom';

import './Contact.css'

const Contact = (props,ProfilePic) => {
    console.log(props.name);
return (
<div className="Contact-HELP"> 
    <table className="Contact-table">
        <tbody>
    <tr>
       <th></th>
       <th>Name</th>
       <th>Status </th>
   </tr>
   <tr>
   <td> <img src={props.user.ProfilePic} height="20"/></td>
   <td> <Link to={`/users/${props.user._id}`} >{props.user.name}</Link></td> 
  {props.user.isActive ? (
                 <td> <img src={props.user.OnlineIcon} height="35"/></td>
              ) : (
              <td><img src={props.user.OfflineIcon} height="35"/> </td>
              )}

</tr>
        </tbody>
    </table>
  
    </div>
);
};

export default Contact;