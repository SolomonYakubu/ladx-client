"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Waitlist = ({
  waitlist,
  setWaitlist,
}: {
  waitlist: boolean;
  setWaitlist: any;
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    <div
      className={`flex flex-col w-full py-10 px-5 h-screen bg-inherit justify-center items-center fixed transition-all duration-500 ${
        (waitlist && "scale-100") || "scale-0"
      }  `}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center text-textcolor1 gap-3 p-5  bg-white bg-opacity-90 backdrop-blur rounded-lg w-full md:w-[30%]"
      >
        <AiOutlineClose
          size={40}
          onClick={() => setWaitlist(false)}
          className="text-textcolor2 self-end border border-textcolor2 rounded-full p-2"
        />

        <h1 className="text-left self-start font-bold pt-5 md:text-4xl text-3xl text-textcolor1">
          Get early access
        </h1>
        <p className="text-textcolor2 pb-5">
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
