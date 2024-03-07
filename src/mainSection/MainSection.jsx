import React from 'react'
import {  useState} from 'react';
import OpenAI from "openai";
import { myTheme } from '../contant';
import ChatCell from '../chatCell/ChatCell';
import './mainSection.css'
const MainSection = () => {

   


    
    
  return (
         <div   style={{backgroundColor:myTheme.mainColor}} className=" flex-1 flex flex-col rounded-2xl p-10 py-4 mainSection ">
            {/* Header  */}
           <div  style={{height:48}} className=' flex items-center gap-4 mb-4'>
            <span className=' text-white font-extrabold text-2xl mr-4'>
                    Untitled
                </span>
            <div className=' pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" width={myTheme.iconSize} height={myTheme.iconSize} fill="white" className="bi bi-pen" viewBox="0 0 16 16">
            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
            </svg>
            </div>
            <div className=' pointer mr-auto'>
                        <svg xmlns="http://www.w3.org/2000/svg" width={myTheme.iconSize} height={myTheme.iconSize} fill="white" className="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
            </div>
            
            <div style={{backgroundColor:'rgba(255,255,255,0.11)'}} className='profile flex gap-2 items-center p-1 rounded-full'>
                    <div style={{width:40,height:40}} className="flex justify-center items-center" >
                    <svg xmlns="http://www.w3.org/2000/svg" width={myTheme.iconSize} height={myTheme.iconSize} fill="white" className="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                    </svg>
                    </div>

                    <div style={{width:40,height:40}} className="rounded-full overflow-hidden">
                        <img  style={{width:'100%', display:'block', height:'auto'}} src="https://myprofilepicture-leoyang.s3.us-east-2.amazonaws.com/profileImage.jpg" alt="" />
                    </div>

            </div>
           </div>
           <div  className=' container' >
            <ChatCell/>
           </div>
        </div>
  )
}

export default MainSection
