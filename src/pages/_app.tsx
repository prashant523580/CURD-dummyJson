import Navbar from '@/components/Nav'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import React from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [products, setProducts] = React.useState([]);
  const [isAuthenticate, setIsAuthenticate] = React.useState(false);
  const router = useRouter();
  React.useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
      })
    let auth = localStorage.getItem("auth");

    if (auth != null) {
      auth = JSON.parse(auth)
    }
    if (auth) {
      setIsAuthenticate(true)
    }
    console.log(auth)
  }, [router.query])

  const logout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticate(false)
  }
  return (
    <>
      <Navbar authenticate={isAuthenticate} logout={logout} products={products} />
      <Component {...pageProps} authenticate={isAuthenticate} products={products} />
    </>

  )
}
