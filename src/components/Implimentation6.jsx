import React, {useState} from 'react';
// import Toggle  from './Toggle';
import { useDeviceOrientation } from './useDeviceOrientation';

function Implimentation6 (){
  const { orientation, requestAccess, revokeAccess, error } = useDeviceOrientation();

  const [toggle, setToggle] = useState(false)

  const onToggle = ()=> {
    console.log('logging')
    setToggle(!toggle)
    const result = toggle ? requestAccess() : revokeAccess();
  };

  const orientationInfo = orientation && (
    <ul>
      <li>ɑ: <code>{orientation.alpha}</code></li>
      <li>β: <code>{orientation.beta}</code></li>
      <li>γ: <code>{orientation.gamma}</code></li>
    </ul>
  );

  const errorElement = error ? (
    <div className="error">{error.message}</div>
  ) : null;

  return (
    <div>
      {/* <Toggle onToggle={onToggle} /> */}
      <button onClick={onToggle}>Toggle</button>
      {orientationInfo}
      {errorElement}
    </div>
  );
};

export default Implimentation6;