import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Dashboard from './Dashboard';

import { useNavigate } from "react-router-dom";

const Login = ({auth,Setauth}) => {
  const navigate = useNavigate();
  const [input, setinput] = useState({
    Username: "",
    password: "",
  });
  const handlesubmit = async (e) => {
    e.preventDefault();
    const { Username, password } = input;
    try {
      const { data } = await axios.post("/login", {
        Username,
        password,
      });
      if (data.message) {
        toast.success(data.message);

        setinput({ Username: "", password: "" });

        localStorage.setItem("token", data.token);
        const token = localStorage.getItem("token");
        // console.log(token);
        
          try{
            const { data } = await axios.get("/validation", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log(data);
            if(data.decoded){
              Setauth(true);
              navigate("/Dashboard");
            }
  
          }catch(err){
            console.log(err);
          }

        
        
    

        

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
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={(e) => handlesubmit(e)}>
          <div>
            <label
              htmlFor="Username"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="Username"
                name="Username"
                type="text"
                required
                placeholder="Enter your username"
                class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={input.Username}
                onChange={(e) =>
                  setinput({ ...input, Username: e.target.value })
                }
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
            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={input.password}
                onChange={(e) =>
                  setinput({ ...input, password: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
