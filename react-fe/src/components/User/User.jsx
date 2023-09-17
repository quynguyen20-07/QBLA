import React from "react";

import { users } from "../../common/helpers/user-data";
import "./User.css";

const User = () => {
  return (
    <div className="user-grid">
      {users?.map((user) => {
        return (
          <div className="user-item">
            <img src={user.image} className="img-card" alt="#" />
            <div className="info-card">
              <div className="content">
                <p className="title">Name: </p>
                <p className="value"> {user.name}</p>
              </div>
              <div className="content">
                <p className="title">Age: </p>
                <p className="value"> {user.age}</p>
              </div>
              <div className="content">
                <p className="title">Address </p>
                <p className="value"> {user.address}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default User;
