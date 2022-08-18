import React, { useState, useEffect } from "react";

const Auth = () => {
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [isSignUp, setIsSignUp] = useState(false);

  const clearForm = () => {
    setUserFormData({
      name: "",
      email: "",
      password: "",
      confirm: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `http://localhost:127.0.0.1:8000/login`,
        userFormData
      );
      console.log(data);
    } catch (err) {
      return err;
    }

    clearForm();
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[35%] bg-white  rounded-lg shadow-lg py-5 px-7">
        <h2 className="font-bold text-2xl text-center">
          {isSignUp ? "Register" : "Login"}
        </h2>
        <form onSubmit={handleSubmit} className="w-full mt-10">
          {isSignUp && (
            <div className="w-full mb-3">
              <input
                name="name"
                onChange={(e) =>
                  setUserFormData({
                    ...userFormData,
                    [e.target.name]: e.target.value,
                  })
                }
                type="text"
                placeholder="Username"
                className="w-full border outline-none focus:ring-1 focus:ring-pink-400 transition duration-300 border-gray-400 rounded-md py-3 px-2"
              />
            </div>
          )}
          <div className="w-full">
            <input
              name="email"
              onChange={(e) =>
                setUserFormData({
                  ...userFormData,
                  [e.target.name]: e.target.value,
                })
              }
              type="email"
              placeholder="Email"
              className="w-full border outline-none focus:ring-1 focus:ring-pink-400 transition duration-300 border-gray-400 rounded-md py-3 px-2"
            />
          </div>
          <div className="w-full mt-3">
            <input
              name="password"
              onChange={(e) =>
                setUserFormData({
                  ...userFormData,
                  [e.target.name]: e.target.value,
                })
              }
              type="password"
              placeholder="Password"
              className="w-full border focus:ring-1 focus:ring-pink-400 transition duration-300 outline-none border-gray-400 rounded-md py-3 px-2"
            />
          </div>
          {isSignUp && (
            <div className="w-full mt-3">
              <input
                name="confirm"
                onChange={(e) =>
                  setUserFormData({
                    ...userFormData,
                    [e.target.name]: e.target.value,
                  })
                }
                type="password"
                placeholder="Confirm password"
                className="w-full border outline-none focus:ring-1 focus:ring-pink-400 transition duration-300 border-gray-400 rounded-md py-3 px-2"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-pink-500 text-white font-semibold text-md py-2 rounded-md mt-7"
          >
            {isSignUp ? "Register" : "Login"}
          </button>
        </form>
        <span className="mt-4 text-gray-500 flex items-center justify-center text-sm ">
          {isSignUp ? (
            <>
              <p className="mr-2">Already have account?</p>
              <button
                onClick={() => setIsSignUp(false)}
                className="text-pink-500 font-bold text-sm"
              >
                Login
              </button>
            </>
          ) : (
            <>
              <p className="mr-2">Don't have account?</p>
              <button
                onClick={() => setIsSignUp(true)}
                className="text-pink-500 font-bold text-sm"
              >
                Register
              </button>
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default Auth;
