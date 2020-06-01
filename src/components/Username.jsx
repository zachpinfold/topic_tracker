import React from "react";

const Username = ({username, avatar}) => {
  return (
    <div className={"username-div"}>
      <img className={"username-image"} src={avatar} alt={username}></img>
         <p className={'username-copy'}>hello {username}</p>
    </div>
  );
};

export default Username;
