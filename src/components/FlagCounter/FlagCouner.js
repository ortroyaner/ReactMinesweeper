import React, { Fragment } from "react";

const FlagCouner = ({ remainingFlags }) => {
  return (
    <Fragment>
      <span className='mr-1'>{remainingFlags}</span>
      <i className='fa fa-flag mb-3' />
    </Fragment>
  );
};

export default FlagCouner;
