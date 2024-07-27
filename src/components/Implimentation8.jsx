import React, { useEffect } from 'react';
import { useAccelerometer } from './useAccelerometer.ts';

const Implimentation8 = () => {
  const { accelerometer, error, requestAccess, revokeAccess } = useAccelerometer();

  useEffect(() => {
    requestAccess();

    return () => {
      revokeAccess();
    };
  }, [requestAccess, revokeAccess]);

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      {accelerometer ? (
        <div>
          <p>X: {accelerometer.x}</p>
          <p>Y: {accelerometer.y}</p>
          <p>Z: {accelerometer.z}</p>
        </div>
      ) : (
        <p>No accelerometer data</p>
      )}
    </div>
  );
};

export default Implimentation8;
