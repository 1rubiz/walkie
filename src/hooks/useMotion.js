// src/hooks/useMotion.js
import { useEffect, useState } from 'react';
import { useMotion } from 'react-use';

const useStepCounter = () => {
  const [steps, setSteps] = useState(0);
  const { acceleration } = useMotion();

  useEffect(() => {
    let lastZ = null;
    let stepCount = 0;

    const handleMotion = () => {
      const { x, y, z } = acceleration;
      if (lastZ !== null) {
        const deltaZ = Math.abs(z - lastZ);
        if (deltaZ > 1) { // You can adjust this threshold based on testing
          stepCount += 1;
          setSteps(stepCount);
        }
      }
      lastZ = z;
    };

    const interval = setInterval(handleMotion, 100); // Adjust interval as needed
    return () => clearInterval(interval);
  }, [acceleration]);

  return steps;
};

export default useStepCounter;
