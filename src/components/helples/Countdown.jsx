import React, { useState, useEffect } from 'react';

const Countdown = ({ onTimeout }) => {
    const [time, setTime] = useState(120);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (time === 0) {
            onTimeout();
        }
    }, [time, onTimeout]);

    return (
        <div className="text-4xl font-bold">
            {Math.floor(time / 60).toString().padStart(2, '0')}:{(time % 60).toString().padStart(2, '0')}
        </div>
    );
};

export default Countdown;
