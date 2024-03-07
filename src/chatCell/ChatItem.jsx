import React, { useState } from 'react'
import { useEffect } from 'react'
import { myTheme } from '../contant'

const ChatItem = ({Role, content, updateDisplayContent}) => {
    

    
    
    const ifUser = Role == 'user'
    const [displayedContent, setDisplayedContent] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    
  
    useEffect(() => {
      const typingSpeed = 50; // Adjust typing speed as needed
      let currentIndex = 0;
  
      const intervalId = setInterval(() => {

        const randomIncrement = Math.floor(Math.random() * 10) + 1;
        setDisplayedContent((prevContent) => {
          if (currentIndex <= content.length) {
            currentIndex += randomIncrement;
            currentIndex = currentIndex > content.length ? content.length : currentIndex

            //update displayContent to keep it scroll to the Bottom
            
            return content.slice(0, currentIndex);
          } else {
            clearInterval(intervalId);
            setIsTyping(false);
            return content;
          }
        });

        
      }, typingSpeed);
  
      return () => clearInterval(intervalId); // Cleanup interval on component unmount
  
    }, [content]);

    useEffect(() => {
        updateDisplayContent()
    }, [displayedContent])
    
    
    const renderFormattedContent = (text) => {
        const boldRegex = /\*\*(.*?)\*\*/g;
        const parts = text.split(boldRegex);
    
        return parts.map((part, index) => {
          if (index % 2 === 1) {
            // Odd indices represent the bold text
            return <strong key={index}>{part}</strong>;
          } else {
            return <span key={index}>{part}</span>;
          }
        });
      };

  return (
    <>
        {!ifUser ? (
            <div className='text-white flex w-full justify-start gap-4'>
            <div style={{width:30,height:30}} className="rounded-full overflow-hidden">
                <img style={{width:'100%', display:'block', height:'auto'}} src="https://avatars.githubusercontent.com/u/114549091?v=4" alt="" />
            </div>
            <div style={{maxWidth:"85%", backgroundColor:myTheme.messageColor}} className=' chatItem  rounded-xl px-4 py-3'>
                
                {
                    isTyping ? (
                <span className=' text-md'>
                        {displayedContent.split('\n').map((item, idx)=>(
                            <span
                                key={idx}
                            >
                                {item}
                                <br/>
                            </span>
                        ))}
                </span>
                    ):(
                        <span className=' text-md'>
                 {content}
                </span>
                    )
                }
            </div>
        </div>
        ):(
            <div className='text-white flex w-full justify-end gap-4'>
        <div style={{maxWidth:"85%", backgroundColor:myTheme.messageColor}} className=' chatItem rounded-xl px-4 py-3'>
            <span className=' text-md'>
                {content}
            </span>
        </div>
        <div style={{width:30,height:30}} className=" rounded-full overflow-hidden">
            <img style={{width:'100%', display:'block', height:'auto'}} src="https://myprofilepicture-leoyang.s3.us-east-2.amazonaws.com/profileImage.jpg" alt="" />
        </div>
    </div>
        )
    }
    </>
  )
}

export default ChatItem