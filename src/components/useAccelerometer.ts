import { useCallback, useEffect, useState, useRef } from 'react';

type AccelerometerData = {
  x: number | null,
  y: number | null,
  z: number | null,
}

type UseAccelerometerData = {
  accelerometer: AccelerometerData | null,
  error: Error | null,
  requestAccess: () => Promise<boolean>,
  revokeAccess: () => Promise<void>,
};

export const useAccelerometer = (): UseAccelerometerData => {
  const [error, setError] = useState<Error | null>(null);
  const [accelerometer, setAccelerometer] = useState<AccelerometerData | null>(null);
  const accelerometerRef = useRef<Accelerometer | null>(null);

  const onAccelerometerChange = (event: Accelerometer): void => {
    setAccelerometer({
      x: event.x,
      y: event.y,
      z: event.z,
    });
  };

  const revokeAccessAsync = async (): Promise<void> => {
    if (accelerometerRef.current) {
      accelerometerRef.current.removeEventListener('reading', onAccelerometerChange);
      accelerometerRef.current.stop();
      accelerometerRef.current = null;
    }
    setAccelerometer(null);
  };

  const requestAccessAsync = async (): Promise<boolean> => {
    if (!('Accelerometer' in window)) {
      setError(new Error('Accelerometer is not supported by your browser'));
      return false;
    }

    try {
      const sensor = new Accelerometer({ frequency: 60 });
      sensor.addEventListener('reading', onAccelerometerChange);
      sensor.start();
      accelerometerRef.current = sensor;
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
    accelerometer,
    error,
    requestAccess,
    revokeAccess,
  };
};
