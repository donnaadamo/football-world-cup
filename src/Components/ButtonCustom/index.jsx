import React from "react";

const Button = ({
  description,
  src,
  className,
  imgClassname,
  handleClick,
  testId,
}) => {
  return (
    <button className={className} onClick={handleClick} data-testid={testId}>
      {description} <i src={src} alt="" className={imgClassname} />
    </button>
  );
};

export default Button;
