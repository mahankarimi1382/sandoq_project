import { CChart } from '@coreui/react-chartjs'
import { getStyle } from 'chart.js/helpers'
import { FaCircle } from "react-icons/fa";


import React from 'react'

function UserChart() {
    return (
        <div className=' h-[419px] w-[528px] bg-gray-100 flex items-center justify-center'>
            <div className=' h-5 bg-gray-100  absolute z-10 -mt-[265px] w-[200px]'></div>
            <CChart
                className=' absolute w-[520px] h-[300px]'
                type="line"
                data={{
                    labels: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهرویر", "مهر"],
                    datasets: [
                        {
                            label: "موجودی حساب",
                            tension: 0.3,
                            borderCapStyle: "round",
                            backgroundColor: "#191970",
                            borderColor: "#191970",
                            pointBackgroundColor: "#191970",
                            hoverBackgroundColor: "#35B370",
                            pointBorderColor: "#191970",
                            data: [30, 20, 12, 30, 10, 20, 29, 30, 40]
                        },
                        {
                            label: "اقساط",
                            tension: 0.3,
                            hoverBackgroundColor: "#35B370",
                            backgroundColor: "#FF7830",
                            borderColor: "#FF7830",
                            pointBackgroundColor: "#FF7830",
                            pointBorderColor: "#FF7830",
                            data: [10, 12, 28, 29, 7, 25, 12, 30,]
                        },
                    ],
                }}
            />
            <div className=' z-10 bg-gray-100 w-[480px] p-2 rounded-lg flex flex-col -mt-[320px] '>
                <div className='flex items-center gap-2'>
                    اقساط
                    <FaCircle className=" text-orange-500" />
                </div>
                <span className='flex items-center gap-2'>
                    موجودی حساب
                    <FaCircle className=" text-blue-800" />
                </span>
            </div>
        </div>
    )
}

export default UserChart