import Eeror from '@/pages/Eeror'
import Menu from '@/pages/components/Menue/Menu'
import UserNav from '@/pages/components/UserComponent/dashbord/UserNav'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners'

function index() {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState([])
    useEffect(() => {
        const token = localStorage.getItem("Token")
        setLoading(true)
        axios.get('https://familybank.v1r.ir/api/notification/user',
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        ).then((res) => {
            setLoading(false)
            console.log(res.data)
            setMessage(res.data)
        }).catch((err) => {
            Eeror()
            setLoading(false)
            console.log(err)
        })

    }, [])
    return (
        <div dir='rtl' className='flex'>
            {loading ? (<div className=' fixed flex items-center justify-center w-full bg-opacity-50 bg-gray-500 h-full z-20 '>
                <HashLoader size={100} color='blue' loading={loading} />
            </div>) : (null)}
            <Menu />
            <div className=' w-full flex flex-col'>
                <UserNav />
                <div className='flex flex-col mx-auto w-5/6 gap-3 mt-10'>
                    {message.length !== 0 ? (
                        <div>
                            {message.map((item) => {
                                return (
                                    <div className=' flex flex-col px-2 gap-2 justify-center rounded-l bg-gray-100 w-[938px] h-[153px]'>
                                        <div className=' w-full flex  text-[16px] font-semibold'>
                                            <span className='flex w-1/2 items-center justify-end'>قسط معوق</span>
                                            <span className='flex w-1/2 items-center justify-end'>1402/06/01</span>
                                        </div>
                                        <div className=' text-[16px] font-normal'>با سلام
                                            <br />
                                            جناب آقای مسعود رمضانی زمان لطفا قسط تاریخ 1402/05/01 خود را پرداخت کنید
                                        </div>
                                        <div className=' w-full flex  justify-end'>
                                            <button className=' bg-[#00008B] flex items-center text-white justify-center rounded-lg w-[176px] h-[36px]'>لینک پرداخت</button>
                                        </div>
                                    </div>
                                )
                            })
                            }</div>) : (<div className=' flex justify-center items-center'>شما پیامی ندارید</div>)}

                </div>
            </div>
        </div>
    )
}

export default index