import Navbar from '@/components/Nav'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import React from 'react'
interface UserTypes {
  email?: string
  firstName?: string
  gender?: string
  id?: number
  image?: string
  lastName?: string
  token?: string
  username?: string
}
interface AuthTypes {
  user: UserTypes
  token: string,
  isAuthenticate: boolean
}
export default function App({ Component, pageProps }: AppProps) {
  const [products, setProducts] = React.useState([]);
  const [isAuthenticate, setIsAuthenticate] = React.useState(false);
  const [auth, setAuth] = React.useState<AuthTypes>({
    user: {
    },
    token: "",
    isAuthenticate: false
  })
  const router = useRouter();
  React.useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
      })
    let user: any = localStorage.getItem("auth");
    let token: any = localStorage.getItem("token");

    if (user != null) {
      user = JSON.parse(user)
    }
    if (Object.keys(user).length > 0) {
      setIsAuthenticate(true)
      setAuth({
        user: user,
        token,
        isAuthenticate: true
      })
      // console.log(auth)
    }
  }, [router.query])

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("token")
    setIsAuthenticate(false)
  }
  return (
    <>
      <Navbar authenticate={isAuthenticate} auth={auth} logout={logout} products={products} />
      <Component {...pageProps} auth={auth} authenticate={isAuthenticate} products={products} />
    </>

  )
}
