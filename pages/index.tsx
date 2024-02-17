import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from './components/Landing/Navbar'
import LandingPic from './components/Landing/LandingPic'
import Main from './components/Landing/Main'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='' dir='rtl'>
      <Navbar />
      <LandingPic />
      <Main />
    </div>
  )
}
