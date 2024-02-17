import React, { useEffect, useState } from 'react'
import UserNav from '../../components/UserComponent/dashbord/UserNav';
import AdminMenu from '../../components/Menue/AdminMenu';
import { HashLoader } from 'react-spinners';
import Link from 'next/link';
import axios from 'axios';
import ModalSaagg from '@/pages/components/Modals/ModalSaagg';
import { usePathname } from 'next/navigation';
function Darkhaastha() {
    const [fullName, setFullName] = useState("")
    const [modalVal, setModalVal] = useState(false)
    const [requests, setRequests] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [loanId, setLoanId] = useState()
    const pathName = usePathname()
    console.log(loanId)
    useEffect(() => {
        const token = localStorage.getItem("Token")
        axios.get(`http://familybank.v1r.ir/api/user/loan/all_loans_for_user_status_Pending`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res)
            console.log(res.data)
            setRequests(res.data)

        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <div dir='rtl' className='flex'>
            <ModalSaagg modalVal={modalVal} fullName={fullName} loanId={loanId} setModalVal={setModalVal} />
            <AdminMenu />
            <div className=' w-full gap-4 flex flex-col'>
                <div className=' h-12 border-[#00008B] border-[1.7px] border-x-0 border-t-0'>
                    <div className=' w-11/12 mx-auto mt-[30px] flex gap-2'>
                        <Link href="/Admin/Vaamha" className=' bg-white flex items-center justify-center text-[#00008B] border-2 border-[#00008B] rounded-lg min-w-[77px] h-[33px]'>وام جاری</Link>
                        {pathName === "/Admin/Vaamha/Darkhaastha" ? (<Link href="/Admin/Vaamha/Darkhaastha" className=' bg-[#00008B] text-white flex items-center justify-center border-2 border-[#00008B] rounded-lg min-w-[110px] h-[33px]'>درخواست وام</Link>
                        ) : (<Link href="/Admin/Vaamha/Darkhaastha" className=' bg-white text-[#00008B] flex items-center justify-center border-2 border-[#00008B] rounded-lg min-w-[110px] h-[33px]'>درخواست وام</Link>
                        )}
                        <button className=' bg-white text-[#00008B] border-2 border-[#00008B] rounded-lg min-w-[153px] h-[33px]'>وام های تسویه شده</button>
                    </div>
                </div>
                <div className=' w-5/6 mx-auto flex flex-col mt-10'>
                    <div className='flex text-[18px] rounded-lg h-[48px] justify-center px-2 font-semibold bg-gray-100 w-full items-center'>
                        <span className=' -ml-4 w-[150px]'>نام</span>
                        <span className=' w-[150px]'>نام خانوادگی</span>
                        <span className=' w-[150px]'> نام پدر</span>
                        <span className=' w-[150px]'> کد ملی</span>
                        <span className=' w-[150px]'>مبلغ درخواست</span>
                        <span className=' w-[150px]'>وضعیت</span>
                        <span className=' w-[150px]'></span>
                    </div>
                    <div>
                        {requests.map((item: any) => {
                            return (
                                <div key={item.id} className=' w-full h-[48px] px-2 pr-5 items-center flex rounded-lg justify-between text-[18px] font-normal even:bg-gray-100 odd:bg-white'>
                                    <span className=' w-[150px]'>{item.name}</span>
                                    <span className=' w-[150px]'>{item.family}</span>
                                    <span className=' w-[150px]'>{item.father_name}</span>
                                    <span className=' w-[150px]'>{item.national_code}</span>
                                    <span className=' w-[150px]'>{item.loan_amount}</span>
                                    {item.status == undefined ? (<span className=' w-[150px] text-green-600'>فعال</span>
                                    ) : (<span className=' w-[150px] text-red-600'>{item.status}</span>
                                    )}
                                    <span onClick={() => {
                                        setLoanId(item.loan_id)
                                        setModalVal(true)
                                        setFullName(`${item.name} ${item.family}`)
                                    }} className=' w-[150px] text-blue-600'>مشاهده درخواست</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>

    )
}
// <div dir='rtl' className='flex'>
//     {isLoading && (
//         <div className=' fixed flex items-center justify-center w-full bg-opacity-50 bg-gray-500 h-full z-20 '>
//             <HashLoader size={100} color='blue' />
//         </div>)}
//     <AdminMenu />
//     <div className=' w-full flex flex-col'>
//         <UserNav />
//         <div className=' mx-auto mt-20 w-[1056px] flex flex-col gap-1'>
//             <div className='flex text-[18px] rounded-lg h-[48px] justify-center px-2 font-semibold bg-gray-100 w-full items-center'>
//                 <span className=' -ml-4 w-[150px]'>نام</span>
//                 <span className=' w-[150px]'>نام خانوادگی</span>
//                 <span className=' w-[150px]'> نام پدر</span>
//                 <span className=' w-[150px]'> کد ملی</span>
//                 <span className=' w-[150px]'>مبلغ درخواست</span>
//                 <span className=' w-[150px]'>وضعیت</span>
//                 <span className=' w-[150px]'></span>
//             </div>
//         </div>
//     </div>
// </div>

export default Darkhaastha