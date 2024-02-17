import React, { useEffect, useState } from 'react'
import logo from "../../public/logo.png"
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import { SyncLoader } from 'react-spinners'
import Eeror from '../Eeror'
import Sucses from '../Sucses'

function index() {
    const [isLoading, setIsLoading] = useState(false)
    const [phone_number, setPhone_number] = useState("")
    const [password, setPassword] = useState("")
    const [isDisable, setIsDisable] = useState(true)

    const router = useRouter()
    useEffect(() => {

        if (phone_number && password !== "") {
            setIsDisable(false)
        }
    }, [password])
    const fetchData = () => {
        setIsLoading(true)
        axios.post(
            `https://familybank.v1r.ir/api/Auth/login`,
            {
                phone_number,
                password
            },
        ).then(res => {
            localStorage.setItem("Token", res.data.token)
            setIsLoading(false)
            console.log(res)
            console.log(res.data.role[0])
            if(res.data.role[0]==="admin"){
                router.push("/Admin/UsersAcount")
            }else{
                router.push("/User")

            }
            Sucses("ورود با موفقیت انجام شد")
            setTimeout(() => {
                // console.log("first")
            }, 1500)
        }).catch(err => {
            Eeror()
            setIsLoading(false)
            console.log(err)
        })
    }









    return (
        <div dir='rtl' className=' w-full h-screen flex justify-center items-center'>

            <div className={` border-2 rounded-xl border-[#00008B] w-[513px] m-auto h-[336px] p-3 `}>
                <div className=' w-5/6 m-auto flex justify-center flex-col'>
                    <div className='flex items-center text-[16px] font-semibold justify-center gap-2'>
                        <span>صندوق قرض الحسنه امین</span>
                        <Image src={logo} width={45} height={22} alt='' />

                    </div>
                    <div className='flex flex-col mt-4 gap-3'>
                        <span className=' text-[16px] font-semibold '>لطفا اطلاعات خواسته شده را وارد کنید</span>
                        <input onChange={(e) => { setPhone_number(e.target.value) }} placeholder='شماره موبایل' className=' h-[48px] p-3 border-[1.5px] rounded-xl border-[#00008B]' />
                        <input type='password' onChange={(e) => { setPassword(e.target.value) }} placeholder='رمز عبور' className='h-[48px] p-3 border-[1.5px] rounded-xl border-[#00008B]' />
                        <button disabled={isDisable} onClick={() => { fetchData() }} className='h-[48px] text-white rounded-xl bg-[#00008B] flex items-center text-[20px] font-semibold justify-center' >{isLoading ? (<SyncLoader color='white' size={8} />
                        ) : ("ثبت")}</button>
                        <Link href="/UserLogin/ForgetPass">رمز عبور خود را فراموش کرده ام</Link>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default index