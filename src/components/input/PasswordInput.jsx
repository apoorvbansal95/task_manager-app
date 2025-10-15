import React, { useState } from 'react'
import {FaRegEye , FaRegEyeSlash} from "react-icons/fa6"
export default function PasswordInput({value, onChange, placeholder}) {
  const[isShowPassword, setisShowPassword]= useState(false)
  const toggleShowPassword=()=>{
    setisShowPassword(!isShowPassword)
  }
  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 mb-3'>
      <input value={value}
      className='w-full text-sm bg-transparent py-3 mr-3'
      onChange={onChange}
      placeholder={placeholder|| 'password'}
      type={isShowPassword?'text':'password'}
      />
      {isShowPassword?<FaRegEye size={22} className="text-primary cursor-pointer" onClick={()=>toggleShowPassword()}/>:
        <FaRegEyeSlash size={22} className="text-primary cursor-pointer" onClick={()=>toggleShowPassword()} />}
    </div>
  )
}
