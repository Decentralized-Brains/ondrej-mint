import React from "react";
import { topTenData } from "../data/Data";

const TopTen = () => {
  return (
    <div>
      <div className=" overflow-x-auto rounded-[4px]">
        <table className="w-full border-collapse bg-[#33333380] text-center text-gray-500">
          <thead className="text-[#dddddd]">
            <tr>
              <th scope="col" className="px-6 py-[25px] font-bold">
                Collector
              </th>
              <th scope="col" className="px-6 py-[25px] font-bold">
                Wallet address
              </th>
              <th scope="col" className="px-6 py-[25px] font-bold">
                NFTs Bought this month
              </th>
              <th scope="col" className="px-6 py-[25px] font-bold">
                Spent this month
              </th>
              <th scope="col" className="px-6 py-[25px] font-bold">
                Estimated Payout
              </th>
              <th scope="col" className="px-6 py-[25px] font-bold">
                Previously in Top 10
              </th>
              <th scope="col" className="px-6 py-[25px] font-bold">
                Total Received
              </th>
            </tr>
          </thead>
          <tbody className=" border-t border-[#333333]">
            {topTenData.map((item) => {
              return (
                <tr
                  className="text-[#828282] hover:bg-[#333333]"
                  key={item.key}
                >
                  <th className="flex items-center justify-center gap-[12px] px-5 py-[21px] font-normal ">
                    <div className="h-[40px] w-[40px]">
                      <img
                        className="h-full w-full rounded-full object-cover object-center"
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div className="text-start">
                      <div className="font-medium text-[#DDDDDD]">
                        Kevin Phillips
                      </div>
                      <div className="text-[13px] ">@kelvin_philip12</div>
                    </div>
                  </th>

                  <td className="px-5 py-[21px] font-semibold">
                    0xBkFE...Bc9D{" "}
                  </td>
                  <td className="px-5 py-[21px] font-semibold">6 </td>
                  <td className="px-5 py-[21px] font-semibold">0.0025 ETH </td>
                  <td className="px-5 py-[21px] font-semibold">
                    0.1032345 ETH{" "}
                  </td>
                  <td className="px-5 py-[21px] font-semibold">8 Times </td>
                  <td className="px-5 py-[21px] font-semibold">1.345 ETH </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopTen;
