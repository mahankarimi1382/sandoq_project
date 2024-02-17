// 'use client'
import Link from "next/link"
import logo from "../../../../public/logo.png"

import Image from "next/image"
import axios from "axios"
import { useState } from "react"
import { SyncLoader } from "react-spinners"
import { useRouter } from "next/router"
function Modal2({ setShebaNum,
    shebaNum,
    setKart_number,
    kart_number,
    setBank_account_number,
    bank_account_number, setClassNameVal2, val2, setVal2 }: any) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const fetchData = () => {
        const token = localStorage.getItem("Token")
        setIsLoading(true)
        console.log({
            sheba_number: shebaNum,
            kart_number,
            bank_account_number
        })
        axios.post(
            `https://familybank.v1r.ir/api/user/bank/add_Bank_account`,
            {
                sheba_number: shebaNum,
                kart_number,
                bank_account_number
            },
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        ).then(res => {
            router.reload()
            setIsLoading(false)
            console.log(res)
        }).catch(err => {
            setIsLoading(false)
            console.log(err)
        })
    }
    console.log(val2)
    return (
        <div>
            {val2 ? <div role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full justify-center p-4 sm:items-center sm:p-0">

                        <div dir="rtl" className=" w-[738px] h-[447px] overflow-hidden rounded-lg bg-white shadow-xl transition-all">
                            <div className="flex flex-col p-4 gap-3 ">
                                <span className=" text-[#1E2022] font-normal text-[18px]">اطلاعات حساب جدید را وارد کنید تا جایگزین حساب قبلی شما گردد</span>
                                <span className=" text-[#FF3D3D] text-[14px] font-normal">حساب ثبت شده باید به نام شخص صاحب حساب در صندوق باشد در غیر این صورت امکان دریافت وام یا
                                    <br />
                                    برداشت پول خود را نخواهید داشت.</span>
                                <span className=" text-[16px] font-medium">حساب بانکی</span>
                                <input onChange={(e) => { setBank_account_number(e.target.value) }} className=" border-[1px] flex items-center w-[332px] h-[40px] text-[18px] text-[#1E2022] font-light rounded-lg pr-4" />
                                <span className=" text-[16px] font-medium">شماره کارت</span>
                                <input onChange={(e) => { setKart_number(e.target.value) }} className=" border-[1px] flex items-center w-[332px] h-[40px] text-[18px] text-[#1E2022] font-light rounded-lg pr-4" />
                                <span className=" text-[16px] font-medium">شماره شبا</span>
                                <div className="flex">
                                    <input onChange={(e) => { setShebaNum(e.target.value) }} className=" border-[1px] flex items-center w-[332px] h-[40px] text-[18px] text-[#1E2022] font-light rounded-lg pr-4" />
                                    <span className=' w-[44px] h-[40px] font-medium text-[22px] rounded-xl border-[1px] flex items-center justify-center'>IR</span>
                                </div>
                                <div className="flex w-full items-center justify-center">
                                    <button onClick={() => {
                                        fetchData()
                                    }} className=" w-[316px] h-[41px] text-[#00008B] border-2 border-[#00008B] rounded-lg">{isLoading ? (<SyncLoader color='blue' size={8} />
                                    ) : ("ثبت")}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : null}
        </div>
    )
}

export default Modal2