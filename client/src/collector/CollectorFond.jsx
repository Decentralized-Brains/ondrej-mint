import React, { useState, useEffect } from "react";
import TopTen from "./TopTen";
import PreviousMonth from "./PreviousMonth";
import TopElevenToTwenty from "./TopElevenToTwenty";

const CollectorFond = () => {
  // Creating a date object
  var today = new Date();

  // Getting full month name (e.g. "June")
  var month = today.toLocaleString("default", { month: "long" }).toUpperCase();

  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

  function updateCountdown() {
    const date = new Date();
    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    const daysLeft = daysInMonth - date.getDate();
    const hoursLeft = 24 - date.getHours();
    const minutesLeft = 60 - date.getMinutes();
    const secondsLeft = 60 - date.getSeconds();

    setDaysLeft(daysLeft);
    setHoursLeft(hoursLeft);
    setMinutesLeft(minutesLeft);
    setSecondsLeft(secondsLeft);
  }

  useEffect(() => {
    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container mt-[60px]">
      {/* for top 10 */}
      <div className="mt-[30px] w-20 bg-[#FFF200] p-[8px] text-lg font-extrabold uppercase text-black">
        top 10
      </div>
      <div className="mt-[16px] flex items-center justify-between">
        <div>
          <h6 className=" text-[16px] font-semibold uppercase text-[#828282]">
            Current fund amount
          </h6>
          <h4 className="mt-[4px] text-lg font-extrabold sm:text-[28px]">
            1.036 ETH
          </h4>
        </div>

        <div>
          <h6 className=" text-[16px] font-semibold uppercase text-[#828282]">
            {month} month ends in
          </h6>
          <div className="mt-[4px] text-lg font-extrabold sm:text-[28px]">
            {daysLeft}d <span className="font-light"> : </span>
            {hoursLeft}h <span className="font-light"> : </span>
            {minutesLeft}m <span className="font-light"> : </span>
            {secondsLeft}s
          </div>
        </div>
      </div>

      <div className="mt-[21px]">
        <TopTen />
      </div>

      {/* for top 11 - 20 */}
      <div className="mt-[54px] w-[6.6rem] bg-[#FFF200] p-[8px] text-lg font-extrabold uppercase text-black">
        top 11-20
      </div>
      <div className="mt-[16px]">
        <h6 className=" text-[16px] font-semibold uppercase text-[#828282]">
          Current fund amount
        </h6>
        <h4 className="mt-[4px] text-lg font-extrabold sm:text-[28px]">
          1.036 ETH
        </h4>
      </div>

      <div className="mt-[21px]">
        <TopElevenToTwenty />
      </div>

      {/* for previous month */}
      <div className="mt-[54px] w-[11.4rem] bg-[#FFF200] p-[8px] text-lg font-extrabold uppercase text-black">
        Previous Month
      </div>
      <div className="mt-[16px]">
        <h6 className=" text-[16px] font-semibold uppercase text-[#828282]">
          fund amount
        </h6>
        <h4 className="mt-[4px] text-lg font-extrabold sm:text-[28px]">
          1.036 ETH
        </h4>
      </div>

      <div className="my-[21px]">
        <PreviousMonth />
      </div>
    </div>
  );
};

export default CollectorFond;
