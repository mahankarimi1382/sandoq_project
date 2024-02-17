import React from 'react'
import Image from "next/image";
import logo from "../../../public/logo.png"
import Link from 'next/link';

function Navbar() {
  return (
    <div className=" mb-10">
      <div className=" mt-5 flex w-3/4 m-auto justify-between items-center">
        <div className="flex gap-4  500:w-1/4">
          <Link href="/UserLogin" className=" text-xs w-15 500:text-sm text-white 800:text-[18px] 800:font-semibold h-10 rounded-lg 800:w-1/2 bg-[#00008B] flex justify-center items-center">
            ورود
          </Link>
          <Link className=" text-xs w-15 border-[1px] 500:text-sm text-[#00008B] 800:text-[18px] 800:font-semibold flex h-10 800:w-1/2 items-center bg-white justify-center rounded-lg 800:border-[1.7px] border-[#00008B]" href="/SignUp">
              ثبت نام
          </Link>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <Image className='500:flex w-8  500:w-[63px]' src={logo} width={63} height={31} alt="LOGO IMAGE" />
          <span className=" text-sm font-normal 500:text-[18px] 500:font-semibold">صندوق قرض الحسنه امین</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar