import Link from "next/link"

import Image from "next/image"
import axios from "axios"
import { useState } from "react"
import { HashLoader, SyncLoader } from "react-spinners"
import Warning from "@/pages/Warning"
import Sucses from "@/pages/Sucses"
import Eeror from "@/pages/Eeror"
import { ToastContainer } from "react-toastify"

function Modal3({ val3, setVal3 }: any) {
    const [isLoading, setIsLoading] = useState(false)
    const [current_password, setCurrent_password] = useState("")
    const [new_password, setNew_password] = useState("")
    const [new_password_confirmation, setNew_password_confirmation] = useState("")
    const fetchData = () => {
        const token = localStorage.getItem("Token")
        setIsLoading(true)
        if (new_password_confirmation === new_password) {
            axios.post(
                `https://familybank.v1r.ir/api/user/user/change_password`,
                {
                    current_password,
                    new_password,
                    new_password_confirmation,
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            ).then(res => {
                Sucses("رمز عبور با موفقیت تغییر کرد")
                setTimeout(() => {
                    setVal3(false)
                }, 3000)
                setIsLoading(false)
                console.log(res)
            }).catch(err => {
                console.log(err)

                if (err.message === "Network Error") {
                    Eeror("خطای اتصال")
                } else if (err.response.data.error) {
                    console.log("first")
                    Warning("رمز عبور صحیح نیست")
                    setIsLoading(false)
                } else if (err.response.data.message) {
                    console.log("first")
                    Warning("رمز عبور باید حداقل دارای 6 کاراکتر باشد")
                    setIsLoading(false)
                } else {
                    Eeror()
                    setIsLoading(false)
                }

            })
        } else {
            Warning("رمز عبور و تکرار آن باید یکی باشد")
            setIsLoading(false)
        }

    }
    return (
        <div>
            {val3 ? <div onClick={() => { setVal3(false) }} role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full justify-center p-4 sm:items-center sm:p-0">

                        <div onClick={(e) => e.stopPropagation()} dir="rtl" className=" flex items-center justify-center flex-col w-[465px] h-[382px] overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                            <div className=" flex flex-col gap-3">
                                <span className=" font-medium font-yekanbakh text-[14px] text-[#2A2A2A]">رمز عبور قبلی خود را وارد کنید</span>
                                <input onChange={(e) => { setCurrent_password(e.target.value) }} className=" w-[316px] h-[40px] rounded-lg border-[1px] border-gray-300 text-[14px] flex items-center pr-3 font-normal text-[#6A6A6A]" />
                                <span dir="ltr" className=" font-light text-[#5C5C5C] text-[10px]">رمز عبور خود را فراموش کردم</span>
                                <span className=" font-medium font-yekanbakh text-[14px] text-[#2A2A2A]">رمز عبور جدید خود را وارد کنید</span>
                                <input onChange={(e) => { setNew_password(e.target.value) }} className=" w-[316px] h-[40px] rounded-lg border-[1px] border-gray-300 text-[14px] flex items-center pr-3 font-normal text-[#6A6A6A]" />
                                <span className=" font-medium font-yekanbakh text-[14px] text-[#2A2A2A]">تکرار رمز عبور</span>
                                <input onChange={(e) => { setNew_password_confirmation(e.target.value) }} className=" w-[316px] h-[40px] rounded-lg border-[1px] border-gray-300 text-[14px] flex items-center pr-3 font-normal text-[#6A6A6A]" />
                                <button onClick={() => fetchData()} className="w-[316px] h-[41px] rounded-lg border-[1.5px] flex items-center bg-[#00008B] justify-center text-[16px] font-medium text-white border-[#00008B]">
                                    {isLoading ? (<SyncLoader  size={8} color="white" />) : ("ثبت")}
                                </button>
                            </div>
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </div> : null}
        </div>
    )
}

export default Modal3