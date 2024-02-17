import React from 'react'
import Image from "next/image";
import MoneyMan from "../../../public/MoneyMan.png"
import cashBox1 from "../../../public/cashBox1.png"
import happykid from "../../../public/happykid.png"
import cashBox2 from "../../../public/cashBox2.png"
import moneyCouple from "../../../public/moneyCouple.png"
import Footer from './Footer';
function Main() {
  return (
    <div className=" w-full bg-white absolute">
      <div className=" w-3/4 m-auto mt-14">
        <div className="flex items-center justify-center">
          <span className=" text-[24px] font-medium">
            چرا صندوق قرض الحسنه امین؟
          </span>
        </div>
        <div className=" flex-col-reverse 800:flex-row flex mt-10 items-center justify-between">
          <div>
            <span className=" text-[24px] 800:text-[20px] font-medium">
              بخش کوچکی از درامدت رو ماهیانه در صندوق پس انداز کن
              <br className='hidden 800:flex' />و با استفاده از امکاناتی که در پنلت داری مدیریتش کن
            </span>
          </div>
          <Image src={happykid} alt='happykid' />
        </div>
        <div className='800:flex-row flex-col flex w-full justify-between items-center mt-5 800:gap-14'>
          <Image src={MoneyMan} alt='' />
          <span className=" text-[24px] 800:text-[20px] font-medium">
            بعد از ساختن حساب و واریز اولین حق عضویت صندوق وام بدون بهره و
            <br className=' hidden 800:flex' />
            بدون ضامن بگیر و به راحتی اقساظش رو پرداخت کن
          </span>
        </div>
        <div className='flex flex-row 500:text-[25px]   justify-between items-center text-[15px] font-semibold mt-16'>
          <p>          حسابت رو بساز
          </p>
          <div className=' 500:border-dashed 500:border-2 rotate-45 border-r-white border-indigo-600 rounded-full p-2 '>
            <Image className=' w-40 500:w-[400px] -rotate-45' src={cashBox1} alt='' />
          </div>
          <p className=' h-1 bg-white flex 500:w-[156px]'>
          </p>
        </div>
        <div className='flex justify-center'>
          <span className=' hidden 500:flex border-dashed border-2 border-t-0 border-r-0 border-b-0 border-indigo-600 h-10 '></span>
        </div>
        <div className='flex  flex-row justify-between items-center'>
          <p className=' bg-white h-1 500:w-[356.8px]'>
          </p>

          <div className='  500:border-dashed 500:border-2 rotate-45 border-l-white border-b-white border-indigo-600 rounded-full p-2 '>
            <Image className=' w-36 500:w-[400px] -rotate-45' src={cashBox2} alt='' />
          </div>
          <p className='text-[15px] 500:text-[25px] font-semibold'>          حق عضویت صندوق رو پرداخت کن
          </p>


        </div>
        <div className=' flex font justify-center'>
          <span className=' hidden 500:flex border-dashed border-2 border-t-0 border-r-0 border-b-0 border-indigo-600 h-10 '></span>


        </div>
        <div className=' 500:text-[25px]  flex-row text-[15px] font-semibold flex justify-between items-center'>

          <p>          وام بدون دردسر دریافت کن
          </p>
          <div className=' 500:border-dashed 500:border-2 rotate-45 border-l-white  border-indigo-600 rounded-full p-2 '>
            <Image className=' w-40 500:w-[400px] -rotate-45' src={moneyCouple} alt='' />
          </div>

          <p className=' bg-white h-1 500:w-[296px] 500:flex'>
          </p>

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Main