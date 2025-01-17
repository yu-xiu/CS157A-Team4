import React, { useState } from "react";
import api from '../../backend/backend';

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function checkInvalidForms(){
    if(email == ""){
      setError("Please enter an email.")
      return true
    }else if(password == ""){
      setError("Please enter a password.")
      return true
    }
    return false
  }

function handleSubmit(event) {
  event.preventDefault();
  setError("");
  const user = {
    email : email,
    password: password,
  }

  // Checks forms for valid input
  if(checkInvalidForms())
    return

  // CHECKS EMAIL
  fetch(api + "/login/checkemail", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  }).then(response => {
    response.json().then((info) => {
      if(info["error"]){
        setError(info["message"]);
        console.log(info);
      }
      else{
        console.log(info);
        console.log("Stringified: == " + JSON.stringify(info))
        
        // CHECKS PASSWORD 
        fetch(api + "/login/checkpassword", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user)
        }).then(response => {
          response.json().then((info) => {
            if(info["error"]){
              setError(info["message"]);
              
            }else{
             
              // GETS USER INFO
              fetch(api + "/login/getinfo", {
                method: "POST",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
              }).then(response => {
                response.json().then((info) => {
                  if(info["error"]){
                    setError(info["message"]);
                    console.log(info);
                  }else{
                    window.localStorage.setItem('id', info.data[0].iduser);
                    window.localStorage.setItem('user', info.data[0].firstname);
                    window.localStorage.setItem('loggedIn', true);
                    props.history.push('/');
                  }
                })
            })
          }})
        })
      }
    });
  })
}
    
  return (
    
    <div className="flex text-center justify-center w-full items-center h-full px-4 ">
      <div className="w-full max-w-md items-center">
      
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <label className="block font-bold font-sans-pro text-grey-700 text-2xl rounded font-bold md:text-center mb-8 pr-4" for="inline-full-name">Login</label>
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
                placeholder="Email" />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="md:block hidden font-bold font-sans-pro text-grey-darker text-xl rounded font-bold md:text-left mb-1 md:mb-0 pr-4"
                for="inline-full-name">Password</label>
            </div>
            {/*  PASSWORD  */}
            <div className="md:w-2/3">
              < input className="shadow appearance-none border border-blue-new rounded w-full py-3 px-4 text-gray-700 text-xl font-sans-pro font-bold leading-tight "
                id="password"
                type="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                required
                placeholder="Password" />
            </div>

          </div>
          <div className="h-4">
            {error.length !== 0 &&

            <p className="text-red-400 font-bold">{error}</p>
            }
                        </div>
          {/*  BUTTONS  */}
          <div className="flex items-center justify-between mt-8">
            <button className="bg-bookie-grey hover:bg-bookie-grey-light text-white text-xl font-bold py-2 px-4 rounded"
              type="button"
              onClick={handleSubmit}>
              Sign In
              </button>
            <a className="inline-block align-baseline font-bold text-md text-blue-500 hover:text-blue-800" href="/forget">
              Forgot Password?
              </a>
          </div>
        </form>

      </div>
    </div>
  )
}