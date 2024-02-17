//@ts-nocheck
import Menu from '@/pages/components/Menue/Menu'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import linesag from "../../../public/LineSag.png"
import axios from 'axios'
import moment from 'moment-jalaali';
import { HashLoader } from 'react-spinners'
import { useRouter } from 'next/router'
import Eeror from '@/pages/Eeror'
function VaamJaari() {

    const router = useRouter()
    const [paid, setPaid] = useState([])
    const [unPaid, setUnPaid] = useState([])
    const [loading, setLoading] = useState(false)
    const [vaamId, setVaamId] = useState()
    console.log(vaamId)
    const [loanData, setLoanData] = useState([])
    const [lastLoan, setLastLoan] = useState({})

    useEffect(() => {
        const token = localStorage.getItem("Token")
        setLoading(true)
        axios.get('https://familybank.v1r.ir/api/user/loan/all_loans_for_user',
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        ).then((res) => {
            setLoading(false)
            console.log(res.data)
            setLoanData(res.data)
            setVaamId(res.data[0].id)
        }).catch((err) => {
            setLoading(false)
            console.log(err)
        })

    }, [])
    useEffect(() => {
        setLoading(true)
        const token = localStorage.getItem("Token")
        axios.get(`https://familybank.v1r.ir/api/user/loan/Loan_details/${vaamId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            setLoading(false)
            console.log(res.data)
            setLastLoan(res.data)
        }).catch(err => {
            setLastLoan()
            setLoading(false)
            console.log(err)
        }
        )
    }, [vaamId])
    useEffect(() => {
        const token = localStorage.getItem("Token")
        axios.get(`https://familybank.v1r.ir/api/user/installment/Installments_paid`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            setLoading(false)
            console.log(res.data)
            setPaid(res.data.data)
        }).catch(err => {
            setLoading(false)
            console.log(err)
        }
        )

    }, [])
    useEffect(() => {
        const token = localStorage.getItem("Token")
        axios.get(`https://familybank.v1r.ir/api/user/installment/Deferred_installments`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res.data.data)
            setUnPaid(res.data.data)
        }).catch((err) => {
            Eeror()
            console.log(err)
        })
    }, [])

    const pathname = usePathname()
    return (
        <div dir='rtl' className='flex'>
            {loading && (
                <div className=' fixed flex items-center justify-center w-full bg-opacity-50 bg-gray-500 h-full z-20 '>
                    <HashLoader size={100} color='blue' />
                </div>)}
            <Menu />
            <div className=' w-full flex flex-col'>
                <div className=' border-2 border-t-0 border-r-0 border-l-0 h-24 flex border-[#00008B] items-center'>
                    <div className=' w-5/6 m-auto flex items-center justify-end'>
                        <div className=' flex items-center justify-center text-[#00008B] text-base font-medium w-[149px] h-[41px] border-2 border-[#00008B] rounded-lg '>وام های تسویه شده</div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='flex gap-3 flex-col -mt-6'>

                        <div className=' w-11/12 m-auto flex gap-2'>
                            <Link href="/User/Vaam/VaamJaari" className={` ${(pathname === '/User/Vaam/VaamJaari') && 'bg-[#191971] text-white'} w-[101px] h-[44px] rounded-lg flex items-center justify-center border-2 border-[#00008B]  text-[#00008B] font-semibold text-[18px]`}>
                                وام جاری
                            </Link>
                            <button onClick={() => { router.push("/User/Vaam/DarKhaast") }} className={` ${pathname === '/User/Vaam/DarKhaast' ? 'bg-orange-500 text-blue-500' : null} flex items-center justify-center w-[138px] h-[44px]  text-[#00008B] border-2 border-[#00008B] bg-white rounded-lg font-semibold text-[18px] `}>درخواست وام</button>
                        </div>
                        <div className=' flex flex-col gap-3 mt-10'>
                            <div className='w-5/6 m-auto'>

                                {loanData.length !== 0 ? (<select onChange={(e) => { setVaamId(e.target.value) }} className=' w-[115px] h-[36px] border-2 border-[#00008B] text-[#00008B] rounded-lg'>

                                    {loanData.map((item, index) => {
                                        return (
                                            <option value={item.id}>وام شماره {index + 1}</option>
                                        )
                                    })}
                                </select>) : null}
                            </div>
                            {loanData.length !== 0 ? (
                                <div className=' w-5/6 m-auto flex'>
                                    {lastLoan ? (<div className='flex'>
                                        <div className=' ml-1 w-[59px] h-[119px] bg-gray-300 rounded-r-xl text-[18px] font-semibold flex items-center justify-center' >وام</div>
                                        <div className='flex gap-[1px]'>
                                            <div className='flex flex-col gap-[1px]'>
                                                <div className=' w-[179px] h-[59px]  font-semibold flex items-center justify-center bg-gray-300'>مبلغ</div>
                                                <div className=' w-[179px] h-[59px] flex items-center justify-center bg-gray-100'>
                                                    {lastLoan.loan_amount}
                                                </div>

                                            </div>
                                            <div className='flex flex-col gap-[1px]'>
                                                <div className=' w-[179px] h-[59px] flex font-semibold items-center justify-center bg-gray-300'>تاریخ دریافت وام</div>
                                                <div className=' w-[179px] h-[59px] flex items-center justify-center bg-gray-100'>{moment(lastLoan.date_of_loan, 'YYYY-MM-DD').format('jYYYY/jMM/jDD')}</div>
                                            </div>
                                            <div className='flex flex-col gap-[1px]'>
                                                <div className=' w-[179px] h-[59px] flex font-semibold items-center justify-center bg-gray-300'>میزان قسط هر ماه</div>
                                                <div className=' w-[179px] h-[59px] flex items-center justify-center bg-gray-100'>{lastLoan.Installment_amount_every_month}</div>
                                            </div>
                                            <div className='flex flex-col gap-[1px]'>
                                                <div className=' w-[179px] h-[59px] flex font-semibold items-center justify-center bg-gray-300'>مبلغ پرداخت شده</div>
                                                <div className=' w-[179px] h-[59px] flex items-center justify-center bg-gray-100'>{lastLoan.last_paid_installment_cost}</div>

                                            </div>
                                            <div className=' flex flex-col gap-[1px]'>
                                                <div className=' rounded-tl-xl w-[179px] font-semibold h-[59px] flex items-center justify-center bg-gray-300'>زمان پرداخت قسط بعدی</div>

                                                <div className=' w-[179px] rounded-bl-lg h-[59px] flex items-center justify-center bg-gray-100'>{moment(lastLoan.Time_to_pay_the_next_installment, 'YYYY-MM-DD').format('jYYYY/jMM/jDD')}</div>
                                            </div>
                                        </div></div>) : (<div>درخواست شما در حال بررسی است</div>)}

                                </div>) : (<div className=' flex items-center justify-center'>
                                    وامی وجود ندارد
                                </div>)}
                            <Image className='w-11/12 m-auto mt-16' src={linesag} alt='' />
                            <div className='flex justify-between mt-10 w-5/6 m-auto'>
                                <div className=' w-[309px] h-[454px] flex flex-col'>
                                    <div className=' w-full rounded-lg h-[43px] bg-[#00008B] flex items-center justify-start pr-2 text-white text-[18px] font-semibold'>اقساط پرداخت شده</div>
                                    <div className=' mt-2 flex text-[16px] font-semibold justify-around items-center h-[43px] bg-gray-100'>
                                        <span>مبلغ</span>
                                        <span>تاریخ</span>
                                    </div>
                                    {paid.length !== 0 ? (
                                        paid.map((item: any) => {
                                            return (
                                                <div className='flex text-[16px] even:bg-gray-100 font-semibold justify-around items-center h-[43px] ' key={item.id}>
                                                    <span>{item.price}</span>
                                                    <span>{item.date}</span>
                                                </div>
                                            )
                                        })
                                    ) : (<div className=' mt-5 flex items-center justify-center'>قسط پرداخت شده ای وجود ندارد</div>)}

                                </div>
                                <div className=' w-[469px] flex flex-col'>
                                    <div className=' w-full pr-2 h-[43PX] flex items-center justify-start rounded-lg text-[18px] font-semibold bg-[#00008B] text-white'>اقساط معوق</div>
                                    <div className=' mt-2 bg-gray-100 h-[43px] items-center  flex justify-around text-[16px] font-semibold'>
                                        <span>مبلغ</span>
                                        <span>تاریخ</span>
                                        <span>پرداخت</span>

                                    </div>

                                    {unPaid.length !== 0 ? (
                                        unPaid.map((item: any) => {
                                            return (
                                                <div className='flex text-[16px] even:bg-gray-100 font-semibold justify-around items-center h-[43px] ' key={item.id}>
                                                    <span>{item.cost}</span>

                                                    <span>{moment(item.date_of_payment.substr(0, 10), 'YYYY-MM-DD').format('jYYYY/jMM/jDD')}</span>
                                                    <span>لینک پرداخت</span>
                                                </div>)
                                        })
                                    ) : (<div className='flex mt-5 items-center justify-center'>قسط معوقی وجود ندارد</div>)}

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VaamJaari