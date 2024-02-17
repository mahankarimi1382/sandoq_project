import '@/styles/globals.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners'
import Eeror from './Eeror';
import Sucses from './Sucses';
function Loading() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const handleOnline = () => {
      toast.dismiss()
    };

    const handleOffline = () => {
      showToast()
    };

    // Listener‌ها را اضافه کنید
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Listener‌ها را در هنگام Cleanup حذف کنید
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  const showToast = () => {
    toast.error('اینترنت شما متصل نیست', {
      position: "top-right",
      autoClose: false, // مشخص کردن اینکه toast به طور خودکار بسته نشود
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      theme: "colored",

    });
  };
  useEffect(() => {
    const handleStart = (url: any) => (url !== router.pathname) && setLoading(true)
    const handleComplete = (url: any) => {
      setTimeout(() => {
        setLoading(false)
      }, 1500)
    }
    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleComplete)
    router.events.on("routeChangeError", handleComplete)


    return () => {
      router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeComplete", handleComplete)
      router.events.off("routeChangeError", handleComplete)
    }
  }, [])
  return loading && (
    <div className=' fixed flex items-center justify-center w-full bg-opacity-50 bg-gray-500 h-full z-20 '>
      <HashLoader size={100} color='blue' />
    </div>)
}
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Loading />
      <Component {...pageProps} />
      <ToastContainer />
    </>)
}
