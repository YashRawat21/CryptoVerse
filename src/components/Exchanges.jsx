import React, { useEffect, useState } from 'react'
import Header from './Header'
import { coinData } from '../utilities/api'
import Loader from './Loader'

const Exchanges = () => {
      const [loading , setLoading] = useState(true)
      const [exchanges , setExchanges] = useState([])
     const fetchData = async() => {
      const data = await fetch(`${coinData}/exchanges`)
      const exchangeData = await data.json();
      setExchanges(exchangeData)
      setLoading(false)
     }
     console.log(exchanges)
     useEffect(() => {
         fetchData()
     },[])
  return (
    <div>
        {
          loading ? <Loader /> : <>
           <Header />
       <div>
        <div>
          <img />
        </div>
        <div>
          {/* name */}
        </div>
        <div>
          {/* rank */}
        </div>
       </div>
          </>
        }
    </div>
  )
}

export default Exchanges