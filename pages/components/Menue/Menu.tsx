//@ts-nocheck
import React, { useEffect, useState } from 'react'
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
import { LuHome } from "react-icons/lu";
import { GoPerson } from "react-icons/go";
import { LuWallet } from "react-icons/lu";
import { GiWallet } from "react-icons/gi";
import { BiMessageRoundedDots } from "react-icons/bi";
import { TbLogout } from "react-icons/tb";
import { IoMdNotifications } from "react-icons/io";
import logo from "../../../public/logo.png"
import line from "../../../public/Line.png"
import bilbilak from "../../../public/bilbilak.png"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router'
import axios from 'axios'
import { HashLoader } from 'react-spinners'
function Menu() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const fetchData = () => {
        const token=localStorage.getItem("Token")
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
        { id: 4, name: "وام", white: VaamWhite, black: VaamBlack, pathName: "/User/Vaam/VaamJaari", pathName2:"/User/Vaam/DarKhaast", isHover: false },
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

    const pathName = usePathname()
    return (
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
                                 className={`flex gap-2 w-[181.5px] transition-all font-medium text-[17px] items-center h-[48px] rounded-md hover:bg-white hover:text-[#191970] group hover:w-[182px] hover:bg-opacity-[97%] ${(pathName === item.pathName) ? 'text-[#191974] w-[181.5px] bg-white ' : 'text-white'}`}>
                                    <Image className='group-hover:h-9' width={5} height={30} src={bilbilak} alt='' />
                                    {pathName === item.pathName  || item.isHover ? (<Image src={item.black} width={22} alt='' />
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
    )
}

export default Menu