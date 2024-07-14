import React, {useState} from 'react'

function Implimentation5() {
	const [err, setErr] = useState('')
	const [data, setData] = useState(null)
	 const [maxSpeed, setMaxSpeed] = useState(0);
	  const [vx, setVx] = useState(0);
	  const [ax, setAx] = useState(0);
	  const [t, setT] = useState(0);
	let accelerometer = null;
	try {
	  accelerometer = new Accelerometer({ frequency: 10 });
	  accelerometer.onerror = (event) => {
	    // Handle runtime errors.
	    if (event.error.name === 'NotAllowedError') {
	      setErr('Permission to access sensor was denied.');
	    } else if (event.error.name === 'NotReadableError') {
	      setErr('Cannot connect to the sensor.');
	    }
	  };
	  accelerometer.onreading = (e) => {
	    console.log(e);
	    const dt = (accelerometer.timestamp - t) * 0.001; // In seconds.
	      const newVx = vx + ((accelerometer.x + ax) / 2) * dt;
	      const speed = Math.abs(newVx);

	      if (maxSpeed < speed) {
	        setMaxSpeed(speed);
	      }

	      setVx(newVx);
	      setT(accelerometer.timestamp);
	      setAx(accelerometer.x);
	  };
	  accelerometer.start();
	} catch (error) {
	  // Handle construction errors.
	  if (error.name === 'SecurityError') {
	    setErr('Sensor construction was blocked by the Permissions Policy.');
	  } else if (error.name === 'ReferenceError') {
	    setErr('Sensor is not supported by the User Agent.');
	  } else {
	    throw error;
	  }
	}
	return (
		<div>
			Error : {err}
			<div>
				Data :{maxSpeed}
			</div>
			<div><p>Maximum Speed: {maxSpeed.toFixed(2)}</p></div>
			<div>VX : {vx}</div>

		</div>
	)
}

export default Implimentation5