//@ts-nocheck
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { SyncLoader } from 'react-spinners'
import moment from 'moment-jalaali';
import { IoIosArrowDown } from "react-icons/io";
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import Sucses from '../../Sucses';

function ModalSaagg({ modalVal, fullName, loanId, setModalVal }: any) {
    const [loanDetails, setLoanDetails] = useState({})
    useEffect(() => {
        axios.get(`https://familybank.v1r.ir/api/user/loan/displayLoanInformation/${loanId}`
        ).then((res) => {
            console.log(res.data)
            setLoanDetails(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [loanId])
    console.log(modalVal)
    const [status, setStatus] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [date_of_loan, setDate_of_loan] = useState("")
    const [count, setCount] = useState()
    const fetchData = () => {
        setIsLoading(true)
        axios.put(`https://familybank.v1r.ir/api/loan/update_status_loan/${loanId}`, {
            status,
        }).then((res) => {
            Sucses()
            setModalVal(false)
            setIsLoading(false)
            console.log(res)
        }).catch((err) => {
            setIsLoading(false)
            console.log(err)
        })
    }
    return (
        <div>
            {modalVal ? <div role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div onClick={() => setModalVal(false)} className=" fixed inset-0 z-10 flex items-center justify-center w-screen overflow-y-auto">
                    <div onClick={(e) => e.stopPropagation()} className=' w-[1092px] flex flex-col items-center rounded-sm h-full bg-gray-200'>
                        <h1 className=' text-[16px] font-semibold'>در خواست وام {fullName} </h1>
                        <div className='flex gap-4 justify-center'>
                            <div className=' flex flex-col gap-3'>
                                <span className=' text-[18px] font-medium'>عنوان</span>
                                <span className=' p-2 w-[430px] flex items-center h-[40px] rounded-lg bg-white' >{loanDetails.title}</span>
                                <span className=' text-[18px] font-medium'>مبلغ وام</span>
                                <span className=' p-2 w-[430px] flex items-center h-[40px] rounded-lg bg-white' >{loanDetails.price}</span>
                            </div>
                            <div className=' flex flex-col gap-3'>
                                <span className=' text-[18px] font-medium'>توضیحات</span>
                                <span className='w-[560px] flex items-start p-2 h-[128px] rounded-lg bg-white' >{loanDetails.description}</span>
                            </div>
                        </div>
                        <div className=' p-5 flex w-full flex-col gap-4 items-center justify-center'>
                            <h1 className=' text-[16px] font-semibold'>پاسخ مدیر صندوق </h1>
                            <div className='flex gap-4 w-full'>
                                <input onChange={(e) => {
                                    console.log(e.target.checked)
                                    if (e.target.checked === true) {
                                        setStatus("accept")
                                    }
                                }} className=' h-6 w-6' type='checkbox' />
                                <span>موافقت</span>
                                <input onChange={(e) => {
                                    console.log(e.target.checked)
                                    if (e.target.checked === true) {
                                        setStatus("reject")
                                    }
                                }} className=' h-6 w-6' type='checkbox' />
                                <span>رد درخواست</span>
                            </div>
                            <div className=' flex w-full gap-4'>
                                <DatePicker
                                    onChange={(e) => {
                                        console.log(`${e.year}-${e.month.number}-${e.year}`)
                                        setDate_of_loan(moment(`${e.year}-${e.month.number}-${e.day}`, 'jYYYY-jMM-jDD').format('YYYY-MM-DD'))
                                    }}
                                    calendar={persian}
                                    locale={persian_fa}
                                    inputClass=' bg-white placeholder:text-[16px] placeholder:text-black placeholder:font-medium  px-3 flex justify-between rounded-lg bg-gray-200 items-center w-[295px] h-[35px] '
                                    placeholder='تاریخ ایجاداعلان'
                                    calendarPosition='bottom'
                                />
                                <input onChange={(e) => {
                                    setCount(e.target.value)
                                }} placeholder='میزان اقساط' className=' bg-white placeholder:text-[16px] placeholder:text-gray-400 placeholder:font-medium  px-3 flex justify-between rounded-lg items-center w-[295px] h-[35px] ' />
                            </div>
                            <button className='h-[48px] mt-8 text-white w-[80%] rounded-xl bg-[#00008B] flex items-center text-[20px] font-semibold justify-center'

                                onClick={() => {
                                    fetchData()
                                }} >
                                {isLoading ? (<SyncLoader color='white' size={8} />
                                ) : ("ثبت")}

                            </button>
                        </div>
                    </div>
                </div>
            </div> : null}
        </div>
    )
}

export default ModalSaagg