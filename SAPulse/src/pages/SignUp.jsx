import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../client";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  console.log(formData);

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

async function handleSubmit(e) {
  e.preventDefault();
  try {
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullname,
        },
      },
    });

    if (signUpError) throw signUpError;

    // data.user exists even before verification
    if (!data.user) throw new Error("Sign up failed, please try again.");

    const { error: insertError } = await supabase
      .from("users")
      .insert({
        id: data.user.id,
        full_name: formData.fullname,
        email: formData.email,
        is_admin: false,
        is_leader: false,
      });

    if (insertError) throw insertError;

    alert("Check your E-mail for Verification Link");
  } catch (error) {
    alert(error.message);
  }
}

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-50">
        <h1 className="p-6 pb-2 font-bold text-7xl">
          <span className="text-blue-900">SA</span>
          <span className="text-gray-500">Pulse</span>
        </h1>
        <p className="pb-6 text-lg text-gray-600">
          The Information you Deserve
        </p>
        <div className="flex flex-col justify-center items-center border-2 bg-white border-gray-300 rounded-md p-12 gap-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-4"
          >
            <input
              placeholder="Fullname"
              name="fullname"
              onChange={handleChange}
              className="border border-gray-200 p-2 rounded-md"
            />

            <input
              placeholder="Email"
              name="email"
              onChange={handleChange}
              className="border border-gray-200 p-2 rounded-md"
            />

            <input
              placeholder="Password"
              name="password"
              onChange={handleChange}
              className="border border-gray-200 p-2 rounded-md"
            />

            <button
              type="submit"
              className="w-full bg-blue-950 py-2 text-gray-50 rounded-md hover:cursor-pointer"
            >
              Submit
            </button>
          </form>
          <p>
            Already a Member?{" "}
            <Link to="/" className="text-blue-950 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
