//@ts-nocheck
import Link from "next/link"
import logo from "../../../public/logo.png"
import { useRouter } from 'next/router'



import Image from "next/image"
import { useEffect, useState } from "react"
import React, { useRef } from 'react';
import axios from "axios";
import { SyncLoader } from "react-spinners"
import Sucses from "@/pages/Sucses"
import Error from "next/error"
import Eror from "@/pages/Eeror"

function Modal({ isLoading, setIsLoading, classNameVal, setClassNameVal, seconds, setSeconds, val, setVal, phone_number }: any) {
    const router = useRouter()

    const [isDisable, setIsDisable] = useState(true)
    const [href, setHref] = useState("")
    const [i1, setI1] = useState("")
    const [i2, setI2] = useState("")
    const [i3, setI3] = useState("")
    const [i4, setI4] = useState("")
    useEffect(() => {
        if (i4 !== "") {
            setIsDisable(false)
        }
    }, [i4])
    const fetchData2 = () => {
        const verification_cod = i1 + i2 + i3 + i4
        console.log({
            phone_number: phone_number,
            verification_cod: verification_cod
        })
        setIsLoading(true)
        axios.post(
            "https://familybank.v1r.ir/api/Auth/check",
            {
                phone_number: phone_number,
                verification_code: verification_cod
            }
        ).then(res => {
            setIsLoading(false)
            console.log(res)
            console.log(res.data.message)
            if (res.data.message === "کد تایید شد") {
                Sucses()
                router.push("NewPass")
            } else {
                Eror("کد اشتباه است")
            }
        }).catch(err => {
            setIsLoading(false)
            console.log(err)
        })
    }
    const fetchData = () => {

        axios.post(
            "https://familybank.v1r.ir/api/Auth/sendVerificationCode",
            {
                phone_number: phone_number
            }
        ).then(res => console.log(res)).catch(err => console.log(err))
    }
    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const input4Ref = useRef(null);
    const buttRef = useRef(null)
    const handleInputChange = (e: any, nextInputRef: any) => {

        if (e.target.value.length === 1) {
            nextInputRef.current.focus();
        }
    };
    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(prevSeconds => prevSeconds - 1);
                setClassNameVal(true)
            } else {
                setClassNameVal(false)
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [seconds]);

    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return (
        <div>
            {val ? <div role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div onClick={() => { setVal(false) }} className=" flex min-h-full justify-center p-4 sm:items-center sm:p-0">

                        <div dir="rtl" className=" w-[513px] h-[281px] overflow-hidden rounded-xl border-[1.5px] border-[#00008B] bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div onClick={(e) => e.stopPropagation()} className="bg-white w-[513px] h-[281px] px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex flex-col gap-5">
                                <div className='flex items-center justify-center gap-2'>
                                    <span className=" text-[16px] font-semibold">صندوق قرض الحسنه امین</span>
                                    <Image src={logo} width={45} height={22} alt='' />
                                </div>
                                <div dir="rtl" className="flex gap-3 flex-col">
                                    <span className=" text-[18px] font-semibold">کد تایید را وارد کنید</span>
                                    <span className=" text-[14px] font-medium text-[#434343]">کد تایید چهار رقمی به شماره {phone_number} ارسال شد</span>
                                    <div dir="ltr" className="flex gap-2 items-center justify-center">
                                        <input ref={input1Ref} onChange={(e) => {
                                            console.log("first")

                                            setI1(e.target.value)
                                            handleInputChange(e, input2Ref)
                                        }} className=" text-center border-2 border-x-0 border-t-0 border-black w-[36px]" />
                                        <input ref={input2Ref} onChange={(e) => {
                                            setI2(e.target.value)
                                            handleInputChange(e, input3Ref)
                                        }} className=" text-center border-2 border-x-0 border-t-0 border-black w-[36px]" />
                                        <input ref={input3Ref} onChange={(e) => {
                                            setI3(e.target.value)
                                            handleInputChange(e, input4Ref)
                                        }} className=" text-center border-2 border-x-0 border-t-0 border-black w-[36px]" />
                                        <input ref={input4Ref} onChange={(e) => {
                                            setI4(e.target.value)
                                            handleInputChange(e, buttRef)
                                        }} className=" text-center border-2 border-x-0 border-t-0 border-black w-[36px]" />
                                    </div>
                                </div>
                                <button disabled={isDisable} onClick={() => {

                                    fetchData2()


                                }} ref={buttRef}


                                    type="button" className=" mt-3 flex w-full justify-center items-center rounded-md bg-[#00008B] min-h-[48px] p-2 text-[20px] font-semibold text-white ">{isLoading ? (<SyncLoader color='white' size={8} />
                                    ) : ("ثبت")}</button >
                                <div className="flex -mt-3 justify-between">
                                    <button className="text-[14px] text-[#00008B]" onClick={() => setVal(false)}>تغییر شماره موبایل</button>
                                    {classNameVal ? (<span>{minutes.toString().padStart(2, '0')}:{remainingSeconds.toString().padStart(2, '0')}</span>
                                    ) : (<span onClick={() => {
                                        fetchData()
                                        setClassNameVal(true)
                                        setSeconds(120)
                                    }} className="text-[14px]">ارسال دوباره پیامک</span>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div> : null}
        </div>
    )
}

export default Modal