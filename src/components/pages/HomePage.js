import React from 'react';
import BLoggin from '../login/login.js';
import { useEffect, useState } from "react";
import Top from '../Top/Top.json';
import TopComponent from '../Top/TopComponent';
import ContactList from '../Friendlist/ContactList';
import person from '../users/users.json'
import './HomePage.css'

const Home = () => {
  const [isShown,setIsShown] = useState(false);
  const [authenticated, setauthenticated] = useState(null);
 const handleClick = event => {
// Toggle Shown state
setIsShown(current => !current);

 };

  useEffect(() => {
    const authenticated = localStorage.getItem("authenticated");
    const loggeduser = localStorage.getItem("user");
    console.log("User is " + authenticated);
  
    if (authenticated) {
      setauthenticated(authenticated);
    }
  }, []);
  if (authenticated == "true")
  {
    return (
        <div className='Top3'>
          <div className="box">
          <table className='center'>
            <tbody>
            <tr>
              <th>  </th>
              <th> </th>
              <th> Rank </th>
              <th> Name</th>
              <th> Games</th>
              <th> Victories</th>
              <th> Winrate</th>
              <th> Status</th>
          </tr>
          <tr>
          
              <td>  <img src={Top[0].ProfilePic} height="35"/> </td>
              <td>  <img src={Top[0].TrophyPic} height="35"/> </td>
                <td> {Top[0].Rank}</td>
                <td> {Top[0].name}</td>
                <td>{Top[0].TotalGames}</td>
                <td>{Top[0].Victories}</td>
                <td>{Top[0].winrate}</td>
              {Top[0].isActive ? (
                 <td><img src={Top[0].OnlineIcon} height="35"/> </td>
              ) : (
              <td><img src={Top[0].OfflineIcon} height="35"/> </td>
              )}

            </tr>
            <tr>
            <td>  <img src={Top[1].ProfilePic} height="35"/> </td>
              <td>  <img src={Top[1].TrophyPic} height="35"/> </td>
                <td> {Top[1].Rank}</td>
                <td> {Top[1].name}</td>
                <td>{Top[1].TotalGames}</td>
                <td>{Top[1].Victories}</td>
                <td>{Top[1].winrate}</td>
              {Top[1].isActive ? (
                 <td><img src={Top[1].OnlineIcon} height="35"/> </td>
              ) : (
              <td><img src={Top[1].OfflineIcon} height="35"/> </td>
              )}

            </tr>
            <tr>
            <td>  <img src={Top[2].ProfilePic} height="35"/> </td>
              <td>  <img src={Top[2].TrophyPic} height="35"/> </td>
              <td> {Top[2].Rank}</td>
               <td> {Top[2].name}</td>
                <td>{Top[2].TotalGames}</td>
                <td>{Top[2].Victories}</td>
                <td>{Top[2].winrate}</td>
              {Top[2].isActive ? (
                 <td> <img src={Top[2].OnlineIcon} height="35"/></td>
              ) : (
              <td><img src={Top[2].OfflineIcon} height="35"/> </td>
              )}

            </tr>
            </tbody>
            </table>
            </div>
                
            <div className='FriendList'>
            <div className="container">
  <div className="btn-holder">
              <button className='Friendbutton' onClick={handleClick}><img src="/images/Chaticon.png" height="35"/></button>
             {isShown && ( 
              //Show the friendlist only if button is pressed
              // Here : Send an array.map of the Friendlist of the user 
              // get request to backend , JSON object -> parse 
              <div className='Contact'>
                <ContactList contacts={person} />
              </div>
             )}
             </div>
             </div>
            </div>
        </div>
    );
  }
  else
  {
  return (
    <div className='HomePage'>
      <h1></h1>
      <BLoggin/>
    </div>
  );
};
}
  
export default Home;