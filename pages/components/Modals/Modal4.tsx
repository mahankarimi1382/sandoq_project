//@ts-nocheck
import React, { useEffect, useState } from 'react'
import uploadIcon from "../../../public/UploadIcon.png"
import Image from 'next/image'
import axios from 'axios'
import { SyncLoader } from 'react-spinners'
import moment from 'moment-jalaali';
import { IoIosArrowDown } from "react-icons/io";
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

function Modal4({ modalVal, setModalVal }: any) {
    const [imgUrl, setImgUrl] = useState()
    const [dateJalali, setDateJalali] = useState()
    console.log("hgjhghjghjghj", dateJalali)
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState(null)
    console.log(image)
    const [price, setprice] = useState("")
    const [tracking_code, setTracking_code] = useState("")
 
    console.log()
    const fetchData = () => {
        setIsLoading(true)
        const token = localStorage.getItem("Token")
        const date = moment(dateJalali, 'jYYYY-jMM-jDD').format('YYYY-MM-DD')
        console.log({
            image,
            price,
            date,
            tracking_code
        },)
        axios.post(
            `https://familybank.v1r.ir/api/user/transaction/Bank_receipt_photo`,
            {
                image,
                price,
                date,
                tracking_code
            },
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            }

        ).then(res => {
            setModalVal(false)
            setIsLoading(false)
            console.log(res)
        }).catch(err => {
            setIsLoading(false)
            console.log(err)
        })
    }

    return (
        <div>
            {modalVal ? <div role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div onClick={() => setModalVal(false)} className=" fixed inset-0 z-10 flex items-center justify-center w-screen overflow-y-auto">
                    <div onClick={(e) => e.stopPropagation()} className=' w-[624px]  rounded-sm h-[652px] bg-white'>
                        <div className=' flex items-center justify-center h-[338px] rounded-sm bg-gray-200 '>
                            {imgUrl ? (<div>
                                <Image src={imgUrl} width={280} height={210} alt='' />
                            </div>) : (<div>
                                <label className=' flex flex-col justify-center items-center border-dashed rounded-md border-[#3B82F6] border-2 w-[280px] h-[213.75px]'>
                                    <input onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            let img = e.target.files[0]
                                            setImage(img)
                                            setImgUrl(URL.createObjectURL(img))
                                        }
                                        // console.log(e.target.value)
                                        // setImage(e.target.files[0])
                                        // setImgUrl(e.target.value)

                                    }} hidden type='file' />
                                    <Image width={70} src={uploadIcon} alt='' />
                                    <span className=' text-gray-800 text-[16px] font-medium'>فایل خود را اینجا بارگزاری نمایید </span>
                                    <span className=' text-gray-400 text-[14px] font-medium'>حجم فایل حداکثر پنج مگابایت باشد</span>
                                </label>
                            </div>)}

                        </div>
                        <div className=' flex gap-4 mt-6 flex-col items-center justify-center'>
                            <div className='flex justify-center gap-5'>
                                <input onChange={(e) => { setprice(e.target.value) }} placeholder='مبلغ را وارد کنید' className='  placeholder:text-gray-700 placeholder:text-[14px] placeholder:font-medium bg-slate-200 w-[231px] h-[36px] p-3 rounded-lg' />
                                <DatePicker
                                    onChange={(e) => {
                                        console.log(e.day)
                                        console.log(e.month.number)
                                        console.log(e.year)
                                        setDateJalali(`${e.year}-${e.month.number}-${e.day}`)
                                    }}
                                    calendar={persian}
                                    locale={persian_fa}
                                    inputClass='placeholder:text-gray-700 flex items-center bg-slate-200 w-[231px] text-[14px] font-medium h-[36px] text-gray-700 p-3 rounded-lg'
                                    placeholder='تاریخ را انتخاب کنید'
                                    calendarPosition='bottom'
                                />
                            </div>

                            <div className='flex justify-center gap-5'>
                                <input onChange={(e) => { setTracking_code(e.target.value) }} placeholder='کد پیگیری را وارد کنید' className='  placeholder:text-gray-700 placeholder:text-[14px] placeholder:font-medium bg-slate-200 w-[231px] h-[36px] p-3 rounded-lg' />
                                <input placeholder='قسط ماهیانه ی صندوق' className='  placeholder:text-gray-500 placeholder:text-[14px] placeholder:font-medium bg-slate-200 w-[231px] h-[36px] p-3 rounded-lg' />
                            </div>
                            <input placeholder='توضیحات خود را وارد کنید' className=' placeholder:text-gray-700 p-3 pb-[70px] placeholder:text-[14px] placeholder:font-medium rounded-lg bg-slate-200  w-[478px] h-[93px]' />
                            <button className='h-[48px] w-[80%] text-white rounded-xl bg-[#00008B] flex items-center text-[20px] font-semibold justify-center'

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

export default Modal4