import React, { useState } from 'react'
import TagInputs from '../../components/input/TagInputs'
import {MdAdd, MdClose} from 'react-icons/md'
import axiosInstance from '../../utils/axiosInstance'

export default function AddEditNotes({noteData, type, onClose, getAllNotes}) {
  const [title, setTitle]= useState(noteData?.title ||"")
  const [content, setContent]=useState(noteData?.content ||"")
  const [tags, setTags]=useState(noteData?.tags||[])
  const [error, setError]= useState(null)

  //add note 
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags
      });
      if(response.data && response.data.note) {
        getAllNotes();
        onClose();
      }
    } catch(err) {
      if(err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to add note. Please try again.");
      }
    }
  }

  //Edit note
  const editNote = async () => {
    const noteId = noteData._id
    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags
      });
      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to add note. Please try again.");
      }
    }
  }


  const handleAddNote = () => {    // to add newly created task
    if (!title) {
      setError("Please add Title")
      return
    }
    if (!content) {
      setError("Please add the description")
      return
    }

    setError("")
    if (type === "edit") {
      editNote()
    }
    else {
      addNewNote()
    }
  }


  return (
    <div className='relative'>
        <button className='w-10 h-10 flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500' onClick={onClose}>
          <MdClose className='text-xl text-slate-900'/>
        </button>
 
      <div className='flex flex-col gap-2'>
        <label className='input-label'>
          Title
        </label>
        <input type='text' className='text-2xl text-slate-950 outline-none'
          placeholder='Go to Gym...'
          value={title}
          onChange={(e) => { setTitle(e.target.value) }}
        />
      </div>
      <div className='flex flex-col gap-2 mt-4'>
        <label className='input-label'> CONTENT</label>
        <textarea type='text' className='text-sm text-slate-950 outline-none bg-slate-50'
          placeholder='Content...'
          rows={10}
          value={content}
          onChange={(e) => { setContent(e.target.value) }}
        />
      </div>
      <div className='mt-3'>
        <label className='input-label'>
          TAGS
        </label>
        <TagInputs  tags={tags} setTags={setTags}/>
      </div>

      {error && <p className='text-red-500 text-xs'>{error} </p>}
      <button className='btn-primary font-medium mt-5 p-3' onClick={handleAddNote}>
        {type==="edit"?'UPDATE':'Add'}
      </button>
    </div>
  )
}
