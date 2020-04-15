import React from "react";

const HowToPlay = () => {
  return (
    <div className='continer text-center mb-3'>
      <h4 className='text-light'>How To Play</h4>
      <span className='text-light mr-2 d-none d-sm-inline'>
        Click to reveal a cell.
      </span>
      <span className='text-light mr-2 d-block d-sm-none'>
        Touch to reveal a cell.
      </span>
      <span className='text-light mr-2 d-none d-sm-inline'>
        Shift + Click to set a flag.
      </span>
      <span className='text-light mr-2 d-block d-sm-none'>
        Touch Longer to set a flag.
      </span>
      <span className='text-light'>Flag all mines for the win!</span>
    </div>
  );
};

export default HowToPlay;
