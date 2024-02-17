//@ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import PenIcon from "../../../public/PenIcon.png"
import UploadIcon from "../../../public/UploadIcon.png"
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/router'
import { SyncLoader } from 'react-spinners'
import Sucses from '@/pages/Sucses'
import Eeror from '@/pages/Eeror'
import Warning from '@/pages/Warning'
import { ToastContainer } from 'react-toastify'
function Information() {
    const [imgUrl, setImgUrl] = useState()
    const [phone_number, setPhone_number] = useState("")
    const [arrrrr, setArrrrr] = useState([])
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const [name, setName] = useState()
    const [family, setFamily] = useState("")
    const [img, setImg] = useState("")
    const [father_name, setFather_name] = useState()
    const [national_id, setNational_id] = useState()
    const [val, setVal] = useState(true)

    useEffect(() => {
        if (img) {
            const src = URL.createObjectURL(img);
            setImgUrl(src);
        }

    }, [img])
    useEffect(() => {
        setPhone_number(localStorage.getItem("phone_number"))
        setPassword(localStorage.getItem("password"))
        setArrrrr(JSON.parse(localStorage.getItem("UserData")))
        setFamily(arrrrr.family)
        setName(arrrrr.name)
        setFather_name(arrrrr.father_name)
        setNational_id(arrrrr.national_id)
    }, [img])
    const ref = useRef()
    const ref2 = useRef()
    const ref3 = useRef()
    const ref4 = useRef()
    const fetchData = () => {
        console.log({
            name: name,
            family: family,
            father_name: father_name,
            national_id: national_id,
            img: img,
            password: password,
            phone_number: phone_number
        })
        setIsLoading(true)
        axios.post(
            `https://familybank.v1r.ir/api/Auth/store`,
            {
                name: name,
                family: family,
                father_name: father_name,
                national_id: national_id,
                img: img,
                password: password,
                phone_number: phone_number
            }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        ).then(res => {
            Sucses()
            setIsLoading(false)
            localStorage.setItem("Token", res.data.token)
            console.log(res)
            router.push("/User")
        }).catch(err => {
            console.log(err)
            if (err.code === "ERR_NETWORK") {
                Eeror()
                setIsLoading(false)
            } else if (err.response.data.errors && err.response.data.errors.national_id) {
                Warning("این کد ملی قبلا استفاده شده است")
                setIsLoading(false)
            }
            else if (err.response.data.errors.phone_number) {
                Warning("این شماره دارای حساب کاربری است مجددا ثبت نام کنید")
                setIsLoading(false)
                // router.push("/SignUp")
            }
            else {
                Eeror()
                setIsLoading(false)
            }

        })
    }

    return (
        <div dir='rtl' className=' w-full h-screen flex justify-center items-center'>
            <div className=' w-[782px] h-[550px] bg-[#FBFBFB] flex flex-col p-2'>
                <div className='flex justify-center'>
                    <span className=' text-[16px] font-semibold text-[#AF1616]'>نام،نام خانوادگی،نام پدر و کد ملی بعد ثبت قابل تغییر نمیباشد لذا از صحت اطلاعات ورودی اطمینان حاصل کنید</span>
                </div>
                <div className='flex justify-between'>
                    <div className='flex flex-col gap-4'>
                        <span className=' font-medium text-[16px]'>نام</span>
                        <div className='flex items-center gap-2'>
                            <Image onClick={() => {
                                setVal(false)
                                ref.current.focus()
                            }} src={PenIcon} alt='' />
                            <input onChange={(e) => { setName(e.target.value) }} ref={ref} value={val ? arrrrr.name : null} className='text-[16px] font-normal flex items-center gap-2 w-[312px] h-[36px] bg-white' />
                        </div>
                        <span className=' font-medium text-[16px]'>نام خانوادگی</span>
                        <div className='flex items-center gap-2'>
                            <Image onClick={() => {
                                setVal(false)
                                ref2.current.focus()
                            }} src={PenIcon} alt='' />
                            <input onChange={(e) => { setFamily(e.target.value) }} ref={ref2} value={val ? arrrrr.family : null} className='text-[16px] font-normal flex items-center gap-2 w-[312px] h-[36px] bg-white' />
                        </div>

                        {imgUrl ? (
                            <div className=' flex flex-col justify-center items-center'>
                                <Image alt='' width={200} height={100} src={imgUrl} />
                                <button className=' mt-1 rounded-lg bg-[#00008B] text-white p-1' onClick={() => {
                                    setImg()
                                    setImgUrl()
                                }}>تغییر عکس</button>
                            </div>

                        ) : (<div>
                            <span className=' text-[14px] text-[#5C5C5C] font-medium'>تصویر کارت ملی خود را ارسال کنید</span>
                            <label className=' rounded-lg w-3/4 h-[120px] border-[#00008B] border-[1px] border-dashed flex justify-center items-center flex-col'>
                                <input onChange={(e: any) => {
                                    setImg(e.target.files[0])
                                }} className='hidden' type='file' />
                                <Image src={UploadIcon} alt='' />
                                <span>فایل خود را اینجا قراردهید</span>
                                <span className=' font-medium text-[10px] text-[#9CA3AF]'>حجم فایل حداکثر پنج مگابایت باشد</span>
                            </label>
                            <span className=' text-[12px] font-medium text-[#AF1616]'>در صورت عدم وجود کارت ملی تصویر صفحه اول شناسنامه خود را ارسال نمایید</span></div>)}
                    </div>
                    <div className='flex flex-col gap-4 '>
                        <span className=' font-medium text-[16px]'>نام پدر</span>
                        <div className='flex items-center gap-2'>
                            <Image onClick={() => {
                                setVal(false)
                                ref3.current.focus()
                            }} src={PenIcon} alt='' />
                            <input onChange={(e) => { setFather_name(e.target.value) }} ref={ref3} value={val ? arrrrr.father_name : null} className='text-[16px] font-normal flex items-center gap-2 w-[312px] h-[36px] bg-white' />
                        </div>
                        <span className=' font-medium text-[16px]'>کد ملی</span>
                        <div className='flex items-center gap-2'>
                            <Image onClick={() => {
                                setVal(false)
                                ref4.current.focus()
                            }} src={PenIcon} alt='' />
                            <input onChange={(e) => {
                                console.log(e.target.value)
                                setNational_id(e.target.value)
                            }} ref={ref4} value={val ? arrrrr.national_id : null} className='text-[16px] font-normal flex items-center gap-2 w-[312px] h-[36px] bg-white' />
                        </div>
                    </div>

                </div>
                <button onClick={() => {
                    if (img) {
                        fetchData()
                    } else {
                        Warning("عکس شناسنامه یا کارت ملی خود را آپلود کنید")
                    }
                }} className='text-[20px] font-semibold flex items-center justify-center w-[433px] m-auto h-[48px] mt-7 text-white rounded-xl bg-[#00008B]'>{isLoading ? (<SyncLoader color='white' size={8} />
                ) : ("ثبت")}</button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Information