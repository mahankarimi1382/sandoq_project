import React from 'react'
import logo from "../../public/logo.png"
import Image from 'next/image'
import Link from 'next/link'
function ForgetPass() {
    return (
        <div dir='rtl' className=' w-full h-screen flex justify-center items-center'>

            <div className={` border-2 rounded-xl border-[#00008B] w-[513px] m-auto h-[232px] p-3 `}>
                <div className=' w-5/6 m-auto flex justify-center flex-col'>
                    <div className='flex items-center text-[16px] font-semibold justify-center gap-2'>
                        <span>صندوق قرض الحسنه امین</span>
                        <Image src={logo} width={45} height={22} alt='' />

                    </div>
                    <div className='flex flex-col mt-4 gap-3'>
                        <span className=' text-[16px] font-semibold '>لطفا اطلاعات خواسته شده را وارد کنید</span>
                        <input placeholder='شماره موبایل خود را وارد کنید' className=' h-[48px] p-3 border-[1.5px] rounded-xl border-[#00008B]' />
                        <Link className='h-[48px] text-white rounded-xl bg-[#00008B] flex items-center text-[20px] font-semibold justify-center' href="/UserLogin/ConfirmCode" >ثبت</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPass