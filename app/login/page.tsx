"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import loginImg from "../../public/images/Log_in.png";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
import Role from "@/components/role";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();
  const { toast } = useToast();
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

    if (!formData.email || !formData.password) {
      return;
    }
    if (!validateEmail(formData.email)) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/user/login`, {
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

      // Save token and user ID in local storage
      localStorage.setItem("token", result.token);
      localStorage.setItem("userId", result.id);

      // Save token in cookie
      document.cookie = `token=${result.token}; path=/`;

      // Update state to indicate the user is logged in
      toast({
        variant: "default",

        description: "Login Successful",
      });
      setIsLoggedIn(true);
      setUserInfo(result);
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        description: "Invalid details",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full md:gap-10 py-10">
      <Toaster />
      {isLoggedIn ? (
        <div className="w-full">
          <Role />
        </div>
      ) : (
        <>
          <h1 className="text-textcolor1 text-3xl font-bold md:hidden px-5">
            LadX<span className="text-primary text-base">beta</span>
          </h1>
          <div className="hidden md:block bg-gray-100 rounded-r-[3rem] md:w-[55%] p-32 pt-5">
            <h1 className="text-textcolor1 text-4xl pb-24 font-bold">
              LadX<span className="text-primary text-base">beta</span>
            </h1>
            <Image src={loginImg} alt="Login" />
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center text-textcolor1 gap-3 p-5 md:w-[40%]"
          >
            <h1 className="text-left self-start font-bold py-5 md:text-4xl text-3xl text-textcolor1">
              Log in
            </h1>
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
              {loading ? "Loading..." : "Login"}
            </button>
            <div className="text-textcolor2">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary font-bold underline">
                Sign up
              </Link>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
