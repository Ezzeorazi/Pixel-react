import React from "react";
import { NavLink } from "react-router-dom";

const Error404 = () => {
  return (
    <div>
      <h2 className="m-5 text-white">Error 404...</h2>
      <NavLink
        className="btn btn-primary tracking-in-contract-bck-bottom mb-4"
        to="/"
      >
        Go back...
      </NavLink>
    </div>
  );
};

export default Error404;
