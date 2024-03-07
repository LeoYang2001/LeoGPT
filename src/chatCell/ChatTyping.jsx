import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { myTheme } from '../contant'

const ChatTyping = () => {

    const [index, setIndex] = useState(1);
    const typing = "..."
    useEffect(() => {
        const intervalId = setInterval(() => {
          // Increment index from 1 to 3 and loop back to 1
          setIndex((prevIndex) => (prevIndex % 3) + 1);
        }, 300); // Change the interval time as needed (in milliseconds)
    
        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
      }, []); // The empty dependency array ensures the effect runs only once on mount
    
  return (
    <div className='text-white flex w-full justify-start gap-4'>
            <div style={{width:30,height:30}} className="rounded-full overflow-hidden">
                <img style={{width:'100%', display:'block', height:'auto'}} src="https://avatars.githubusercontent.com/u/114549091?v=4" alt="" />
            </div>
            <div style={{maxWidth:"85%", backgroundColor: myTheme.messageColor}} className='chatItem  rounded-xl px-4 py-3'>
                <span className=' text-sm'>
                   {typing.slice(0,index)}
                </span>
            </div>
        </div>
  )
}

export default ChatTyping