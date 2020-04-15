import React from "react";
import PropTypes from "prop-types";

const Alert = ({ alert }) => {
  return (
    alert !== null && (
      <div className='bs-component'>
        <div className={`alert alert-${alert.type}`}>
          <strong>{alert.header}</strong> {alert.content}
        </div>
      </div>
    )
  );
};

Alert.propTypes = {
  alert: PropTypes.object,
};

export default Alert;
