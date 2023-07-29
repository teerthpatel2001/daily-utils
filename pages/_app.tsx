import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import { useLayoutEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {

  useLayoutEffect(() => {
    const theme = localStorage.getItem("data-theme");
    if (theme) {
      document.getElementsByTagName("html")[0].setAttribute("data-theme", theme);
    } else {
      localStorage.setItem("data-theme", "synthwave")
      document.getElementsByTagName("html")[0].setAttribute("data-theme", "synthwave");
    }
  }, [])

  return <div className='h-screen  w-screen flex flex-col content-between items-center bg-base-100 text-base-content'><Navbar /><Component {...pageProps} /></div>
}

export default MyApp
