import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import logo from "../../public/logo.png"
import UploadIcon from "../../public/UploadIcon.png"
import Modal from '../components/Modals/Modal'
import axios from 'axios'
import { SyncLoader } from 'react-spinners'
import Warning from '../Warning'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Eror from '../Eeror'
function SendSms() {
    const [val, setVal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isDisable, setIsDisable] = useState(true)
    const [phone_number, setPhone_number] = useState("")
    const [seconds, setSeconds] = useState(0);
    const [classNameVal, setClassNameVal] = useState(true)
    useEffect(() => {

        if (phone_number !== "") {
            setIsDisable(false)
            localStorage.setItem("phoneNumber", phone_number)
        }
    }, [phone_number])

    const fetchData = () => {
        setIsLoading(true)
        axios.post(
            "https://familybank.v1r.ir/api/Auth/sendVerificationCode",
            {
                phone_number: phone_number
            }
        ).then(res => {
            setVal(true)
            setIsLoading(false)
            console.log(res)
        }).catch(err => {
            setIsLoading(false)
            Eror()
            console.log(err)
        })
    }


    return (
        <div dir='rtl' className=' w-full h-screen flex justify-center items-center'>

            <div className={` border-2 rounded-xl border-[#00008B] w-[513px] m-auto h-[225px] p-3 `}>
                <div className=' w-5/6 m-auto flex justify-center flex-col'>
                    <div className='flex items-center text-[16px] font-semibold justify-center gap-2'>
                        <span>صندوق قرض الحسنه امین</span>
                        <Image src={logo} width={45} height={22} alt='' />

                    </div>
                    <div className='flex flex-col mt-4 gap-3'>
                        <span className=' text-[16px] font-semibold '>لطفا اطلاعات خواسته شده را وارد کنید</span>
                        <input type='number' onChange={(e) => { setPhone_number(e.target.value) }} placeholder='شماره موبایل' className='h-[48px] p-3 border-[1.6px] rounded-xl border-[#00008B] placeholder:font-medium placeholder:text-[#5C5C5C] placeholder:text-[16px]' />
                        <button disabled={isDisable} className='h-[48px] text-white rounded-xl bg-[#00008B] flex items-center text-[20px] font-semibold justify-center' onClick={() => {
                            if (phone_number.length !== 11) {
                                console.log("first")
                                Warning("شماره تلفن باید 11 رقم باشد")
                            } else {
                                fetchData()
                                setSeconds(120)
                                setClassNameVal(true)
                                localStorage.setItem("phone_number", phone_number)
                            }
                        }} >
                            {isLoading ? (<SyncLoader color='white' size={8} />
                            ) : ("ثبت")}</button>
                        <Modal isLoading={isLoading} setIsLoading={setIsLoading} classNameVal={classNameVal} setClassNameVal={setClassNameVal} seconds={seconds} setSeconds={setSeconds} phone_number={phone_number} setVal={setVal} val={val} />
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>)
}

export default SendSms