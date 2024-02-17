//@ts-nocheck
import axios, { all } from 'axios'
import React, { useEffect, useState } from 'react'
import moment from 'moment-jalaali';

function VaamJaari({ setIsLoading }) {
    const [vaamVal, setVaamVal] = useState(false)
    const [vaamId, setVaamId] = useState()
    const [loan_amount, setLoan_amount] = useState("")
    const [last_paid_installment_cost, setLast_paid_installment_cost] = useState("")
    const [allOfLoans, setAllOfLoans] = useState([])
    const [dateOfLoan, setDateOfLoan] = useState()
    useEffect(() => {
        const token = localStorage.getItem("Token")
        axios.get(`https://familybank.v1r.ir/api/user/loan/all_loans_for_user`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            console.log(res)
            setVaamId(res.data[0].id)
            setAllOfLoans(res.data)
        }).catch(err => {

            console.log(err)
        }
        )

    }, [])


    useEffect(() => {
        const token = localStorage.getItem("Token")
        setIsLoading(true)
        axios.get(`https://familybank.v1r.ir/api/user/loan/Loan_details/${vaamId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            setIsLoading(false)
            setVaamVal(true)
            console.log(res.data.date_of_loan)
            setDateOfLoan(moment(res.data.date_of_loan, 'YYYY-MM-DD').format('jYYYY/jMM/jDD'))
            setLast_paid_installment_cost(res.data.last_paid_installment_cost)
            setLoan_amount(res.data.loan_amount)
            console.log(res)
        }).catch(err => {
            setIsLoading(false)
            setVaamVal(false)
            console.log(err)
        }
        )
    }, [vaamId])



    return (
        <div className=' h-[429px] w-[528px] bg-gray-100'>
            {allOfLoans.length !== 0 && <select className=' mt-3 mr-11 absolute text-[18px] border-2 border-[#00008B] text-[#00008B] rounded-md p-1' onChange={(e) => { setVaamId(e.target.value) }}
            >
                {allOfLoans.map((item, index): any => {
                    return (
                        <option key={item.id} value={item.id}>وام شماره {index + 1}</option>
                    )
                })}
            </select>}


            {allOfLoans.length !== 0 ? (<div className=' h-full'>
                {vaamVal ? (<div >
                    <div className=' flex flex-col gap-1 justify-center items-center  h-[429px] w-[528px] bg-gray-100'>
                        <div className=' mb-2 w-5/6 h-[40px] bg-white rounded-lg flex justify-center items-center'>
                            <span className=' text-[#00008B] text-[16px] font-semibold mr-2'>وام جاری</span>
                        </div>
                        <div className=' gap-4 w-5/6 h-[80px] bg-white rounded-lg flex flex-col justify-center items-center'>
                            <div className='flex w-11/12 justify-between'>
                                <span className=' text-[18px] font-semibold text-[#00008B]'>مبلغ</span>
                                <span className=' text-[18px] font-semibold text-[#00008B]'>تاریخ دریافت وام</span>
                            </div>
                            <div className=' flex w-11/12 justify-between'>
                                <span>{loan_amount}</span>
                                <span>{dateOfLoan}</span>
                            </div>
                        </div>
                        <div className=' gap-4 w-5/6 h-[80px] bg-white rounded-lg flex flex-col justify-center items-center'>
                            <div className='flex w-11/12 justify-start'>
                                <span className=' text-[18px] font-semibold text-[#00008B]'>آخرین قسط پرداخت شده</span>
                            </div>
                            <div className=' flex w-11/12 justify-between'>
                                <span>{last_paid_installment_cost}</span>
                                <span>{ }</span>
                            </div>
                        </div>
                        <div className=' gap-4 w-5/6 h-[80px] bg-white rounded-lg flex flex-col justify-center items-center'>
                            <div className='flex w-11/12 justify-start'>
                                <span className=' text-[18px] font-semibold text-[#00008B]'>اقساط معوق</span>
                            </div>
                            <div className=' flex w-11/12 justify-between'>
                                <span>{last_paid_installment_cost}</span>
                                <span>{ }</span>
                            </div>
                        </div>
                    </div></div>) : (<div className=' flex h-full items-center justify-center'>درخواست شما در حال بررسی است</div>)}
            </div>) : (<div className=' flex justify-center items-center h-full'>وامی برای نمایش وجود ندارد</div>)}


        </div>
    )
}

export default VaamJaari