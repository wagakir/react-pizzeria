import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div>
      <h1>This page does not exist</h1>
      <br />
      <Link to="/">
        <h2>Go to home</h2>
      </Link>
    </div>
  );
};

export default NotFound;
