
import { useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUi from '../components/RateLimitedUi'
import { useEffect } from 'react'
import axios from 'axios'
import toast from "react-hot-toast"
import NoteCard from '../components/NoteCard'
import api from '../lib/axios'
import NotesNotFound from '../components/NotesNotFound'

const HomePage = () => {

  const [isRateLimited, setIsRateLimited] = useState(true)
  const [notes, setNotes] = useState([]);
  const [loading,setloading] = useState(true);
   useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes")
        console.log(res.data)
        setNotes(res.data)
        setIsRateLimited(false)
      } catch (error) {
        console.log("Error fetching notes");
        if(error.response.status === 429) {
          setIsRateLimited(true)
        }else {
          toast.error("failed to load notes")
        }
      } finally {
        setloading(false)
      }
    }

    fetchNotes()
  }, []) 
  return (
    <div className='min-h-screen'>
         <Navbar/>

         {isRateLimited && <RateLimitedUi/>}
           {notes.length === 0 && !isRateLimited && <NotesNotFound />}
         <div className='max-w-7xl mx-auto p-4 mt-6'>
          {true && <div className='text-center text-primary py-10'>Loading notes...</div>}

          {notes.length > 0 && (
            <div className='grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {notes.map((note) =>(
                <NoteCard key={note._id} note={note} setNotes={setNotes}/>
              ))}
            </div>
          )}
         </div>
    </div>
  )
}

export default HomePage