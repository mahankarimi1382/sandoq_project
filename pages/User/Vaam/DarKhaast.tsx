//@ts-nocheck
import Image from 'next/image'
import DashbordWhite from "@/public/Icons/DashbordWhite.png"
import DashbordBlack from "@/public/Icons/DashbordBlack.png"
import UserInfoWhite from "@/public/Icons/UserInfoWhite.png"
import UserInfoBlack from "@/public/Icons/UserInfoBlack.png"
import SepordehBlack from "@/public/Icons/SepordehBlack.png"
import SepordehWhite from "@/public/Icons/SepordehWhite.png"
import VaamBlack from "@/public/Icons/VaamBlack.png"
import VaamWhite from "@/public/Icons/VaamWhite.png"
import PayamBlack from "@/public/Icons/PayamBlack.png"
import PayamWhite from "@/public/Icons/PayamWhite.png"
import KhoroojBlack from "@/public/Icons/KhoroojBlack.png"
import KhoroojWhite from "@/public/Icons/KhoroojWhite.png"
import logo from "../../../public/logo.png"
import line from "../../../public/Line.png"
import bilbilak from "../../../public/bilbilak.png"
import { useRouter } from 'next/router'
import Menu from '@/pages/components/Menue/Menu'
import axios from 'axios'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { HashLoader, SyncLoader } from 'react-spinners'
import Sucses from '@/pages/Sucses'
import Eeror from '@/pages/Eeror'
function DarKhaast() {
    const router = useRouter()
    const pathName = usePathname()
    const [title_of_loan, setTitle_of_loan] = useState("")
    const [amount, setAmount] = useState("")
    const [description, setDescreption] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const fetchData = () => {
        const token = localStorage.getItem("Token")
        console.log(token)
        setIsLoading(true)
        axios.post(
            `https://familybank.v1r.ir/api/Auth/logout`,
            {

            }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        ).then(res => {
            console.log(res)
            setIsLoading(false)
            router.push("/")
        }).catch(err => {
            setIsLoading(false)
            console.log(err)
        })
    }
    const [SideBar, setSideBar] = useState([
        { id: 1, name: "داشبورد", white: DashbordWhite, black: DashbordBlack, pathName: "/User", isHover: false },
        { id: 2, name: "اطلاعات کاربر", white: UserInfoWhite, black: UserInfoBlack, pathName: "/User/UserInformation", isHover: false },
        { id: 3, name: "سپرده", white: SepordehWhite, black: SepordehBlack, pathName: "/User/Seporde", isHover: false },
        { id: 4, name: "وام", white: VaamWhite, black: VaamBlack, pathName: "/User/Vaam/VaamJaari", pathName2: "/User/Vaam/DarKhaast", isHover: false },
        { id: 5, name: "پیام ها", white: PayamWhite, black: PayamBlack, pathName: "/User/Message", isHover: false },
        { id: 6, name: "خروج", white: KhoroojWhite, black: KhoroojBlack, pathName: "/", isHover: false }


    ]
    )

    const checkIconOver = (i: any) => {
        let spreadList = [...SideBar]
        spreadList[i]["isHover"] = true
        setSideBar(spreadList)
    }

    const checkIconOut = (i: any) => {
        let spreadList = [...SideBar]
        spreadList[i]["isHover"] = false
        setSideBar(spreadList)
    }


    const pathname = usePathname()

    const fetchData2 = () => {
        const token = localStorage.getItem("Token")
        setIsLoading(true)
        axios.post(
            `https://familybank.v1r.ir/api/user/loan/add_loan`,
            {
                title_of_loan: title_of_loan,
                amount: amount,
                description: description
            }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        ).then(res => {
            setIsLoading(false)
            console.log(res.data[0].id)
            localStorage.setItem("vaamId", res.data[0].id)
            Sucses("درخواست شما با موفقیت ثبت شد")
            setTimeout(() => {
                router.push("/User/Vaam/VaamJaari")
            }, 3000);
        }).catch(err => {
            Eeror()
            setIsLoading(false)
            console.log(err)
        })
    }
    return (
        <div dir='rtl' className='flex'>

            <div className='w-[208px] h-[1024px] bg-[#00008B]'>
                {isLoading ? (<div className=' fixed flex items-center justify-center w-full bg-opacity-50 bg-gray-500 h-full z-20 '>
                    <HashLoader size={100} color='blue' loading={isLoading} />
                </div>) : (null)}
                <div className=' mt-4 flex gap-4 items-center flex-col'>
                    <Image height={62} width={124} alt='' src={logo} />
                    <Image alt='' src={line} />
                    <div className=' w-full'>
                        {SideBar.map((item: any, index: any) => {

                            return (
                                <div key={item.id}>

                                    <Link onClick={() => {
                                        if (item.id === 6) { fetchData() }
                                    }} onMouseOut={() => checkIconOut(index)} onMouseOver={() => checkIconOver(index)} href={item.pathName}
                                        className={`flex gap-2 w-full transition-all font-medium text-[17px] items-center h-[48px] rounded-md hover:bg-white hover:text-[#191970] group hover:w-[182px] hover:bg-opacity-[97%] ${(pathName === item.pathName2) ? 'text-[#191974] w-[181.5px] bg-white ' : 'text-white'}`}>
                                        <Image className='group-hover:h-9' width={5} height={30} src={bilbilak} alt='' />
                                        {pathName === item.pathName2 || item.isHover ? (<Image src={item.black} width={22} alt='' />
                                        ) : (<Image src={item.white} width={22} alt='' />
                                        )}
                                        {item.name}
                                    </Link>

                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
            <div className=' w-full flex flex-col'>
                <div className=' border-2 border-t-0 border-r-0 border-l-0 h-24 flex border-[#00008B] items-center'>
                    <div className=' w-5/6 m-auto flex items-center justify-end'>
                        <div className=' flex items-center justify-center text-[#00008B] text-base font-medium w-[149px] h-[41px] border-2 border-[#00008B] rounded-lg '>وام های تسویه شده</div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='flex gap-3 flex-col -mt-6'>
                        <div className=' w-11/12 m-auto flex gap-2'>
                            <Link href="/User/Vaam/VaamJaari" className={` ${pathname === '/User/Vaam/VaamJaari' && 'bg-[#191971] text-white'} w-[101px] h-[44px] rounded-lg flex items-center justify-center border-2 border-[#00008B] bg-white text-[#00008B] font-semibold text-[18px]`}>
                                وام جاری
                            </Link>
                            <Link href="/User/Vaam/Darkhaast" className={` ${pathname === '/User/Vaam/DarKhaast' && 'bg-[#191971] text-white'} flex items-center justify-center w-[138px] h-[44px]  text-[#00008B] border-2 border-[#00008B] rounded-lg font-semibold text-[18px] `}>درخواست وام</Link>
                        </div>
                        <div className=' w-5/6 flex flex-col gap-16 p-4 m-auto bg-gray-100 rounded-lg h-[328px]'>
                            <div>
                                <div className=' w-full flex items-center justify-center text-lg font-semibold'>درخواست وام</div>
                                <div className='  w-full flex justify-between items-center'>
                                    <span className=' font-semibold text-[16px] w-1/2'>عنوان</span>
                                    <span className=' font-semibold text-[16px] w-1/2'>توضیحات</span>

                                </div>
                                <div className='flex'>
                                    <div className=' w-1/2 flex flex-col gap-3'>
                                        <input onChange={(e) => setTitle_of_loan(e.target.value)} className=' text-[#5C5C5C] text-[14px] font-medium flex justify-start items-center p-2 bg-white rounded-lg w-[505px] h-[40px]' />
                                        <span className=' font-semibold text-[16px]'>مبلغ</span>
                                        <input onChange={(e) => { setAmount(e.target.value) }} className=' text-[#5C5C5C] text-[14px] font-medium flex justify-start items-center p-2 bg-white rounded-lg w-[505px] h-[40px]' />
                                    </div>
                                    <div className=' w-1/2'>
                                        <textarea onChange={(e) => setDescreption(e.target.value)} className=' resize-none p-3 text-[14px] font-medium w-[491px] h-[125px] rounded-lg bg-white' />

                                    </div>
                                </div>
                            </div>
                            <di v className=' w-full flex justify-center'>
                                <button onClick={() => {
                                    fetchData2()
                                }} className=' flex items-center justify-center bg-[#00008B] text-white rounded-lg w-[433px] h-[48px]'>{isLoading ? (<SyncLoader color='white' size={8} />
                                ) : ("ثبت")}</button>
                            </di>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DarKhaast