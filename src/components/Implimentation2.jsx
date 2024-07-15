import React from 'react'
import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  // CardHeader,
  // CardTitle,
} from "@/components/ui/card"
// import orientation from '../hooks/orientation.js'
import { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import throttle from 'lodash.throttle';

function Implimentation2() {
	const { orientation, requestAccess, revokeAccess, error } = useDeviceOrientation();
	return (
		<div>
			<Card>
				<CardContent>
					<div className="box">
				      <button className='button rounded-md p-4' onClick={requestAccess}>Request For Gyro Access</button>
				      {error && <div className="error">{error.message}</div>}
				      <Demo orientation={orientation} />
				    </div>
				</CardContent>
			</Card>						
		</div>
	)
}

export default Implimentation2

const getTransformDegree = (value, threshold = 30, max = 74.9) => {
  if (value) {
    const sy = value > 0 ? '' : '-';
    const degree = `${Math.min((Math.abs(value) / threshold) * 100, max)}`;
    return Number(`${sy}${degree}`);
  }
  return 0;
};

const Demo = ({ orientation }) => {
  const degree = getTransformDegree(orientation?.gamma);
  const yDegree = getTransformDegree(orientation?.beta, 20, 40);
  const transform = `translate(${degree}%, ${yDegree}%)`;
  const maskPosition = `${25.565617 + (degree / 100) * 34.133}vw calc(${25.565617 + (yDegree / 100) * 34.133}vw - 18.4vw)`;

  return (
    <div className="bg">
      <div className="hiddenText" style={{ maskPosition, WebkitMaskPosition: maskPosition }}>
        <div>Gamma: {orientation?.gamma}</div>
        <div>Beta: {orientation?.beta}</div>
        <div>Alpha: {orientation?.alpha}</div>
        <div>Degree : {degree}</div>
        {/* <div>mask position: {maskPosition}</div> */}
      </div>
      <div className="lens" style={{ transform }} />
    </div>
  );
};

const useDeviceOrientation = () => {
  const [error, setError] = useState(null);
  const [orientation, setOrientation] = useState(null);

  const onDeviceOrientation = throttle((event) => {
    setOrientation({
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma,
    });
  }, 100);

  const revokeAccessAsync = async () => {
    window.removeEventListener('deviceorientation', onDeviceOrientation);
    setOrientation(null);
  };

  const requestAccessAsync = async () => {
    if (!DeviceOrientationEvent) {
      setError(new Error('Device orientation event is not supported by your browser'));
      return false;
    }
    if (DeviceOrientationEvent.requestPermission && typeof DeviceMotionEvent.requestPermission === 'function') {
      let permission;
      try {
        permission = await DeviceOrientationEvent.requestPermission();
      } catch (err) {
        setError(err);
        return false;
      }
      if (permission !== 'granted') {
        setError(new Error('Request to access the device orientation was rejected'));
        return false;
      }
    }
    window.addEventListener('deviceorientation', onDeviceOrientation);
    return true;
  };

  const requestAccess = useCallback(requestAccessAsync, []);
  const revokeAccess = useCallback(revokeAccessAsync, []);

  useEffect(() => {
    return () => {
      revokeAccess();
    };
  }, [revokeAccess]);

  return {
    orientation,
    error,
    requestAccess,
    revokeAccess,
  };
};

// const App = () => {
//   const { orientation, requestAccess, revokeAccess, error } = useDeviceOrientation();
// 
//   return (
//     <div className="box">
//       <button onClick={requestAccess}>Request For Gyro Access</button>
//       {error && <div className="error">{error.message}</div>}
//       <Demo orientation={orientation} />
//     </div>
//   );
// };
// 
// ReactDOM.render(<App />, document.getElementById('root'));
