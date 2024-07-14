// src/components/StepCounter.js
import React from 'react';
import useStepCounter from '../hooks/useMotion';

const StepCounter = () => {
  const steps = useStepCounter();

  return (
    <div>
      <h1>Steps: {steps}</h1>
    </div>
  );
};

export default StepCounter;
