import React from 'react'
import{LuCheck} from "react-icons/lu"
const Toast = ({isShown , message, type, onClose}) => {
  return (
    <div className={`absolute top-20 right-6 transition all duration-400 ${!isShown?"opacity-100":"opacity-0"}`}>
      <div className=''>
      <div className=' flex items-center gap-3 px-4'>
        <div className={`w-10 h-10 flex items-center justify-center rounded-full ${type=="delete?bg-red-50:bg-green-50"}`}>
        {<LuCheck className="text-xl text-green-500"/>}
          </div>

          <p className='text-sm text-slate-800'>Note added successfully</p>
      </div>
      </div>
    </div>
  )
}

export default Toast
