import React, { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import UserINformationPic from "../../../public/UserInformationPic.png"
import Image from "next/image"
import axios from "axios"
import { HashLoader } from "react-spinners"

function ShowUserModal({ val, setVal, userId }: any) {
    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo]: any = useState({})
    const [bank_account, setBank_account]: any = useState({})
    console.log(bank_account)
    const [nationalCardUrl, setNationalCardUrl] = useState("")
    const [profileImageUrl, setProfileImageUrl] = useState("")
    console.log(userInfo)
    useEffect(() => {
        setLoading(true)
        const token = localStorage.getItem("Token")

        axios.get(`http://familybank.v1r.ir/api/admin/show_user_and_bank_info_id/${userId}
        `, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then((res) => {
            setLoading(false)
            console.log(res.data)
            // if (res.data.find_user.media.length !== 0) {
            //     setProfileImageUrl(res.data.find_user.media[1].original_url)
            //     setNationalCardUrl(res.data.find_user.media[0].original_url)
            // } else {

            //     setProfileImageUrl("")
            //     setNationalCardUrl("")
            // }
            setProfileImageUrl(res.data.user_profile)
            setBank_account(res.data.user_bank_account)
            setUserInfo(res.data.user_info)
        }).catch((err) => {
            setLoading(false)
            console.log(err)
        })
    }, [userId])

    return (

        <div>


            {val ? <div onClick={() => { setVal(false) }} role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    {loading && (
                        <div className=' fixed flex items-center justify-center w-full bg-opacity-50 bg-gray-500 h-full z-20 '>
                            <HashLoader size={100} color='blue' />
                        </div>)}
                    <div className="flex min-h-full justify-center p-4 sm:items-center sm:p-0">

                        <div onClick={(e) => e.stopPropagation()} dir="rtl" className=" flex items-center justify-between py-7  flex-col w-[1162px] h-[720px] overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                            <div className=" p-5 rounded-lg justify-between bg-gray-100 w-[90%] h-[400px] flex">
                                <div className=" flex-col gap-2 flex ">
                                    <h1 className=" font-semibold text-[16px]">نام</h1>
                                    <div className=" flex items-center pr-2 text-[#6A6A6A] font-medium text-[16px] w-[330px] h-[40px] bg-white rounded-xl">{userInfo.name}</div>
                                    <h1 className=" font-semibold text-[16px]">کد ملی</h1>
                                    <div className=" flex items-center pr-2 text-[#6A6A6A] font-medium text-[16px] w-[330px] h-[40px] bg-white rounded-xl">{userInfo.national_id}</div>
                                    <h1 className=" font-semibold text-[16px]">کد کابری</h1>
                                    <div className=" flex items-center pr-2 text-[#6A6A6A] font-medium text-[16px] w-[330px] h-[40px] bg-white rounded-xl">مسعود</div>
                                    <div className="flex gap-5 items-center">
                                        <h1 className=" font-semibold text-[16px]">کارت ملی</h1>
                                        {nationalCardUrl ? (<img className=" h-24" width={200} src={nationalCardUrl}></img>) : (<label className=' rounded-lg w-3/4 h-[120px] border-[#00008B] border-[1px] border-dashed flex justify-center items-center flex-col'>
                                            عکس
                                        </label>)}

                                    </div>
                                </div>
                                <div className=" flex-col gap-2 flex ">
                                    <h1 className=" font-semibold text-[16px]">نام خانوادگی</h1>
                                    <div className=" flex items-center pr-2 text-[#6A6A6A] font-medium text-[16px] w-[330px] h-[40px] bg-white rounded-xl">{userInfo.family}</div>
                                    <h1 className=" font-semibold text-[16px]">نام پدر</h1>
                                    <div className=" flex items-center pr-2 text-[#6A6A6A] font-medium text-[16px] w-[330px] h-[40px] bg-white rounded-xl">{userInfo.father_name}</div>
                                    <h1 className=" font-semibold text-[16px]">شماره موبایل</h1>
                                    <div className=" flex items-center pr-2 text-[#6A6A6A] font-medium text-[16px] w-[330px] h-[40px] bg-white rounded-xl">{userInfo.phone_number}</div>
                                    <h1 className=" font-semibold text-[16px]">ایمیل</h1>
                                    <div className=" flex items-center pr-2 text-[#6A6A6A] font-medium text-[16px] w-[330px] h-[40px] bg-white rounded-xl">{userInfo.email}</div>
                                </div>
                                <div>
                                    {profileImageUrl ? (<img width={200} src={profileImageUrl} />) : (<Image src={UserINformationPic} alt='' />)}

                                </div>

                            </div>
                            <div className=' mt-8 rounded-lg mb-20 bg-gray-100 w-[90%] flex flex-col p-2'>
                                <div className=' flex p-5 flex-col '>
                                    <div className='flex gap-7'>
                                        <div className=' w-1/3 flex gap-3 flex-col'>
                                            <div>
                                                <span className=' text-[16px] font-semibold'>حساب بانکی</span>
                                                <span className='h-[40px] rounded-lg text-[#6A6A6A] w-[332px] gap-2 flex items-center bg-white pr-3' >
                                                    {bank_account.bank_account_number}
                                                </span>
                                            </div>
                                            <div>
                                                <span className=' text-[16px] font-semibold'>شماره کارت</span>
                                                <span className='h-[40px] rounded-lg text-[#6A6A6A] w-[332px] gap-2 flex items-center bg-white pr-3' >
                                                    {bank_account.kart_number}
                                                </span>
                                            </div>
                                        </div>
                                        <div className=' w-2/3'>
                                            <div className=' flex flex-col gap-3 items-start'>
                                                <div className=' flex w-5/6'>
                                                    <span className=' text-[16px] font-semibold'>شماره شبا</span>
                                                </div>
                                                <div dir='ltr' className='flex gap-1 -mt-3 justify-end'>
                                                    <span className=' w-[44px] h-[40px] font-medium text-[22px] rounded-xl bg-white flex items-center justify-center'>IR</span>
                                                    <span className=' w-[94px] h-[40px] rounded-xl font-light text-[18px] text-[#1E2022] bg-white flex items-center justify-center' >
                                                        {bank_account.sheba_number.substring(0, 4)}
                                                    </span>
                                                    <span className=' w-[94px] h-[40px] rounded-xl font-light text-[18px] text-[#1E2022] bg-white flex items-center justify-center' >
                                                        {bank_account.sheba_number.substring(4, 8)}

                                                    </span>
                                                    <span className=' w-[94px] h-[40px] rounded-xl font-light text-[18px] text-[#1E2022] bg-white flex items-center justify-center' >
                                                        {bank_account.sheba_number.substring(8, 12)}

                                                    </span>
                                                    <span className=' w-[94px] h-[40px] rounded-xl font-light text-[18px] text-[#1E2022] bg-white flex items-center justify-center' >
                                                        {bank_account.sheba_number.substring(12, 16)}

                                                    </span>
                                                    <span className=' w-[94px] h-[40px] rounded-xl font-light text-[18px] text-[#1E2022] bg-white flex items-center justify-center' >
                                                        {bank_account.sheba_number.substring(16, 20)}

                                                    </span>
                                                    <span className=' w-[60px] h-[40px] rounded-xl font-light text-[18px] text-[#1E2022] bg-white flex items-center justify-center' >
                                                        {bank_account.sheba_number.substring(20, 22)}

                                                    </span>
                                                </div>
                                                <div>
                                                    <span className=' text-[16px] font-semibold'>موجودی حساب</span>
                                                    <span className='h-[40px] rounded-lg text-[#6A6A6A] w-[596px] gap-2 flex items-center bg-white pr-3' ></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div dir='ltr'>
                                    <span>
                                        آخرین بازدید: ساعت 16:00 1402/04/01
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div> : null}
        </div>
    )
}

export default ShowUserModal