//@ts-nocheck
import React, { useEffect, useState } from 'react'

import UserNav from '../../components/UserComponent/dashbord/UserNav';
import AdminMenu from '../../components/Menue/AdminMenu';
import Link from 'next/link';
import axios from 'axios';
import moment from 'moment-jalaali';
import { usePathname } from 'next/navigation';

function index() {
    const [allLoans, setAllLoans] = useState([])
    const pathName = usePathname()

    useEffect(() => {
        const token = localStorage.getItem("Token")
        axios.get(`http://familybank.v1r.ir/api/admin/all_users_loan_details`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }

            }
        ).then((res) => {
            console.log(res.data)
            setAllLoans(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <div dir='rtl' className='flex'>
            <AdminMenu />
            <div className=' w-full gap-4 flex flex-col'>
                <div className=' h-12 border-[#00008B] border-[1.7px] border-x-0 border-t-0'>
                    <div className=' w-11/12 mx-auto mt-[30px] flex gap-2'>
                        {pathName === "/Admin/Vaamha" ? (<button className=' bg-[#00008B] text-white border-2 border-[#00008B] rounded-lg min-w-[77px] h-[33px]'>وام جاری</button>
                        ) : (<button className=' bg-white text-[#00008B] border-2 border-[#00008B] rounded-lg min-w-[77px] h-[33px]'>وام جاری</button>)}
                        <Link href="/Admin/Vaamha/Darkhaastha" className=' bg-white text-[#00008B] flex items-center justify-center border-2 border-[#00008B] rounded-lg min-w-[110px] h-[33px]'>درخواست وام</Link>

                        <button className=' bg-white text-[#00008B] border-2 border-[#00008B] rounded-lg min-w-[153px] h-[33px]'>وام های تسویه شده</button>
                    </div>
                </div>
                <div className=' w-5/6 mx-auto flex flex-col mt-10'>
                    <div className=' gap-[0.6px] flex w-full'>
                        <div className=' rounded-tr-lg flex items-center justify-center text-white min-w-[200px] h-[48px] text-[16px] font-medium bg-[#00008B]'>نام/نام خانوادگی/کد ملی</div>
                        <div className=' flex items-center justify-center text-white min-w-[165px] h-[48px] text-[16px] font-medium bg-[#00008B]'>مبلغ وام</div>
                        <div className=' flex items-center justify-center text-white min-w-[165px] h-[48px] text-[16px] font-medium bg-[#00008B]'>مبلغ قسط</div>
                        <div className=' flex items-center justify-center text-white min-w-[165px] h-[48px] text-[16px] font-medium bg-[#00008B]'>تاریخ دریافت</div>
                        <div className=' flex items-center justify-center text-white min-w-[165px] h-[48px] text-[16px] font-medium bg-[#00008B]'>تعداد اقساط معوق</div>
                        <div className=' rounded-tl-lg flex items-center justify-center text-white min-w-[190px] h-[48px] text-[16px] font-medium bg-[#00008B]'>تعداد اقساط پرداخت شده</div>
                    </div>
                    <div className='flex flex-col gap-[2px]'>
                        {allLoans.length !== 0 ? (<div>
                            {allLoans.map((item: any) => {
                                return (
                                    <div className=' text-[16px] font-medium flex gap-[0.6px]'>
                                        <div className=' p-2 flex items-start justify-center flex-col bg-gray-200 w-[200px] h-[96px]'>
                                            <span>{item.name}</span>
                                            <span>{item.family}</span>
                                            <span>{item.national_code}</span>
                                        </div>
                                        <span className=' w-[165px] h-[96px] bg-gray-100 flex items-center justify-center'>ریال{item.loan_amount}</span>
                                        <span className=' w-[165px] h-[96px] bg-gray-100 flex items-center justify-center'>ریال{item.installment_amount}</span>
                                        <span className=' w-[165px] h-[96px] bg-gray-100 flex items-center justify-center'>{moment(item.loan_date.substr(0, 10), 'YYYY-MM-DD').format('jYYYY/jMM/jDD')}</span>
                                        <span className=' w-[165px] h-[96px] bg-gray-100 flex items-center justify-center'>{item.outstanding_installments}</span>
                                        <span className=' w-[190px] h-[96px] bg-gray-100 flex items-center justify-center'>{item.paid_installments}</span>




                                    </div>
                                )
                            })}
                        </div>) : (<div className='flex h-48 items-center justify-center'>وامی وجود ندارد</div>)}

                    </div>
                </div>
            </div>
        </div >
    )
}

export default index