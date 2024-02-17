//@ts-nocheck
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { IoMdNotifications } from "react-icons/io";
import calendar from "../../../../public/calendar.png"
import moment from 'moment-jalaali';

function UserNav() {
    const [jalaaliToday, setJalaaliToday] = useState("")
    useEffect(() => {
        const today = moment();
        setJalaaliToday(today.format('jYYYY/jM/jD'))
    }, [])
    return (
        <div className=' flex shadow-md h-[80px] bg-[#FAFAFA]'>
            <div className=' items-center justify-between w-5/6 m-auto flex'>
                <div className='flex items-center gap-2'>
                    <Image width={24} height={24} alt='' src={calendar} />
                    <span className=' text-[16px] font-semibold'>تاریخ: {jalaaliToday}</span>
                </div>
                <IoMdNotifications className=' text-[30px]' />

            </div>
        </div>)
}

export default UserNav