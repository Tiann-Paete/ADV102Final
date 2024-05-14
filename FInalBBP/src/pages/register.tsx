import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useRouter } from "next/router";
import Swal from 'sweetalert2';

export default function Register() {
  const { createUser } = useAuth();
  const router = useRouter();
  const [authError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
  
    try {
      await createUser({ email, password });
      console.log("User created successfully!");
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'Your account has been created successfully!',
        confirmButtonColor: "#0b5394",
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/");
        }
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  
  return (
    <main>
      <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0 bg-gradient-to-t from-zinc-50 via-sky-700 to-indigo-900">
        <div className="max-w-screen-xl bg-white border-gray-300 shadow sm:rounded-lg flex justify-center flex-1">
          <div className="flex-1 bg-white-200 text-center hidden md:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(/image/blue2.jpg)`,
              }}
            ></div>
          </div>
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className=" flex flex-col items-center">
              <div className="text-center">
                <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                  Student Sign up
                </h1>
                <p className="text-[12px] text-gray-500 mt-4">
                  Hey, enter your details to create your account
                </p>
              </div>
              <form className="w-full flex-1 mt-8" onSubmit={handleSubmit}>
                <div className="mx-auto max-w-xs flex flex-col gap-4">
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 
                    text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    required
                  />
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 
                    text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                  />
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 
                    text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone"
                    required
                  />
                  <div className="relative">
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 
                      text-sm focus:outline-none focus:border-gray-400 focus:bg-white pr-10"
                      type="password"
                      name="password"
                      placeholder="Password"
                      required
                    />
                  </div>
                  {authError && <p className="text-red-500 text-sm">{authError}</p>}
                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-blue-800 
                    transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <span className="ml-3">Sign Up</span>
                  </button>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    Already have an account?{" "}
                    <a href="/">
                      <span className="text-blue-900 font-semibold">Sign in</span>
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
