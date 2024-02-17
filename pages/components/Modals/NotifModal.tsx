//@ts-nocheck
import React, { useState } from 'react'
import uploadIcon from "../../../public/UploadIcon.png"
import Image from 'next/image'
import axios from 'axios'
import { SyncLoader } from 'react-spinners'
import { IoIosArrowDown } from "react-icons/io";
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
function NotifModal({ notifModal, setNotifModal }: any) {
    const [isLoading, setIsLoading] = useState(false)
    const [isshowAllUsers, setIsShowAllUsers] = useState(false)
    const [allUsers, setAllUsers] = useState([])

    return (
        <div>
            {notifModal ? <div role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div onClick={() => setNotifModal(false)} className=" fixed inset-0 z-10 flex items-center justify-center w-screen overflow-y-auto">
                    <div onClick={(e) => e.stopPropagation()} className=' w-[502px] p-6 flex flex-col items-center  rounded-sm h-screen bg-white'>
                        <h1 className=' text-[18px] font-semibold'>ایجاد اعلان</h1>
                        <div className=' gap-5 flex flex-col w-full'>
                            <span className='text-[18px] font-medium'>عنوان پیام</span>
                            <input type='text' className=' rounded-lg bg-gray-200 w-[295px] h-[35px]' />
                            <span className=' absolute mt-[110px] mr-64 text-xl'><IoIosArrowDown /></span>
                            <DatePicker
                                calendar={persian}
                                locale={persian_fa}
                                inputClass=' placeholder:text-[16px] placeholder:text-black placeholder:font-medium  px-3 flex justify-between rounded-lg bg-gray-200 items-center w-[295px] h-[35px] '
                                placeholder='تاریخ ایجاداعلان'
                                calendarPosition='bottom'
                            />


                            <h1 className=' text-[16px] font-semibold'>متن پیام</h1>
                            <textarea className=' w-[441px] h-[310px] bg-gray-200' />
                            <div className='flex gap-2'>
                                <input className=' accent-emerald-600 w-[24px] h-[24px]' type='checkbox' />
                                <span className=' text-[16px] font-medium'>ارسال برای همه اعضا</span>
                            </div>
                            <div className='flex gap-2'>
                                <input onChange={(e) => { setIsShowAllUsers(e.target.value) }} className=' accent-emerald-600 w-[24px] h-[24px]' type='checkbox' />
                                <span className=' text-[16px] font-medium'>ارسال برای یک یا چند عضو</span>
                            </div>
                            {isshowAllUsers && <div>
                                {allUsers.map((item) => {
                                    return (
                                        <div></div>
                                    )
                                })}
                            </div>}
                            <button className='h-[48px] text-white rounded-xl bg-[#00008B] flex items-center text-[20px] font-semibold justify-center'>
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

export default NotifModal