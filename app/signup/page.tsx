"use client";
import React, { useState } from "react";
import signupImg from "../../public/images/Sign_up.png";
import ngFlag from "../../public/icons/ng-flag.png";
import rwFlag from "../../public/icons/rw-flag.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
const countries = [
  { name: "Nigeria", code: "+234", icon: ngFlag },
  { name: "Rwanda", code: "+250", icon: rwFlag },
];
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "Nigeria",
    phoneNumber: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.password
    ) {
      return;
    }
    if (!validateEmail(formData.email)) {
      return;
    }
    if (formData.password.length < 6) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/user/signup`, {
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
      toast({
        description: "Account created successfully! Please login to continue.",
      });
      router.push("/login");
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",

        description: "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full py-10">
      <Toaster />
      <h1 className="text-textcolor1 text-3xl font-bold md:hidden px-5">
        LadX<span className="text-primary text-base">beta</span>
      </h1>
      <div className="hidden md:block bg-gray-100 rounded-r-[3rem] md:w-[55%] p-32 pt-5">
        <h1 className="text-textcolor1 text-4xl pb-24 font-bold">
          LadX<span className="text-primary text-base">beta</span>
        </h1>
        <Image src={signupImg} alt="Signup" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center text-textcolor1 gap-3 p-5 md:mx-10"
      >
        <h1 className="text-left self-start font-bold py-5 md:text-4xl text-3xl text-textcolor1">
          Create an account
        </h1>
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
        <div className="w-full">
          <label htmlFor="country" className="font-bold">
            Country
          </label>
          <div className="w-full relative flex items-center justify-start">
            <Image
              src={
                countries.find((item) => item.name === formData.country)
                  ?.icon || ngFlag
              }
              alt="Country flag"
              height={40}
              width={40}
              className="absolute p-2"
            />
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-4 pl-8"
              required
            >
              {countries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="phoneNumber" className="font-bold">
            Phone Number
          </label>
          <div className="w-full relative flex items-center justify-start">
            <div className="flex absolute items-center bg-gray-100 m-1 rounded-3xl px-1">
              <Image
                src={
                  countries.find((item) => item.name === formData.country)
                    ?.icon || ngFlag
                }
                alt="Country flag"
                height={40}
                width={40}
                className="p-2"
              />
              <p className="p-1 font-bold">
                {countries.find((item) => item.name === formData.country)?.code}
              </p>
            </div>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Enter Your Phone Number"
              className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-4 pl-28"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="password" className="font-bold">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>
        <button
          type="submit"
          className={`bg-primary text-white w-full p-3 rounded-lg ${
            loading ? "opacity-50" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign up"}
        </button>
        <div className="text-textcolor2">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-bold underline">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
