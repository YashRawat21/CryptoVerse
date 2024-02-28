import React from 'react'
import { Link } from 'react-router-dom'
import { FaEthereum } from "react-icons/fa";

const Header = () => {
  return (
    <div className='flex items-center justify-evenly'>
      <div className='flex items-center'>
        <h1 className='text-2xl font-extrabold'>CrytpoVerse</h1>
        <FaEthereum className='text-orange-500  text-2xl'/>
      </div>
      <ul className='flex'>
        <li className='ml-[15rem] text-white font-bold'><Link to= "/">Home</Link></li>
        <li><Link className='ml-[15rem] text-white font-bold' to= "/coins">Coins</Link></li>
      </ul>
    </div>
  )
}

export default Header