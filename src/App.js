
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Exchanges from "./components/Exchanges";
import Coins from "./components/Coins";
import CoinDetails from "./components/CoinDetails"
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element= {<Exchanges/>}/>
        <Route path= "/coins" element = {<Coins/>} />
       <Route path = "/coindetail/:id" element = {<CoinDetails/>} />
      </Routes>
    </div>
  );
}

export default App;
