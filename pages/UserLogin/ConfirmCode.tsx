import React from 'react'
import Link from "next/link"
import logo from "../../public/logo.png"

import Image from "next/image"
function ConfirmCode() {
  return  (
    <div>
        <div role="dialog" aria-modal="true">

            <div className="fixed inset-0 bg-white"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full justify-center p-4 sm:items-center sm:p-0">

                    <div dir="rtl" className=" border-2 border-[#00008B] w-[513px] relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white w-[513px] h-[281px] px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex flex-col gap-5">
                            <div className='flex items-center justify-center gap-2'>
                                <span>صندوق قرض الحسنه امین</span>
                                <Image src={logo} width={45} height={22} alt='' />
                            </div>
                            <div dir="rtl" className="flex gap-3 flex-col">
                                <span className=" text-[18px]">کد تایید را وارد کنید</span>
                                <span className=" text-[14px] text-[#434343]">کد تایید چهار رقمی به شماره 09305485308 ارسال شد</span>
                                <div className="flex gap-2 items-center justify-center">
                                    <input className=" border-2 border-x-0 border-t-0 border-black w-[36px]" />
                                    <input className=" border-2 border-x-0 border-t-0 border-black w-[36px]" />
                                    <input className=" border-2 border-x-0 border-t-0 border-black w-[36px]" />
                                    <input className=" border-2 border-x-0 border-t-0 border-black w-[36px]" />
                                    <input className=" border-2 border-x-0 border-t-0 border-black w-[36px]" />
                                    <input className=" border-2 border-x-0 border-t-0 border-black w-[36px]" />
                                </div>
                            </div>
                            <Link href="/SignUp/NewPass" type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-[#00008B] text-white px-3 py-2 text-sm font-semibold  shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto">ثبت</Link>
                            <div className="flex justify-between">
                                <Link href="/UserLogin/ForgetPass" className="text-[14px] text-[#00008B]">تغییر شماره موبایل</Link>
                                <span className="text-[14px]">ارسال دوباره پیامک</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ConfirmCode