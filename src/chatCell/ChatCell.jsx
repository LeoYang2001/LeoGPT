import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { useState } from 'react';
import { myTheme } from '../contant';
import ChatItem from './ChatItem';
import OpenAI from "openai";
import ChatTyping from './ChatTyping';


const ChatCell = () => {

  

    // INPUT BOX SETTING 
    const MIN_TEXTAREA_HEIGHT = 20;
    const textareaRef = useRef(null);
    const [iconHeight, setIconHeight] = useState(0)
    const [inputText, setInputText] = useState('')
  
    useLayoutEffect(() => {
      // Reset height - important to shrink on delete
      textareaRef.current.style.height = "inherit";
      // Set height
        textareaRef.current.style.height = `${Math.max(
            textareaRef.current.scrollHeight,
            MIN_TEXTAREA_HEIGHT
          )}px`;
    }, [inputText]);

    useEffect(()=>{
        setIconHeight(textareaRef.current.clientHeight)
        initallySendingMessage()
    },[])
    // INPUT BOX SETTING 


    // API SETTING 
    const openai = new OpenAI(
        {
          apiKey: process.env.REACT_APP_API_KEY,
          dangerouslyAllowBrowser: true,
          
        }
      );

      

    
      const [messagePip, setMessagePip] = useState([
        {
          role:'system',
          content:"you are an assitant"// how we want chatgpt to talk
        }
      ])

    // API SETTING 

    // SECTION SETTING 

    const [chatWindowHeight, setChatWindowHeight] = useState(200)

    const sectionRef = useRef()
    useEffect(() => {
      setChatWindowHeight(sectionRef.current.clientHeight - 36)

    }, [])
    // useEffect(()=>{
    //     updateDisplayContent()
    // },[inputText])

    // SECTION SETTING 


  const [ifFocus, setIfFocus] = useState(true)
  const [isFetching, setIsFetching] = useState(false)


  const bottomRef = useRef(null);

  const updateDisplayContent = ()=>{
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    // Scroll to the bottom when the component mounts or when new messages are added
    updateDisplayContent()
  }, [messagePip]);


  const handleFocus = ()=>{
    setIfFocus(true)
  }

  const handleSendingMessage = (e) => {
    e.preventDefault();
    if(!inputText.trim())   return 

    const newMessage = {
      role:'user',
      content:inputText
    }
    //update message window
  
    //setRequest
   setTimeout(()=>{
    fetchResponse(newMessage)
   },10)
    setInputText("")

  }


  const initallySendingMessage = (e) => {
    
    console.log('initialMessage')
    const newMessage = {
      role:'user',
      content:'hi, there'
    }
    //update message window
  
    //setRequest
   setTimeout(()=>{
    fetchResponse(newMessage)
   },10)
    setInputText("")
  }
  

  const fetchResponse = async (newMessage)=>{

    setIsFetching(true)
    
    const updateMessagePip = [...messagePip,newMessage]

    setMessagePip([...messagePip, newMessage])

    const completion = await openai.chat.completions.create({
      messages: updateMessagePip,
      model: "gpt-3.5-turbo",
    });
    setIsFetching(false)
      setMessagePip([...updateMessagePip,
        {
          role:"assistant",
          content:completion.choices[0].message.content,
        }
      ]);
    }


  useEffect(() => {
    if (ifFocus) {
         textareaRef.current.focus();
      }
  }, [ifFocus]); 

  return (
    <div  className='w-full h-full relative '>
      <section  ref={sectionRef} className='flex flex-col  h-full chatWindow'>
        {/* MESSAGE WINDOW  */}
        <div style={{height:chatWindowHeight}} className=' flex flex-col gap-8  px-20 messageWindow overflow-y-scroll'>
        {
            messagePip.map((messageItem, index) => {
                if(index <= 1)  return
                if(index == messagePip.length - 1)
                {
                    return (
                        <ChatItem   updateDisplayContent={updateDisplayContent} ref={bottomRef} Role={messageItem.role} content={messageItem.content} />
                    )
                }
                else{
                    return <ChatItem updateDisplayContent={updateDisplayContent} Role={messageItem.role} content={messageItem.content} />
                }
            })
        }
        {isFetching && (
            <ChatTyping/>
        )}
        {/* always scroll to the bottom  */}
        <div ref={bottomRef}></div>
        </div>

        {/* INPUT BOX  */}
       <div 
        style={{maxHeight:200,
            backgroundColor: myTheme.mainColor }}
        className=' border mt-auto flex items-end mx-20 rounded-md inputBox self-center  overflow-y-scroll '>
        <textarea
        value={inputText} onChange={(e)=>{setInputText(e.currentTarget.value)}} onBlur={()=>{
            if(!inputText)  setIfFocus(false)
        }} onKeyDown={(e) => {if(e.key == 'Enter' && !e.shiftKey) handleSendingMessage(e)}}
        ref={textareaRef}
        rows={1}
        style={{
            minHeight: MIN_TEXTAREA_HEIGHT,
            maxHeight:200,
            resize: "none",
        }}
        className="  bg-transparent text-white  text-md outline-none pl-4 flex-1 py-2 placeholder-gray-500  overflow-scroll-y "
        placeholder='Send a message' 
        />
        <div style={{height:iconHeight }} onClick={handleSendingMessage} className="   pointer  flex justify-center items-center px-2" >
        <svg xmlns="http://www.w3.org/2000/svg" width={myTheme.iconSize} height={myTheme.iconSize} fill={inputText ? 'white' : "rgb(107,114,128)"} className="bi bi-send" viewBox="0 0 16 16">
        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
        </svg>
    </div>
       </div>
      </section>

    </div>
  );
};

export default ChatCell;



{/* <div style={{ backgroundColor: myTheme.mainColor }} className=' w-full  border inputBox  flex justify-center items-center'>
{
    ifFocus ? (
        <div style={{width:'80%',height:'70%', maxWidth: 650, backgroundColor: myTheme.messageColor}} className=' rounded-lg flex items-center justify-between'>
    <textarea  value={inputText} onChange={(e)=>{setInputText(e.currentTarget.value)}} onBlur={()=>{
        if(!inputText)  setIfFocus(false)
    }} ref={inputRef} onKeyDown={(e) => {if(e.key == 'Enter' && !e.shiftKey) handleSendingMessage()}}  placeholder='Send a message' type="text" className=' text-white bg-transparent outline-none placeholder-gray-500  flex-1 h-full pl-4'/>
     
    <span onClick={handleSendingMessage} className=" pointer mr-4" >
        <svg xmlns="http://www.w3.org/2000/svg" width={myTheme.iconSize} height={myTheme.iconSize} fill={inputText ? 'white' : "rgb(107,114,128)"} className="bi bi-send" viewBox="0 0 16 16">
        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
        </svg>
    </span>
</div>
    ):(
        <div onClick={handleFocus} style={{width:'80%',height:'70%', maxWidth: 650, backgroundColor: myTheme.messageColor}} className=' justify-center pointer rounded-lg flex items-center'>
            <span className=' sendMessage '>
                Send a message
            </span>
    </div>
    )
}

</div> */}