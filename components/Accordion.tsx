"use client";
import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

export default function FaqComponent(props: any) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="flex flex-col p-3 border-b text-gray-light w-full cursor-pointer"
    >
      <div className="flex flex-row items-center w-full ">
        <p
          className={` text-primary font-bold text-lg w-11/12 md:w-full transition-all duration-500  ${
            expanded ? "text-gray-dark font-black" : "font-normal"
          }`}
        >
          {props.title}
        </p>
        {(expanded && (
          <AiOutlineMinus
            size={30}
            className="text-secondary flex-auto m-2 border-textcolor1 border p-1 rounded-full "
          />
        )) || (
          <AiOutlinePlus
            size={30}
            className="text-secondary flex-auto m-2 border-textcolor1 border p-1 rounded-full"
          />
        )}
      </div>
      <div
        className={`transition-all duration-700 ease-in-out overflow-hidden ${
          expanded ? " max-h-[100vh]" : "max-h-0"
        }`}
      >
        <p className=" font-light text-textcolor1">{props.description}</p>
      </div>
    </div>
  );
}
