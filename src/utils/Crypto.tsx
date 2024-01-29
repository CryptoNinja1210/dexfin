// import { NextPage } from 'next'
// import Link from 'next/link'
'use client'
import { SetStateAction, createContext, useEffect, useState } from 'react'

type CryptoContext = {currency: string, setCurrency: React.Dispatch<React.SetStateAction<string>>, symbol: string}

export const Crypto = createContext<CryptoContext>({
  currency: 'USD',
  setCurrency: function (value: SetStateAction<string>): void {
    throw new Error('Function not implemented.')
  },
  symbol: '$'
})

export const metadata = {
  title: 'Crypto Trend',
  description: 'Crypto trending page',
}

interface MyPageProps {
  children: React.ReactNode,
}

const CryptoContext = (props: MyPageProps) => {

  const [currency, setCurrency] = useState("USD");
  const [ symbol, setSymbol] = useState("$");

  useEffect(() => {
      if (currency === "INR") setSymbol("₹");
      else if (currency === "USD") setSymbol("$");
  },[currency])


return (
  <Crypto.Provider value={{currency, setCurrency, symbol}}>
    {props.children}
  </Crypto.Provider>
)
}

export default CryptoContext;