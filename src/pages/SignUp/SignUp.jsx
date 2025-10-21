import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PasswordInput from '../../components/input/PasswordInput'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
export default function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const navigate= useNavigate()


  const handleSignup = async (e) => {
    e.preventDefault()

    if(!name){
      setError("Please enter your name")
      return 
    }

    if (!validateEmail(email)){
      setError("please enter a valid mail")
      return 
    }

     if (!password) {
      setError("Please type the password")
      return
    }
    setError("")


    //API call for SignUP
    try{
    
      const response= await axiosInstance.post("/create-account", {
        fullName:name,
        email:email, 
        password:password
      })
      
      if(response.data && response.data.error){
        setError(response.data.message)
      }
      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken)
        navigate("/dashboard")
      }
    }
    catch(err){
      if(err.response && err.response.data && err.response.data.message){
        setError(err.response.data.message)
      }
      else{
        setError("An unexpected error, please try again later")
      }
    }

  }
  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border bg-white px-7 py-10'>
          <form onSubmit={handleSignup}>
            <h4 className='text-2xl mb-7'>Create Account</h4>
            <input type='text' placeholder='Email' className='input-box' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type='text' placeholder='Name' className='input-box' value={name} onChange={(e) => setName(e.target.value)} />


            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

            <button type='submit' className='btn-primary'> SignUP </button>

            <p className='text-sm text-center mt-4'>
              Already registered?{" "}
              <Link to="/login" className='font-medium text-blue-500 underline'> Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
