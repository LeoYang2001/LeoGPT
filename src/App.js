import logo from './logo.svg';
import './App.css';
import MainSection from './mainSection/MainSection';
import SideTab from './sideTab/SideTab';



function App() {
  
  return (
    <div style={{ backgroundColor: "#000" , height:"100vh"}} className='flex w-full gap-6 p-6 homeScreen'>
    <SideTab/>
    <MainSection/>
  </div>
  
  );
}

export default App;
