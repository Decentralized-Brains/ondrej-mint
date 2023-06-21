import React, { useState, useEffect } from "react";
import CrossMintImg from "../assets/Vector.svg";
import { FaEthereum } from "react-icons/fa";
import { BiCheck, BiMinus, BiPlus } from "react-icons/bi";

//slider start
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Autoplay } from "swiper";
import { sliderData } from "../data/Data.jsx";

//slider end

const Mint = () => {
  const [count, setCount] = useState(2);
  const maxGuests = 999;
  const minGuests = 1;

  const decrementCount = () => {
    if (count > minGuests) setCount(count - 1);
  };

  const incrementCount = () => {
    if (count < maxGuests) setCount(count + 1);
    else if (count > maxGuests) setCount(maxGuests);
  };

  // // Creating a date object
  // var today = new Date();

  // // Getting full month name (e.g. "June")
  // var month = today.toLocaleString("default", { month: "long" }).toUpperCase();

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
      <div className="flex flex-col md:flex-row">
        <div className=" mb-10 w-full md:mb-0 md:w-1/2 lg:max-w-lg">
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            // navigation={true}
            modules={[Autoplay]}
            className="mySwiper"
          >
            {sliderData.map((item) => {
              return (
                <SwiperSlide>
                  <img
                    className="mx-auto object-cover object-center lg:h-[550px] lg:w-[700px]"
                    alt="hero"
                    src={item.img}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="flex flex-col items-center text-center text-[#DDDDDD] md:w-1/2 md:items-start md:pl-[30px] md:text-left lg:flex-grow lg:pl-[65px]">
          <h4 className="text-2xl font-bold">Potocnik </h4>

          <div className="flex items-center justify-center gap-[22px] py-4">
            <h1 className=" text-2xl font-extrabold uppercase sm:text-[2rem]">
              Public Mint is{" "}
            </h1>
            <span className="rounded-full bg-[#FFF200] px-[10px] py-[8px] text-[18px] font-extrabold text-black">
              Live
            </span>
            <span className="rounded-full bg-[#FFF200] px-[10px] py-[8px] text-[18px] font-extrabold text-black">
              Soldout
            </span>
          </div>

          <div className="mt-[16px] flex w-full flex-col items-center justify-between lg:flex-row">
            <div>
              <div className="font-semibold text-[#828282]">Contract ID</div>
              <div className="mt-[8px] flex items-center justify-center gap-[9px] font-space text-[18px]">
                <span className="text-[#828282]">
                  <FaEthereum />
                </span>
                <a href="" className=" cursor-pointer">
                  0xBkFE...Bc9D
                </a>
              </div>
            </div>

            <div className="mt-[16px] lg:mt-0">
              <div className="font-semibold text-[#828282]">Ending in</div>
              <div className="mt-[8px] font-space text-[22px] font-bold">
                {daysLeft}d <span className="font-light"> : </span> {hoursLeft}h{" "}
                <span className="font-light"> : </span> {minutesLeft}m{" "}
                <span className="font-light"> : </span> {secondsLeft}s
              </div>
            </div>
          </div>

          <div className="mt-[24px] flex items-center justify-start gap-[45px] max-sm:flex-wrap">
            <div>
              <div className="font-semibold text-[#828282]">Whitelist:</div>
              <div className="mt-[8px] flex items-center justify-center gap-[9px]  text-[18px]">
                <span className="rounded-full bg-[#33333380] p-[1px] text-2xl text-[#FFF200]">
                  <BiCheck />
                </span>
                <span className="text-sm font-bold uppercase">Soldout</span>
              </div>
            </div>

            <div>
              <div className="font-semibold text-[#828282]">Presale:</div>
              <div className="mt-[8px] flex items-center justify-center gap-[9px]  text-[18px]">
                <span className="rounded-full bg-[#33333380] p-[1px] text-2xl text-[#FFF200]">
                  <BiCheck />
                </span>
                <span className="text-sm font-bold uppercase">Soldout</span>
              </div>
            </div>

            <div>
              <div className="font-semibold text-[#828282]">Public Mint:</div>
              <div className="mt-[8px] flex items-center justify-center gap-[9px]  text-[18px]">
                <span className="rounded-full bg-[#33333380] p-[1px] text-2xl text-[#FFF200]">
                  <BiCheck />
                </span>
                <span className="text-sm font-bold uppercase">Soldout</span>
              </div>
            </div>
          </div>

          <div className="my-[16px] flex  items-center justify-start gap-[8px]">
            <div className="rounded-full bg-[#33333380] px-[16px] py-[10px] text-sm font-bold uppercase text-[#828282]">
              Max 5 per wallet
            </div>
            <div className="rounded-full bg-[#33333380] px-[16px] py-[10px] text-sm font-bold uppercase text-[#828282]">
              Additional Conditions Apply *
            </div>
          </div>

          <p className="text-[13px] text-[#828282]">
            * Additional Conditions: For each Potocnik NFT you want to mint, you
            need to hold a Cameltoe Brides (V1) and a Cameltoe Brides (V2) NFT
            in the wallet you are minting from.
          </p>

          <div className="mt-[42px] flex w-full items-center justify-between">
            <div>
              <div className="font-semibold text-[#828282]">Price</div>
              <h1 className=" mt-[8px] text-xl font-extrabold sm:text-[28px] ">
                2.69 ETH
              </h1>
            </div>

            <div>
              <div className="font-semibold text-[#828282]">Remaining</div>
              <h1 className=" mt-[8px] text-xl font-extrabold sm:text-[28px] ">
                634 / 899
              </h1>
            </div>
          </div>

          <div className="mt-[16px] h-[10px] w-full  bg-[#33333380]">
            <div
              className="h-[10px]  bg-[#DDDDDD]"
              style={{ width: " 78%" }}
            ></div>
          </div>

          <div className="my-[16px] flex w-full flex-col justify-between lg:flex-row lg:items-center">
            <div className="mb-2 flex items-center justify-center gap-[24px] font-bold lg:mb-0">
              <div
                className="cursor-pointer rounded-full bg-[#33333380] p-2"
                onClick={() => decrementCount()}
              >
                <BiMinus className="text-lg" />
              </div>

              <span className="font-space text-4xl font-bold">{count}</span>
              <div
                className="cursor-pointer rounded-full bg-[#33333380] p-2"
                onClick={() => incrementCount()}
              >
                <BiPlus className="text-lg" />
              </div>
            </div>

            <a
              href="//app.publicmint.io/mint/0x0BkFE...Bc9D"
              className="rounded-[4px] bg-[#FFF200] px-[78px] py-[14px] text-xl font-extrabold uppercase text-black"
              target="_blank"
              rel="noreferrer"
            >
              Mint now with Eth
            </a>
          </div>

          <div className="flex w-full  lg:justify-end ">
            <a
              href="//app.publicmint.io/mint/0x0BkFE...Bc9D"
              className="flex items-center justify-center  gap-[12px] rounded-[4px] bg-[#1E1E1E] px-[54px] py-[14px] text-xl font-extrabold uppercase text-white max-lg:w-full"
              target="_blank"
              rel="noreferrer"
            >
              <img src={CrossMintImg} alt="" />
              Buy with Crossmint
            </a>
          </div>

          <p className="mt-[16px] flex w-full justify-end text-[#828282]">
            Pay with Fiat currencies & other Cryptocurrencies
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mint;
