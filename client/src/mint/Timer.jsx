import React, { useEffect, useState } from 'react';

const Timer = ({ endDate }) => {
    const calculateTimeLeft = () => {
        const difference = new Date(endDate) - new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        } else {
            timeLeft = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [endDate]);

    return (
        <div>
            <div className="mt-[8px] font-space text-[22px] font-bold">
                {timeLeft.days}d <span className="font-light"> : </span> {timeLeft.hours}h{" "}
                <span className="font-light"> : </span> {timeLeft.minutes}m{" "}
                <span className="font-light"> : </span> {timeLeft.seconds}s
            </div>
        </div>
        
    );
};

export default Timer;
