//@ts-nocheck
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import moment from 'moment-jalaali';
import widraw from "../../../../public/widraw.png"
import axios from 'axios'
function LastTransAction() {
    const [lastTranc, setLastTranc] = useState([])
    const [showVal, setShowVal] = useState(false)
    console.log(showVal)
    useEffect(() => {
        const token = localStorage.getItem("Token")
        axios.get(`http://familybank.v1r.ir/api/user/transaction/showUserTransactions`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        ).then((res) => {
            console.log(res.data)
            if (res.data.length === 0) {
                setShowVal(false)
            } else {
                setShowVal(true)
            }
            setLastTranc(res.data)

        }).catch((err) => {
            console.log(err)
            setShowVal(false)
            setLastTranc([])
        })
    }, [])
    return (
        <div className=' flex flex-col gap-1 items-center py-16  h-[429px] w-[528px] bg-gray-100'>
            {showVal && <div className=' mb-2 w-5/6 h-[40px] bg-white rounded-lg flex justify-between items-center'>
                <span className=' text-[#00008B] text-[16px] font-semibold mr-2'>آخرین تراکنش ها</span>
                <span className=' text-[#00008B] text-[16px] font-semibold w-24'>تاریخ</span>
            </div>}

            {showVal ?
                (<div className=' w-full flex flex-col gap-1 h-4/6 items-center'>
                    {lastTranc.map((item) => {
                        return (
                            <div className=' w-5/6 h-[40px] bg-white rounded-lg flex justify-between items-center'>
                                <div className='flex px-3 items-center'>
                                    <Image src={widraw} alt='' />
                                    <span className=' text-[#2A2A2A] font-normal text-[16px] mr-2'>{item.Price}</span>
                                </div>
                                <span className=' text-[#2A2A2A] text-[16px] w-24'>{moment(item.date, 'YYYY-MM-DD').format('jYYYY/jMM/jDD')}</span>
                            </div>
                        )
                    })}</div>) : (<div className='flex h-full items-center justify-center'>شما تراکنشی ندارید</div>)}


        </div>)
}

export default LastTransAction