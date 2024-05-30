"use client";
import { useState } from "react";
import Image from "next/image";
import hero from "../public/images/hero.jpg";
import carryPackage from "../public/images/Carry_package.png";
import sendPackage from "../public/images/Send_package.png";
import faqImg from "../public/images/faq.svg";
import Accordion from "../components/Accordion";
import Waitlist from "../components/waitlist";
export default function Home() {
  const [waitlist, setWaitlist] = useState<boolean>(false);
  const role = [
    {
      name: "Carry a Package",
      image: carryPackage,
      desc: "With Ladx you can help deliver packages during your travels, earning extra income while contributing to a cost-effective and eco-friendly logistics solution. ",
    },
    {
      name: "Send a Package",
      image: sendPackage,
      desc: "With LadX, you can easily send your package through our network of travellers. Simply fill out the  package details, and we'll take care of the rest. Enjoy a seamless, cost-effective, and eco-friendly shipping experience. ",
    },
  ];
  const faqs = [
    {
      title: "How does LadX work?",
      description:
        "Customers submit a delivery request on the LadX website or app, specifying the item details, pickup and drop-off locations in Nigeria and Rwanda. LadX then matches that request with a verified traveler who is already planning a trip between those locations. The traveler picks up the item and delivers it directly to the recipient.",
    },
    {
      title: "What types of items can be sent via LadX?",
      description: `LadX can accommodate most common shipment types like documents, electronics, clothes, books and other personal effects or light parcels. However, for safety reasons, restricted items like weapons, illegal drugs, perishable foods and hazardous materials are prohibited.`,
    },
    {
      title: "How much does LadX cost?",
      description: `LadX pricing is based on the size, weight and route for each shipment, with discounted rates compared to traditional couriers. You get an upfront price quote before booking a delivery.`,
    },
    {
      title: "Is LadX reliable and safe?",
      description: `Yes, LadX has robust identity verification and rating systems for both senders and travelers. Items are also insured against loss or damage.`,
    },
    {
      title: "How soon can items be delivered?",
      description: `Delivery speed depends on the next available verified traveler's trip schedule. Some routes may have multiple travelers per day, while others could take several days or weeks to match. LadX provides tracking and ETA updates.`,
    },
  ];
  const faqComponents = faqs.map((faq, index) => {
    return (
      <Accordion title={faq.title} key={index} description={faq.description} />
    );
  });
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between `}
    >
      <div
        className={`flex min-h-screen flex-col items-center justify-between transition-all duration-500 ${
          waitlist && " max-h-screen overflow-hidden blur-sm"
        }`}
      >
        <section className="flex flex-col items-center justify-center w-full gap-10 px-5 py-5 bg-primary">
          <div className="flex justify-between w-full">
            <h1 className="text-4xl font-bold text-textcolor1">
              LadX<span className="text-base text-white">coming soon</span>
            </h1>
            <button
              className=" bg-secondary text-white p-2 px-7 rounded-lg"
              onClick={() => setWaitlist(true)}
            >
              {" "}
              Early access
            </button>
          </div>

          <p className="text-3xl md:text-6xl md:px-80 text-center  text-white font-extrabold">
            Logistics strategy with a difference
          </p>
          <button
            className=" bg-secondary text-white p-2 px-7 rounded-lg"
            onClick={() => setWaitlist(true)}
          >
            {" "}
            Click to get early access
          </button>
          <Image src={hero} alt="Hero" className="md:w-3/4 rounded-3xl" />
        </section>
        <section className="flex flex-col items-center justify-center w-full gap-10 px-5 py-5 bg-gray-100">
          <p className="text-lg text-center md:px-96 text-textcolor1">
            At LadX, we make sending packages easy and affordable. By connecting
            senders with travelers, we offer a seamless and eco-friendly
            delivery solution.
          </p>
          <div className="flex flex-col  justify-center items-center  w-full py-5 md:py-10">
            {role.map((item, index) => (
              <div
                key={index}
                className=" md:w-3/4 overflow-hidden ga md:gap-20 flex flex-col md:flex-row md:even:flex-row-reverse  items-center justify-center md:justify-start p-3 py-5"
              >
                <Image src={item.image} alt={item.name} />
                <div className=" py-4 md:w-[55%]">
                  <div className=" text-xl mb-2 text-primary font-bold">
                    {item.name}
                  </div>

                  <p className=" text-textcolor2 text-base ">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="flex flex-col items-center justify-center w-full gap-10 md:px-32 px-5 py-5 md:py-10 bg-white">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex flex-col items-center justify-start w-full gap-5 bg-primary rounded-lg md:w-1/2 p-10">
              <p className="text-white text-3xl font-bold">
                Find the answers to all of our most frequently asked questions
              </p>
              <Image src={faqImg} alt="" />
            </div>
            <div className="flex flex-col items-center justify-center w-full gap-5">
              {faqComponents}
            </div>
          </div>
        </section>
        <footer className="flex flex-col items-start justify-center w-full  px-5 py-5 bg-white">
          <div className="flex justify-between w-full">
            <h1 className="text-4xl font-bold text-textcolor1">
              LadX<span className="text-base text-primary">coming soon</span>
            </h1>
          </div>
          <p className="text-lg text-left text-textcolor2">
            © {new Date().getFullYear()} LadX. All rights reserved.
          </p>
        </footer>
      </div>
      <Waitlist waitlist={waitlist} setWaitlist={setWaitlist} />
    </main>
  );
}
