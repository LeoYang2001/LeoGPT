import React, { useLayoutEffect, useState, useRef } from 'react';
import { myTheme } from '../contant';
import './sideTab.css'

const SideTab = () => {
   

  return (
    <div
      style={{
        width: '23%',
        background: `linear-gradient(to bottom, ${myTheme.mainColor}, ${myTheme.secondaryColor})`,
      }}
      className='flex bg-cyan-400 rounded-2xl  py-4 flex-col items-center sideTab'
    >
      <header style={{ width: '80%' }} className='text-center text-white font-bold text-wrap text-2xl sideTab-header'>
        Recent 
        <br />
        <span>Conversations </span>
      </header>
      
    </div>
  );
};

export default SideTab;
