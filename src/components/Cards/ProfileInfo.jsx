import React from 'react'
import { getInitials } from '../../utils/helper'

export default function ProfileInfo({onLogout}) {
  return (
    <div  className=' flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center justify-center text-slate-950 bg-slate-100'> 
            {getInitials("Apoorv Bansal")}
             </div>
            <div className=''>
                <p className='text-sm font-medium'>Apoorv </p>
                <button className='text-sm text-slate-700 underline' onClick={onLogout}> Logout</button>
            </div>

    </div>
  )
}
