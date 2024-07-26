import React, { useState, useEffect } from 'react';

class GravitySensor extends EventTarget {
  #accelerometer = new Accelerometer();
  #linearAccelerationSensor = new LinearAccelerationSensor();
  x = 0;
  y = 0;
  z = 0;

  handleEvent(ev) {
    this.timestamp = ev.timestamp;
    this.x = this.#accelerometer.x - this.#linearAccelerationSensor.x;
    this.y = this.#accelerometer.y - this.#linearAccelerationSensor.y;
    this.z = this.#accelerometer.z - this.#linearAccelerationSensor.z;
    const event = new Event("reading");
    this.dispatchEvent(event);
    this.onreading?.(event);
  }

  start() {
    this.#accelerometer.addEventListener("reading", this);
    this.#accelerometer.start();
  }

  stop() {
    this.#accelerometer.removeEventListener("reading", this);
    this.#accelerometer.stop();
  }
}

const GravitySensorComponent = () => {
  const [gravitySensor, setGravitySensor] = useState(null);
  const [sensorData, setSensorData] = useState({ x: 0, y: 0, z: 0 });
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const sensor = new GravitySensor();
    sensor.onreading = () => {
      setSensorData({ x: sensor.x, y: sensor.y, z: sensor.z });
    };
    setGravitySensor(sensor);

    return () => {
      if (sensor) {
        sensor.stop();
      }
    };
  }, []);

  const handleClick = () => {
    if (isRunning) {
      gravitySensor.stop();
    } else {
      gravitySensor.start();
    }
    setIsRunning(!isRunning);
  };

  return (
    <div>
      <button onClick={handleClick}>
        {isRunning ? 'Stop' : 'Start'} Gravity Sensor
      </button>
      <div>
        <p>X: {sensorData.x}</p>
        <p>Y: {sensorData.y}</p>
        <p>Z: {sensorData.z}</p>
      </div>
    </div>
  );
};

export default GravitySensorComponent;
