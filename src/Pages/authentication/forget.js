import React, { useState } from "react";
import api from '../../backend/backend';

export default function Forgot(props) {
  const [email, setEmail] = useState("");
  let [error, setError] = useState("");
  
  function handleSubmit(event) {
    event.preventDefault();
    if(email.replace(" ","") === ""){
      setError("No input found.");
      return;
    }
    const user = {
      email : email,
    }

    fetch(api + "/forgotpassword", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    }).then(response => {
      response.json().then((data) => {
        console.log("data!")
        console.log(data);
        if(!data["error"]){

          console.log(data["error"])
          console.log(data["message"])
          window.localStorage.setItem('passResetEmail', user.email);
          props.history.push('/enterResetCode');
        }
        else{
          setError(data["message"]);
        }

      });
    })
    
    
    
  }
    
  return (
    <div className="flex items-center justify-center w-full  h-full md:mt-0 ">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <label className="block font-bold font-sans-pro text-grey-700 text-2xl rounded font-bold text-center mb-6 pr-4" for="inline-full-name">Forgot password?</label>
          <label className="block justify-center flex font-sans-pro text-grey-darker text-l rounded md:text-left mb-6 pr-4" for="inline-full-name">Just enter your email and we'll send you a reset code.</label>
          <div className="md:flex md:items-center mb-8">
            <div className="md:w-1/3">
              <label className="md:block hidden font-bold font-sans-pro text-grey-darker text-xl rounded font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">Username</label>
            </div>
            {/*  EMAIL  */}
            <div className="md:w-2/3">
              < input className="shadow border border-blue-new appearance-none rounded w-full py-3 px-4 text-xl font-sans-pro font-bold text-gray-700 leading-tight"
                id="email"
                type="email"
                onChange={e => setEmail(e.target.value)}
                value={email}
                required
                placeholder="Enter your Email" />
            </div>
          </div>
          <div className="h-4">
            {error.length !== 0 &&

            <p className="text-red-400 font-bold">{error}</p>
            }
          </div>
          {/*  BUTTONS  */}
          <div className="flex items-center justify-between mt-8">
            <button className="bg-bookie-grey hover:bg-red text-white text-xl font-bold py-2 px-4 rounded"
              type="button"
              onClick={handleSubmit}>
              Send
              </button>
            <a className="inline-block align-baseline font-bold text-md text-blue-500 hover:text-blue-800" href="/login">
              Remembered?
              </a>
          </div>
        </form>

      </div>
    </div>
  )

}