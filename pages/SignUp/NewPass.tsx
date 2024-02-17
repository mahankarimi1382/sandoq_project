import React, { useState } from 'react'
import logo from "../../public/logo.png"
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import { SyncLoader } from 'react-spinners'
import Eeror from '../Eeror'
import Warning from '@/pages/Warning'
import { ToastContainer } from 'react-toastify'
function NewPass() {

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const [password, setPassword] = useState("")
    const [stats, setStats] = useState(Number)
    const [password_confirmation, setPassword_confirmation] = useState("")

    return (
        <div dir='rtl' className=' w-full h-screen flex justify-center items-center'>

            <div className={` border-2 rounded-xl border-[#00008B] w-[513px] m-auto h-[305px] p-3 `}>
                <div className=' w-5/6 m-auto flex justify-center flex-col'>
                    <div className='flex items-center text-[16px] font-semibold justify-center gap-2'>
                        <span>صندوق قرض الحسنه امین</span>
                        <Image src={logo} width={45} height={22} alt='' />

                    </div>
                    <div className='flex flex-col mt-4 gap-3'>
                        <span className=' text-[16px] font-semibold '>لطفا اطلاعات خواسته شده را وارد کنید</span>
                        <input type='password' onChange={(e) => { setPassword(e.target.value) }} placeholder='رمز عبور جدید' className=' h-[48px] p-3 border-[1.5px] rounded-xl border-[#00008B]' />
                        <input type='password' onChange={(e) => { setPassword_confirmation(e.target.value) }} placeholder='تکرار رمز عبور' className='h-[48px] p-3 border-[1.5px] rounded-xl border-[#00008B]' />
                        <button onClick={() => {
                            if (password !== password_confirmation) {
                                Warning("رمز عبور و تکرار آن باید یکی باشد")
                            } else if (password.length !== 6) {
                                Warning("پسوورد باید 6 رقم باشد")
                            } else {
                                localStorage.setItem("password", password)
                                router.push("/Information")
                            }
                        }
                        } className='h-[48px] text-white rounded-xl bg-[#00008B] flex items-center text-[20px] font-semibold justify-center'
                        >{isLoading ? (<SyncLoader color='white' size={8} />
                        ) : ("ثبت")}</button>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>

    )
}

export default NewPass