import React, { useState } from 'react'
import {MdAdd, MdClose} from 'react-icons/md'
import AddEditNotes from '../../pages/Home/AddEditNotes'
export default function TagInputs({tags, setTags}) {
    const [inputTags , setInputTags]= useState("")

    const AddnewTag=()=>{
        if (inputTags.trim()!==""){
            setTags([...tags, inputTags.trim()])
            setInputTags("")
        }
    }

    const handleKeyDown=(e)=>{
        if (e.key==="Enter"){
            AddnewTag()
        }
    }

    const handleRemoveTag=(tagToRemove)=>{
        setTags(tags.filter((tag)=>tag!==tagToRemove))
    }
  return (
    <div>
       {tags&& <div className='flex items-center gap-2 flex-wrap mt-2'>
        {tags.map((tag, index)=>(
            <span key={index} className=' flex items-center gap-1 text-sm bg-slate-400'>
                #{tag}
                <button onClick={()=>{handleRemoveTag(tag)}}>
                    <MdClose/>
                </button>
            </span>
        ))}
        </div>}
        <div className='flex items-center gap-4 mt-3'>
            <input type='text' onChange={(e)=>{setInputTags(e.target.value)}}
            value={inputTags}
            className='text-sm bg-transparent border px-3 py-2'
            placeholder='Add tags..'
            onKeyDown={handleKeyDown}
            />
            <button className='w-8 h-8 flex items-center justify-center border border-blue-300 hover:bg-red-400'
            onClick={AddnewTag}
            >
                <MdAdd className='text-2xl text-blue-200 hover:text-black'/>
            </button>
        </div>

    </div>
  )
}
