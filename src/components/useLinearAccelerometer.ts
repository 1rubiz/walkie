import { useCallback, useEffect, useState, useRef } from 'react';

type LinearAccelerationData = {
  x: number | null,
  y: number | null,
  z: number | null,
};

type UseLinearAccelerometerData = {
  linearAcceleration: LinearAccelerationData | null,
  error: Error | null,
  requestAccess: () => Promise<boolean>,
  revokeAccess: () => Promise<void>,
};

export const useLinearAccelerometer = (): UseLinearAccelerometerData => {
  const [error, setError] = useState<Error | null>(null);
  const [linearAcceleration, setLinearAcceleration] = useState<LinearAccelerationData | null>(null);
  const linearAccelerometerRef = useRef<LinearAccelerationSensor | null>(null);

  const onLinearAccelerometerChange = (): void => {
    if (linearAccelerometerRef.current) {
      setLinearAcceleration({
        x: linearAccelerometerRef.current.x,
        y: linearAccelerometerRef.current.y,
        z: linearAccelerometerRef.current.z,
      });
    }
  };

  const revokeAccessAsync = async (): Promise<void> => {
    if (linearAccelerometerRef.current) {
      linearAccelerometerRef.current.removeEventListener('reading', onLinearAccelerometerChange);
      linearAccelerometerRef.current.stop();
      linearAccelerometerRef.current = null;
    }
    setLinearAcceleration(null);
  };

  const requestAccessAsync = async (): Promise<boolean> => {
    if (!('LinearAccelerationSensor' in window)) {
      setError(new Error('LinearAccelerationSensor is not supported by your browser'));
      return false;
    }

    try {
      const sensor = new LinearAccelerationSensor({ frequency: 60 });
      sensor.addEventListener('reading', onLinearAccelerometerChange);
      sensor.start();
      linearAccelerometerRef.current = sensor;
    } catch (err) {
      setError(err);
      return false;
    }

    return true;
  };

  const requestAccess = useCallback(requestAccessAsync, []);
  const revokeAccess = useCallback(revokeAccessAsync, []);

  useEffect(() => {
    return (): void => {
      revokeAccess();
    };
  }, [revokeAccess]);

  return {
    linearAcceleration,
    error,
    requestAccess,
    revokeAccess,
  };
};
