import React, { Fragment } from "react";
import PropTypes from "prop-types";

const FlagCouner = ({ remainingFlags }) => {
  return (
    <Fragment>
      <div className='bs-component'>
        <div className='alert'>
          <h3 className='mr-1'>
            <strong>{remainingFlags}</strong>
            <i className='fa fa-flag ml-1' />
          </h3>
        </div>
      </div>
    </Fragment>
  );
};

FlagCouner.prototype = {
  remainingFlags: PropTypes.number,
};

export default FlagCouner;
