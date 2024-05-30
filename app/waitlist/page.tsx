"use client";
import React, { useState } from "react";
import waitlistImg from "../../public/images/Sign_up.png";
import Image from "next/image";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Waitlist = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subscribe: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email) {
      return;
    }
    if (!validateEmail(formData.email)) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/user/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Success:", result);

      // Optionally, clear form data or show a success message
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full md:gap-10 py-10">
      <h1 className="text-textcolor1 text-3xl font-bold md:hidden px-5">
        LadX<span className="text-primary text-base">beta</span>
      </h1>
      <div className="hidden md:block bg-gray-100 rounded-r-[3rem] md:w-[55%] p-32 pt-5">
        <h1 className="text-textcolor1 text-4xl pb-24 font-bold">
          LadX<span className="text-primary text-base">beta</span>
        </h1>
        <Image src={waitlistImg} alt="Waitlist" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center text-textcolor1 gap-3 p-5 w-full md:w-[35%]"
      >
        <h1 className="text-left self-start font-bold pt-5 md:text-4xl text-3xl text-textcolor1">
          Get early access
        </h1>
        <p className=" text-textcolor2 pb-5 md:w-3/4 text-left md:self-start">
          Be among the first to experience LadX&apos;s innovative delivery
          service
        </p>
        <div className="flex gap-3 w-full">
          <div className="w-full">
            <label htmlFor="firstName" className="font-bold">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="form-input"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full">
            <label htmlFor="lastName" className="font-bold">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="form-input"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full flex items-start gap-2 ">
          <input
            type="checkbox"
            name="subscribe"
            className="mt-1"
            checked={formData.subscribe}
            onChange={handleChange}
          />
          <label htmlFor="subscribe" className=" text-textcolor2 ">
            Check the box to subscribe to our email campaigns and stay updated
            with the latest news.
          </label>
        </div>
        <button
          type="submit"
          className={`bg-primary text-white w-full p-3 rounded-lg ${
            loading ? "opacity-50" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Join Waitlist"}
        </button>
      </form>
    </div>
  );
};

export default Waitlist;
