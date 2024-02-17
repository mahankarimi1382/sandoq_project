//@ts-nocheck
import Menu from '@/pages/components/Menue/Menu'
import UserNav from '@/pages/components/UserComponent/dashbord/UserNav'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import penIcon from "../../../public/PenIcon.png"
import UserINformationPic from "../../../public/UserInformationPic.png"
import Modal2 from '@/pages/components/Modals/Modal2'
import Modal3 from '@/pages/components/Modals/Modal3'
import axios from 'axios'
import { LuPictureInPicture } from "react-icons/lu";

import { HashLoader, SyncLoader } from 'react-spinners'
import Sucses from '@/pages/Sucses'
import { useRouter } from 'next/router'
function index() {
    const [buttVal, setButtVal] = useState(false)
    const [bank_account, setBank_account] = useState({})
    const [imageLoading, setImageLoading] = useState(false)
    const [valll, setValll] = useState(false)
    const [imgUrl, setImgUrl] = useState()
    const [profileImage, setProfileImage] = useState("")
    const [changeImg, setChangeImg] = useState(false)
    const [arrrrr, setArrrrr] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [shebaNum, setShebaNum] = useState("")
    const [kart_number, setKart_number] = useState("")
    const [bank_account_number, setBank_account_number] = useState("")
    const [val, setVal] = useState(true)
    const [input1Val, setInput1Val] = useState("")
    const [input2Val, setInput2Val] = useState("")
    const [input3Val, setInput3Val] = useState("")
    const [input4Val, setInput4Val] = useState("")
    const [input5Val, setInput5Val] = useState("")
    const [input6Val, setInput6Val] = useState("")
    const [val2, setVal2] = useState(false)
    const [val3, setVal3] = useState(false)
    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const input4Ref = useRef(null);
    const input5Ref = useRef(null);
    const input6Ref = useRef(null);
    const [email, setEmail] = useState("")
    const [emailLoading, setEmailLoading] = useState(false)
    const router = useRouter()
    useEffect(() => {
        setEmailLoading(true)

        const token = localStorage.getItem("Token")
        axios.get("http://familybank.v1r.ir/api/user/user/show_user_and_bank_info", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            if (res.data.user_profile) {
                setImgUrl(res.data.user_profile)
            }
            setEmailLoading(false)
            console.log(res)
            setArrrrr(res.data.user_info)
            console.log(res.data.user_bank_account)
            if (res.data.user_bank_account) {
                setInput1Val(res.data.user_bank_account.sheba_number.substring(0, 4))
                setInput2Val(res.data.user_bank_account.sheba_number.substring(4, 8))
                setInput3Val(res.data.user_bank_account.sheba_number.substring(8, 12))
                setInput4Val(res.data.user_bank_account.sheba_number.substring(12, 16))
                setInput5Val(res.data.user_bank_account.sheba_number.substring(16, 20))
                setInput6Val(res.data.user_bank_account.sheba_number.substring(20, 22))
                setBank_account(res.data.user_bank_account)
            }

        }).catch((err) => {
            console.log(err)
        })
    }, [])
    useEffect(() => {
        if (profileImage) {
            const src = URL.createObjectURL(profileImage);
            setImgUrl(src);
        }

    }, [profileImage])
    useEffect(() => {
        setShebaNum(input1Val +
            input2Val +
            input3Val +
            input4Val +
            input5Val +
            input6Val)
    }, [input6Val])
    const fetchData = () => {
        const token = localStorage.getItem("Token")
        console.log(token)
        setIsLoading(true)
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
            setIsLoading(false)
            console.log(res)
            router.reload()
        }).catch(err => {
            setIsLoading(false)
            console.log(err)
        })
    }
    const handleInputChange = (e: any, nextInputRef: any) => {
        if (e.target.value.length === 4) {
            nextInputRef.current.focus();
        }
    };
    const uploadImg = () => {
        const token = localStorage.getItem("Token")
        setImageLoading(true)
        axios.post(
            `https://familybank.v1r.ir/api/user/user/profile_for_user`,
            {
                profile: profileImage

            },
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            }
        ).then(res => {
            Sucses()
            setImageLoading(false)
            console.log(res)
            router.reload()
        }).catch(err => {
            setImageLoading(false)
            console.log(err)
        })
    }
    const fetchData2 = () => {
        setEmailLoading(true)
        const token = localStorage.getItem("Token")
        axios.post(
            `https://familybank.v1r.ir/api/user/user/Email_update_for_user`,
            {
                email
            },
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        ).then(res => {
            setEmailLoading(false)
            setClassNameVal2(true)
            setIsLoading(false)
            console.log(res)
            router.reload()
        }).catch(err => {
            setEmailLoading(false)
            setIsLoading(false)
            console.log(err)
        })
    }
    return (
        <div dir='rtl' className='flex'>
            <Modal3 val3={val3} setVal3={setVal3} />
            <Modal2 setShebaNum={setShebaNum} shebaNum={shebaNum} setKart_number={setKart_number} kart_number={kart_number} setBank_account_number={setBank_account_number} bank_account_number={bank_account_number} val2={val2} setVal2={setVal2} />
            <Menu />
            {arrrrr !== null &&
                <>
                    <div className=' w-full'>
                        <UserNav />
                        <div className=' w-5/6 m-auto mt-16 flex flex-col gap-6'>
                            <div className=' w-full h-[426px] bg-gray-100 flex'>
                                <div className=' w-2/3 flex flex-col gap-9 justify-center p-4'>
                                    <div className='flex justify-between'>
                                        <div className='flex flex-col gap-4'>
                                            <div className='flex flex-col'>
                                                <span>نام</span>
                                                <span className=' h-[40px] rounded-lg w-[332px] flex items-center text-[#6A6A6A] bg-white pr-3'>{arrrrr.name}</span>
                                            </div>
                                            <div className='flex flex-col'>
                                                <span>کد ملی</span>
                                                <span className=' h-[40px] rounded-lg flex items-center text-[#6A6A6A] w-[332px] bg-white pr-3'>{arrrrr.national_id}</span>
                                            </div>
                                            <div className='flex flex-col'>
                                                <span>شماره موبایل</span>
                                                <span className='h-[40px] rounded-lg w-[332px] gap-2 flex text-[#6A6A6A] items-center bg-white pr-3'>
                                                    <Image src={penIcon} alt='' />
                                                    {arrrrr.phone_number}
                                                </span>
                                            </div>
                                        </div>
                                        <div className=' flex flex-col gap-4'>
                                            <div className='flex flex-col'>
                                                <span>نام خانوادگی</span>
                                                <span className='h-[40px] rounded-lg w-[332px] flex items-center text-[#6A6A6A] bg-white pr-3'>{arrrrr.family}</span>
                                            </div>
                                            <div className='flex flex-col'>
                                                <span>نام پدر</span>
                                                <span className='h-[40px] rounded-lg w-[332px] flex items-center text-[#6A6A6A] bg-white pr-3'>{arrrrr.father_name}</span>
                                            </div>
                                            <div className='flex flex-col'>
                                                <span>ایمیل (اختیاری)</span>
                                                <div className='flex items-center gap-2'>
                                                    <label className='flex items-center  bg-white pr-3 gap-2 h-[40px] rounded-lg w-[332px]'>
                                                        <Image onClick={() => {
                                                            setVal(false)
                                                        }} src={penIcon} alt='' />
                                                        {arrrrr.email ? (<span className='text-[16px] font-normal w-full h-full   flex items-center text-[#6A6A6A]'>{arrrrr.email}</span>) : (<input onChange={(e) => {
                                                            setEmail(e.target.value)
                                                            setButtVal(true)
                                                        }} />)}
                                                        {buttVal && <button onClick={() => fetchData2()}>تایید</button>}
                                                    </label>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className=' bg-white rounded-xl'>
                                        <div className='flex flex-col gap-2 p-2'>
                                            <span className=' text-[14px] font-medium'>
                                                ایمیل مدیر صندوق به ادرسی که در ذیل اورده شده تنها به پیام‌های دریافتی از ایمیل‌های ثبت شده در حساب کاربری پاسخگوست. پاسخ به ایمیل شما ممکن است با تاخیر صورت گیرد، پیشاپیش از صبر و شکیبایی شما سپاس گزاریم.
                                            </span>
                                            <span dir='ltr' className=' text-[#00008B] underline'>
                                                masoudramezani2000h@gmail.com
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className=' w-1/3 flex justify-center'>
                                    <div className=' flex flex-col gap-3 mt-8'>
                                        {changeImg ? (<label className=' border-2 border-indigo-600 rounded-lg flex text-[#0000BF] justify-center items-center w-[150px] h-[191px] bg-gray-300' onMouseOut={() => { setChangeImg(false) }}>
                                            <h1 className=' text-sm font-semibold'>تغییر عکس</h1>
                                            <input onChange={(e) => {
                                                setProfileImage(e.target.files[0])
                                                setValll(true)
                                            }} hidden type='file' />
                                            <LuPictureInPicture />


                                        </label>) : (<div>
                                            {imgUrl ? (<div className=' flex flex-col justify-center items-center gap-2 w-[150px] h-[191px]'><img width={150} height={191} onMouseOver={() => { setChangeImg(true) }} src={imgUrl} alt='' />
                                            </div>
                                            ) : (<Image onMouseOver={() => { setChangeImg(true) }} src={UserINformationPic} alt='' />
                                            )}
                                        </div>)}
                                        {valll && <button onClick={() => { uploadImg() }} className=' border-2 border-[#0000BF] text-[#0000BF] rounded-xl text-[18px] p-1 font-medium'>{imageLoading ? (<SyncLoader color='#0000BF' size={8} />
                                        ) : ("ثبت")}</button>}
                                        <button onClick={() => setVal3(true)} className=' border-2 border-[#0000BF] text-[#0000BF] rounded-xl text-[18px] p-1 font-medium'>تغییر رمز عبور</button>
                                    </div>
                                </div>
                            </div>
                            <div className=' w-full mb-20 bg-gray-100 flex flex-col p-2'>
                                <div className=' flex p-5 flex-col '>
                                    {bank_account.kart_number !== undefined ? (<span className=' text-[16px] font-semibold text-[#00008B]'>حساب بانک ثبت شده ی شما</span>
                                    ) : (<span className=' text-[16px] font-semibold text-red-600' >اطلاعات حساب خود را ثبت کنید</span>
                                    )}
                                    <div className='flex'>
                                        <div className=' w-1/3 flex flex-col'>
                                            <div>
                                                <span className=' text-[16px] font-semibold'>حساب بانکی</span>
                                                {bank_account.kart_number === undefined ? (<input onChange={(e) => { setBank_account_number(e.target.value) }} className='h-[40px] rounded-lg text-[#6A6A6A] w-[332px] gap-2 flex items-center bg-white pr-3' />
                                                ) : (<span className='h-[40px] rounded-lg text-[#6A6A6A] w-[332px] gap-2 flex items-center bg-white pr-3' >{bank_account.bank_account_number}</span>
                                                )}
                                            </div>
                                            <div>
                                                <span className=' text-[16px] font-semibold'>شماره کارت</span>
                                                {bank_account.kart_number === undefined ? (<input onChange={(e) => { setKart_number(e.target.value) }} className='h-[40px] rounded-lg text-[#6A6A6A] w-[332px] gap-2 flex items-center bg-white pr-3' />
                                                ) : (<span className='h-[40px] rounded-lg text-[#6A6A6A] w-[332px] gap-2 flex items-center bg-white pr-3' >{bank_account.kart_number}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className=' w-2/3'>
                                            <div className=' flex flex-col items-center'>
                                                <div className=' flex w-5/6'>
                                                    <span className=' text-[16px] font-semibold'>شماره شبا</span>
                                                </div>
                                                <div dir='ltr' className='flex gap-1 justify-end'>
                                                    <span className=' w-[44px] h-[40px] font-medium text-[22px] rounded-xl bg-white flex items-center justify-center'>IR</span>
                                                    {bank_account.kart_number === undefined ? (<input onChange={(e) => {
                                                        setInput1Val(e.target.value)
                                                        handleInputChange(e, input2Ref)
                                                    }} ref={input1Ref} className=' w-[94px] h-[40px] rounded-xl font-light text-[18px] text-[#1E2022] bg-white flex items-center justify-center' />
                                                    ) : (<span className=' w-[94px] h-[40px] rounded-xl font-light text-[18px] text-[#1E2022] bg-white flex items-center justify-center' >{input1Val}</span>
                                                    )}
                                                    {bank_account.kart_number === undefined ? (<input onChange={(e) => {
                                                        setInput2Val(e.target.value)
                                                        handleInputChange(e, input3Ref)
                                                    }} ref={input2Ref} className=' w-[94px] h-[40px] rounded-xl font-light text-[18px] text-[#1E2022] bg-white flex items-center justify-center' />
                                                    ) : (<span className=' w-[94px] h-[40px] rounded-xl font-light text-[18px] text-[#1E2022] bg-white flex items-center justify-center' >{input2Val}</span>
                                                    )}
                                                    {bank_account.kart_number === undefined ? (<input onChange={(e) => {
                                                        setInput3Val(e.target.value)
                                                        handleInputChange(e, input4Ref)
                                                    }} ref={input3Ref} className=' w-[94px] h-[40px] rounded-xl font-light text-[18px] text-[#1E2022] bg-white flex items-center justify-center' />
                                                    ) : (<span className=' w-[94px] h-[40px] rounded-xl font-light text-[18px] text-[#1E2022] bg-white flex items-center justify-center' >{input3Val}</span>
                                                    )}
                                                    {bank_account.kart_number === undefined ? (<input onChange={(e) => {
                                                        setInput4Val(e.target.value)
                                                        handleInputChange(e, input5Ref)
                                                    }} ref={input4Ref} className=' w-[94px] h-[40px] rounded-xl font-light text-[18px] text-[#1E2022] bg-white flex items-center justify-center' />
                                                    ) : (<span className=' w-[94px] h-[40px] rounded-xl font-light text-[18px] text-[#1E2022] bg-white flex items-center justify-center' >{input4Val}</span>
                                                    )}
                                                    {bank_account.kart_number === undefined ? (<input onChange={(e) => {
                                                        setInput5Val(e.target.value)
                                                        handleInputChange(e, input6Ref)
                                                    }} ref={input5Ref} className=' w-[94px] h-[40px] rounded-xl font-light text-[18px] text-[#1E2022] bg-white flex items-center justify-center' />
                                                    ) : (<span className=' w-[94px] h-[40px] rounded-xl font-light text-[18px] text-[#1E2022] bg-white flex items-center justify-center' >{input5Val}</span>
                                                    )}
                                                    {bank_account.kart_number === undefined ? (<input ref={input6Ref} onChange={(e) => { setInput6Val(e.target.value) }} className=' w-[60px] h-[40px] rounded-xl font-light text-[18px] text-[#1E2022] bg-white flex items-center justify-center' />
                                                    ) : (<span ref={input6Ref} className=' w-[60px] h-[40px] rounded-xl font-light text-[18px] text-[#1E2022] bg-white flex items-center justify-center' >{input6Val}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex items-center justify-center'>
                                    {bank_account.kart_number ? (<button onClick={() => setVal2(true)} className=' bg-[#0000BF] text-white text-[16px] font-medium rounded-lg w-[333px] flex items-center justify-center h-[40px]'>تغییر حساب</button>) : (<button onClick={() => {

                                        fetchData()
                                    }} className=' bg-[#0000BF] text-white text-[16px] font-medium rounded-lg w-[333px] flex items-center justify-center h-[40px]'>{isLoading ? (<SyncLoader color='white' size={8} />
                                    ) : ("ثبت")}</button>
                                    )}

                                </div>
                                <div dir='ltr'>
                                    <span>
                                        آخرین بازدید: ساعت 16:00 1402/04/01
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </>
            }
            {emailLoading && (
                <div className=' fixed flex items-center justify-center w-full bg-opacity-50 bg-gray-500 h-full z-20 '>
                    <HashLoader size={100} color='blue' />
                </div>)}
        </div >
    )
}

export default index