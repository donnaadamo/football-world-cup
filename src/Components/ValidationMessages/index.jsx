import React from "react";

const ValidationMessages = ({ errors }) => {
  return (
    <div className="validations">
      {errors.map((error) => (
        <p>{error}</p>
      ))}
    </div>
  );
};

export default ValidationMessages;
