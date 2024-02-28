import React, { useEffect, useState } from 'react'
import { coinData } from '../utilities/api'

const Coins = () => {
  const [coins , setCoins] = useState()
  const [loading , setLoading] = useState(true)
   const getCoinData = async() => {
    const data = await fetch(`${coinData}/markets?vs_currency=inr`);
    const coinsData =  await data.json()
    setCoins(coinsData)
   }
   useEffect(() => {
    getCoinData()
   },[])
  return (
    <div>Coins</div>
  )
}

export default Coins