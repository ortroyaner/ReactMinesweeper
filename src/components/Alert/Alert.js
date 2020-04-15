import React from "react";

const Alert = ({ alert }) => {
  return (
    alert !== null && (
      <div className='bs-component'>
        <div className={`alert alert-${alert.type}`}>
          <strong>{alert.header}</strong> {alert.msg}
        </div>
      </div>
    )
  );
};

export default Alert;
