import React from "react";
import carryPackage from "../public/images/Carry_package.png";
import sendPackage from "../public/images/Send_package.png";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import Image from "next/image";

const Role = () => {
  const role = [
    {
      name: "Send a Package",
      image: sendPackage,
      desc: "Choose this option if you want to send a package to someone.",
    },
    {
      name: "Carry a Package",
      image: carryPackage,
      desc: "Select this option if you want to carry a package for someone.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full md:gap-10 ">
      <h1 className="text-textcolor1 text-3xl font-bold px-5 py-5  self-start">
        LadX<span className="text-primary text-base">beta</span>
      </h1>
      <div className="flex flex-wrap justify-center items-center bg-gray-100 md:w-fit rounded-3xl">
        {role.map((item, index) => (
          <div
            key={index}
            className="m-5 hover:scale-105 transition-all duration-700"
          >
            <div className="max-w-sm rounded-2xl overflow-hidden flex flex-col items-center justify-center p-3 py-5 bg-white">
              <Image src={item.image} alt={item.name} />
              <div className=" py-4 ">
                <div className=" text-xl mb-2 text-primary font-bold">
                  {item.name}
                </div>
                <div className="flex justify-between items-start gap-4">
                  <p className=" text-textcolor2 text-base">{item.desc}</p>
                  <IoArrowForwardCircleOutline
                    size={70}
                    className=" text-textcolor1 opacity-70 -translate-y-4 hover:scale-105 transition-all duration-700 "
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Role;
