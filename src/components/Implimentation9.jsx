import React, { useEffect } from 'react';
import { useLinearAccelerometer } from './useLinearAccelerometer';

const Implimentation9 = () => {
  const { linearAcceleration, error, requestAccess, revokeAccess } = useLinearAccelerometer();

  useEffect(() => {
    requestAccess();

    return () => {
      revokeAccess();
    };
  }, [requestAccess, revokeAccess]);

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      {linearAcceleration ? (
        <div>
          <p>X: {linearAcceleration.x}</p>
          <p>Y: {linearAcceleration.y}</p>
          <p>Z: {linearAcceleration.z}</p>
        </div>
      ) : (
        <p>No linear acceleration data</p>
      )}
    </div>
  );
};

export default Implimentation9;
