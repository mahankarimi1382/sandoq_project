//@ts-nocheck
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from 'moment-jalaali';

function AcountInfo() {
    const [wallet_balance, setWallet_balance] = useState()
    const [userInfo, setUserInfo] = useState({})
    const [annnn, setAnnnn] = useState("")
    useEffect(() => {
        const token = localStorage.getItem("Token")
        axios.get('http://familybank.v1r.ir/api/user/user/show_user_info',
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            }
        ).then((res) => {
            console.log(res)
            const mahan = (res.data.user_info.created_at)
            setAnnnn(moment(mahan, 'YYYY-MM-DD').format('jYYYY/jMM/jDD'))
            setUserInfo(res.data.user_info)
            setWallet_balance(parseInt(res.data.user_info.balance))
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <div className=' h-[419px] w-[528px] bg-gray-100 flex'>
            <div className=' w-5/6 flex flex-col h-5/6 m-auto justify-between items-center'>
                <div className='flex flex-col gap-2 text-[18px] font-medium'>
                    <div className=' w-[469px] bg-white h-[40px] rounded-lg  flex'>
                        <div className=' w-5/6 flex justify-between items-center m-auto'>
                            <span>صاحب حساب</span>
                            <span className=' items-start'>{userInfo.name} {userInfo.family}</span>
                        </div>
                    </div>
                    <div className=' bg-white h-[40px] rounded-lg w-full flex'>
                        <div className=' w-5/6 flex justify-between items-center m-auto'>
                            <span>موجودی حساب</span>
                            <span>{wallet_balance}</span>
                        </div>
                    </div>
                    <div className=' bg-white h-[40px] rounded-lg w-full flex'>
                        <div className=' w-5/6 flex justify-between items-center m-auto'>
                            <span>وضعیت حساب</span>
                            <span className=' text-[#00008B]'>{userInfo.status === "active" ? ("فعال") : ("غیرفعال")}</span>
                        </div>
                    </div>
                    <div className=' bg-white h-[40px] rounded-lg w-full flex'>
                        <div className=' w-5/6 flex justify-between items-center m-auto'>
                            <span>تاریخ عضویت</span>
                            <span>{annnn}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <button className=' rounded-lg w-[313px] h-[36px] text-[16px]  font-semibold border-2 border-[#00008B] text-[#00008B]'>واریز</button>
                </div>
            </div>
        </div>
    )
}

export default AcountInfo