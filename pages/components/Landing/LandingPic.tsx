import React from 'react'
import Image from "next/image";
import { FaCircle } from "react-icons/fa";
import mainpic from "../../../public/mainpic.png"
function LandingPic() {
    return (
        <div className=''>
            <section className=" flex-col relative flex justify-center">
                <svg
                    className=""
                    viewBox="0 0 1437 936"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1437 157.474C814.6 -127.726 218.333 38.6403 -2 157.474V935.975H1437V157.474Z"
                        fill="#00008B"
                    />
                </svg>
                <svg
                    className=" mt-[-65%] m-auto  w-[93%]"
                    viewBox="0 0 1338 119"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M888.987 22.6684C1112.79 -24.2935 1281.58 12.4666 1338 36.7168L1134.59 119L72.3243 101.439L0 42.2354C125.362 -3.12091 248.447 19.6579 294.32 36.7168C399.291 51.6015 665.183 69.6303 888.987 22.6684Z"
                        fill="#FF7830"
                    />
                </svg>
                <svg
                    className=" mt-[-6.3%]"
                    viewBox="0 0 1440 263"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M-2 0C423.642 100.8 1137.35 42 1441 0V263H-2V0Z"
                        fill="#0000BF"
                    />
                </svg>
                <svg
                    className=" mt-[-20.2%] w-full "
                    viewBox="0 0 1439 940"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1439 158.151C816.6 -128.276 220.333 38.8065 0 158.151V940H1439V158.151Z"
                        fill="#F5F5F5"
                    />
                </svg>
                <div className=" flex flex-col 1470:mt-[-50%]">
                    <div className=' hidden 1470:flex 1470:flex-col -mt-10' dir="ltr">
                        <svg
                            className=" mb-[-40%]"
                            width="410"
                            height="660"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="314.476"
                                y="-39.3516"
                                width="190"
                                height="853.444"
                                rx="95"
                                transform="rotate(45 314.476 -39.3516)"
                                fill="#00008B"
                            />
                        </svg>
                        <svg
                            className=" 1470:flex hidden"
                            width="763"
                            height="772"
                            viewBox="0 0 763 772"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="667.761"
                                y="-39.166"
                                width="190"
                                height="1012.27"
                                rx="95"
                                transform="rotate(45 667.761 -39.166)"
                                fill="#00008B"
                            />
                        </svg>
                        <svg
                            className=" mt-[-30%] ml-[30%]"
                            width="393"
                            height="394"
                            viewBox="0 0 393 394"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="297.734"
                                y="-38.6094"
                                width="190"
                                height="476.358"
                                rx="95"
                                transform="rotate(45 297.734 -38.6094)"
                                fill="#00008B"
                            />
                        </svg>
                    </div>
                    <div className="flex justify-center 1230:justify-between 1230:items-center w-full mt-[-53%] ">
                        <div className=" flex-col 800:gap-10 flex 1230:gap-0 1230:mr-[180px]">
                            <h2 className=" font-cinema text-4xl 800:text-8xl 1230:text-[55px] font-normal text-center">
                                صندوق قرض الحسنه
                                امین
                            </h2>
                            <div className=" flex flex-col text-2xl  800:gap-12 1230:gap-0 mt-3 800:text-5xl 1230:text-3xl">
                                <span className=" mt-2 flex 1230:w-[200%] items-center gap-3">
                                    <FaCircle className="mt-2 text-2xl text-red-800" />
                                    وام بدون بهره فقط با باز کردن حساب
                                </span>
                                <span className=" mt-2 flex items-center gap-3">
                                    <FaCircle className=" mt-2 text-2xl text-orange-700" />
                                    وام بدون ضامن
                                </span>
                                <span className="mt-2 1230:w-[200%] flex items-center gap-3">
                                    <FaCircle className="mt-2 text-2xl text-red-800" />
                                    در کنار هم برای وام های اسلامی
                                </span>
                            </div>
                        </div>
                        <div>
                            <Image className='hidden 1230:flex' width={772} height={760} src={mainpic} alt='mainpic' />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default LandingPic