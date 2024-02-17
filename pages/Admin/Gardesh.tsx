//@ts-nocheck
import React, { useEffect, useState } from 'react'
import UserNav from '../components/UserComponent/dashbord/UserNav';
import AdminMenu from '../components/Menue/AdminMenu';
import moment from 'moment-jalaali';

import { CChart } from '@coreui/react-chartjs';
import axios from 'axios';
import { HashLoader } from 'react-spinners';
import ReceiptModal from '../components/Modals/ReceiptModal';
function Gardesh() {
    const [isLoading, setIsLoading] = useState(false)
    const [allTranc, setAllTranc] = useState([])
    const [modalVal, setModalVal] = useState(false)
    console.log(allTranc)
    useEffect(() => {
        setIsLoading(true)
        const token = localStorage.getItem("Token")
        console.log(token)
        axios.get(`http://familybank.v1r.ir/api/admin/show_all_transaction`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then((res) => {
            setIsLoading(false)
            console.log(res.data)
            setAllTranc(res.data)
        }).catch((err) => {
            setIsLoading(false)
            console.log(err)
        })
    }, [])

    return (
        <div dir='rtl' className='flex'>
            {isLoading && (
                <div className=' fixed flex items-center justify-center w-full bg-opacity-50 bg-gray-500 h-full z-20 '>
                    <HashLoader size={100} color='blue' />
                </div>)}
            <AdminMenu />
            <div className=' w-full gap-4 flex flex-col'>
                <UserNav />
                <ReceiptModal modalVal={modalVal} setModalVal={setModalVal} />
                <div className=' p-3 bg-gray-100 h-[466px] flex gap-2 flex-col rounded-l mt-10 w-5/6 mx-auto'>
                    <select className=' text-[18px] font-medium w-[198px] h-[44px] rounded-lg text-white bg-[#00008B]'>
                        <option>انتخاب بازه ی زمانی</option>
                    </select>
                    <div className=' p-1 text-[18px] font-semibold w-[975px] h-[48px] bg-gray-200 rounded-lg flex items-center justify-between'>
                        <span>عملیات</span>
                        <div className=' w-[150px] flex items-center justify-center' >نام/نام خانوادگی</div>
                        <div className=' w-[130px] flex items-center justify-center'>مبلغ</div>
                        <div className=' w-[90px] flex items-center justify-center'>تاریخ</div>
                        <div>شناسه پرداحت</div>
                        <div>تصویر رسید آپلود شده</div>
                    </div>
                    <div className='flex flex-col'>
                        {allTranc.map((item: any) => {
                            return (
                                <div key={item.id} className=' p-1 text-[18px] font-medium w-[975px] h-[48px] odd:bg-white flex justify-between items-center'>
                                    <span className=' w-[52px] flex items-start justify-start text-green-600'>واریز</span>
                                    {/* <span className='w-[52px] flex items-start justify-start text-red-600'>برداشت</span> */}
                                    <span className=' w-[150px] flex items-center justify-center'>{item.user_details}</span>
                                    <span className=' w-[130px] flex items-center justify-center'>{item.amount}</span>
                                    <span>{moment(item.transaction_date, 'YYYY-MM-DD').format('jYYYY/jMM/jDD')}</span>
                                    <span className=' w-[115px] flex items-center justify-center'>{item.tracking_code && item.tracking_code.reference_id}</span>
                                    <span onClick={() => { setModalVal(true) }} className=' text-blue-800 w-[172px] flex items-center justify-center'>مشاهده</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className=' flex w-5/6 mx-auto justify-between'>
                    <div className=' text-[18px] font-medium w-[530px] h-[406px] bg-gray-100 flex flex-col gap-8 p-5 items-center'>
                        <div className=' w-[498px] flex gap-3 flex-col'>
                            <div className=' p-2 rounded-lg bg-white w-full h-[40px] flex items-center justify-between'>
                                <span>مدیر صندوق</span>
                                <span>احمد محسن</span>
                            </div>
                            <div className=' p-2 rounded-lg bg-white w-full h-[40px] flex items-center justify-between'>
                                <span>موجودی صندوق</span>
                                <span>5,000,000,000 ریال</span>
                            </div>
                            <div className=' p-2 rounded-lg bg-white w-full h-[40px] flex items-center justify-between'>
                                <span>وضعیت صندوق</span>
                                <span>فعال</span>
                            </div>
                            <div className=' p-2 rounded-lg bg-white w-full h-[40px] flex items-center justify-between'>
                                <span>تاریخ تشکیل صندوق</span>
                                <span>1402/02/01</span>
                            </div>
                        </div>
                        <button className=' border-2 border-[#0000BF] w-[215px] h-[40px] flex justify-center items-center rounded-lg text-[#0000BF]'>تغییر مدیر صندوق</button>
                        <button className=' border-2 border-[#0000BF]  min-w-[205px] h-[40px] flex justify-center items-center rounded-lg text-[#0000BF]'>ورود ایمیل مدیر برای کاربران</button>

                    </div>
                    <div className='w-[530px] h-[406px] bg-gray-100'>
                        <CChart
                            className=' w-[500px] mx-auto'
                            type="bar"
                            data={{
                                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                datasets: [
                                    {
                                        label: 'واریز به صندوق',
                                        backgroundColor: '#00008B',
                                        data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                                        borderRadius: 5,
                                    },
                                    {
                                        label: "برداشت از صندوق(وام-بستن حساب ها)",
                                        backgroundColor: "#AF1616",
                                        data: [50, 40, 22, 43, 50, 42, 45, 88, 42],
                                        borderRadius: 5,
                                    }
                                ],
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Gardesh