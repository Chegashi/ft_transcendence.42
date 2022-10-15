import React from 'react';
import person from '../users/users.json'
import { Link, useParams } from 'react-router-dom';

const Friendprofile = () => {
  const params = useParams();


  const user = person.find((x) => x._id === params.id);
 console.log("B4" + user.name + user.ProfilePic);
  if (!user) {
      // TODO: 404
      console.log("ERROR ·404 " + params.id  + params.name);
  }
  else
  {
  return (
    
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <img src={user.ProfilePic} height="80"/>
  <h1>{user.name}</h1>
  <p className="title">
    TotalGames: 
    <h1>{user.TotalGames}</h1>
    Winrate
    <h1>{user.winrate}</h1>
    Victories
    <h1>{user.Victories}</h1>

  </p>
  <a href="#"><i className="fa fa-dribbble"></i></a>
  
  <a href="#"><i className="fa fa-twitter"></i></a>
  <a href="#"><i className="fa fa-linkedin"></i></a>
  <a href="#"><i className="fa fa-facebook"></i></a>
  <p><button>Remove Friend (TODO)</button></p>
    </div>
  );
  }
};
  
export default Friendprofile;