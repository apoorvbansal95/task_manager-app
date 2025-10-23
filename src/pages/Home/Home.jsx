import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import {MdAdd} from "react-icons/md"
import moment from "moment"
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import Toast from '../../components/ToastMessage/Toast'
import EmptyCard from '../../components/EmptyCard/EmptyCard'

export default function Home() {


  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null
  })

  const onClose = () => {        // for closing the modal using x button
    setOpenAddEditModal({
      isShown: false,
      type: "add",
      data: null
    })
  }

  const [showToastMsg, setShowToastMsg]= useState({
    isShown:false, 
    type:"add", 
    message:null
  })

  const [ allNotes, setAllNotes]= useState([])
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate()
//*****************************************/
// HandleEdit
const handleEdit=async(noteDetails)=>{
setOpenAddEditModal({isShown:true, data:noteDetails, type:"edit"})
}


//***********************************************/
//handle close toast
const handleCloseToast=()=>{
  setShowToastMsg({
    isShown:false, 
    message:""
  })
}


//*******************************************/
const showToastMessage=(message, type)=>{
setShowToastMsg({
  isShown:true, 
  message, 
  type
})
}

  //*******//
  //Get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user")
      if (response.data && response.data.user) {
        setUserInfo(response.data.user)
      }


    } catch (err) {
      if (err.response.status === 401) {
        localStorage.clear()
        navigate("/login")
      }
    }
  }





  useEffect(()=>{
    getAllNotes()
    getUserInfo()
    return ()=>{

    }
  }, [])



  //Get all notes 
  const getAllNotes=async()=>{
    try{
      const response= await axiosInstance.get("/get-all-notes")
      if (response.data && response.data.allNotes){
        setAllNotes(response.data.allNotes)
      }

    }catch(err){
      console.log("An unexpected error occur")
    }
  }

//Delete task
const deleteNote=async(noteData)=>{
  const noteId = noteData._id
   try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);
      if (response.data && !response.data.error) {
        showToastMessage("Note deleted successfully")
        getAllNotes();
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        console.log("An unexpected error occur")
      }
    }
}



  return (
    <>
      <Navbar userInfo={userInfo}/>

      <div className='container mx-auto'>
       {allNotes.length>0? <div className='grid grid-cols-3 gap-4 mt-8 '>
          {allNotes.map((item, index) => (
            <NoteCard
              key={item._id}
              title={item.title}
              date={moment(item.createdOn).format('Do MMM YYYY')}
              content={item.content}
              tags={item.tags}
              isPinned={item.isPinned}
              onEdit={() => handleEdit(item)}
              onDelete={() => deleteNote(item)}
              onPinNote={() => { }}
            />
          ))}
        
        </div>:<EmptyCard/>}
      </div>

      <button className='w-16 h-16 flex items-center justify-center bg-blue-300 hover:bg-blue-600 absolute right-10 bottom-10' 
        onClick={()=>{
          setOpenAddEditModal({
            isShown:true,
            type:"add", 
            data:null
          })
        }}>
        <MdAdd className="text-[32px] text-white"/>
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => { }}
        style={{ overlay: { backgroundColor: "rgba(0, 0, 0,0.2)" } }}
        contentLabel=""
        className=" w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 ">
        <AddEditNotes  type={openAddEditModal.type} noteData={openAddEditModal.data}  onClose={onClose} getAllNotes={getAllNotes} showToastMessage={showToastMessage}/>
      </Modal>

        <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
        />

        </>
  )
}
