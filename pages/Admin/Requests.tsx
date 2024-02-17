import React, { useEffect, useState } from 'react'
import UserNav from '../components/UserComponent/dashbord/UserNav';
import AdminMenu from '../components/Menue/AdminMenu';
import axios from 'axios';
function Requests() {
    const [listOfLoans,setListOfLoans]=useState([])
    useEffect(() => {
        const token = localStorage.getItem("Token")
        axios.get(`http://familybank.v1r.ir/api/user/loan/all_loans_for_user_status_Pending`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then((res) => {
            console.log(res.data)
            setListOfLoans(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <div dir='rtl' className='flex'>
            <AdminMenu />
            <div className=' w-full flex flex-col'>
                <UserNav />
                <div className=' w-5/6 mx-auto flex flex-col gap-2 mt-10'>
                    <div className=' text-[18px] font-semibold px-2 w-full flex justify-between items-center h-[48px] bg-gray-200'>
                        <span className=' w-[51px] flex items-center justify-center'>نام</span>
                        <span>نام خانوادگی</span>
                        <span>نام پدر</span>
                        <span className=' w-[89px] flex items-center justify-center'>کد ملی</span>
                        <span className=' w-[112px] flex items-center justify-center'>شماره تماس</span>
                        <span>وضعیت</span>
                        <span className=' w-[137px] flex items-center justify-center'></span>
                    </div>
                    <div>
                        {listOfLoans.map((item: any) => {
                            return (
                                <div key={item.id} className=' text-[18px] font-medium px-2 flex w-full h-[48px] odd:bg-gray-100 justify-between items-center'>
                                    <span>{item.name}</span>
                                    <span className=' w-[101px] flex items-center justify-center'>{item.family}</span>
                                    <span className=' w-[53px] flex items-center justify-center'>{item.father_name}</span>
                                    <span>{item.national_code}</span>
                                    <span>{item.phone}</span>
                                    {item.status==="active"?(<span className=' text-green-600 w-[60px] flex items-center justify-center'>فعال</span>):(<span className=' text-red-600 w-[60px] flex items-center justify-center'>غیر فعال</span>)}
                                    <span className=' text-[#00008B]'>مشاهده درخواست</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Requests