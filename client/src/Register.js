import React from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [input, setinput] = useState({
    Username: "",
    DOB: "",
    email: "",
    password: "",
  });
  const handlesubmit = async (e) => {
    e.preventDefault();
    const { Username, DOB, email, password } = input;
    try {
      const { data } = await axios.post("/register", {
        Username,
        DOB,
        email,
        password,
      });
      if (data.success) {
        toast.success(data.success);
        navigate("/");
        setinput({
          Username: "",
          DOB: "",
          email: "",
          password: "",
        });
      } else if (data.error) {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register
        </h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={(e) => handlesubmit(e)}>
          <div>
            <label
              htmlForfor="Username"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              UserName
            </label>
            <div className="mt-2">
              <input
                id="Username"
                name="Username"
                type="text"
                placeholder="Enter your Username"
                class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={input.Username}
                onChange={(e) =>
                  setinput({ ...input, Username: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="DOB"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Date-Of-Birth
            </label>
            <div className="mt-2">
              <input
                id="DOB"
                name="DOB"
                type="DATE"
                // placeholder="Enter your DOB"

                required
                class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={input.DOB}
                onChange={(e) => setinput({ ...input, DOB: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label
              htmlForfor="email"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={input.email}
                onChange={(e) => setinput({ ...input, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center">
              <label
                htmlFor="password"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="*********"
                required
                class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={input.password}
                onChange={(e)=>setinput({...input,password:e.target.value})}
    
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
