import React, { useState } from 'react'
import Image from 'next/image'
import UsersAcWhite from "@/public/AdminIcons/UsersAcWhite.png"
import UsersAcBlack from "@/public/AdminIcons/UsersAcBlack.png"
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
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NotifModal from '../Modals/NotifModal';

function UsersAcount() {
    const [SideBar, setSideBar] = useState([
        { id: 1, name: "حساب کاربران", white: UsersAcWhite, black: UsersAcBlack, pathName: "/Admin/UsersAcount", isHover: false },
        { id: 2, name: "گردش مالی", white: UserInfoWhite, black: UserInfoBlack, pathName: "/Admin/Gardesh", isHover: false },
        { id: 3, name: "وام ها", white: SepordehWhite, black: SepordehBlack, pathName: "/Admin/Vaamha", isHover: false },
        { id: 4, name: "درخواست ها", white: VaamWhite, black: VaamBlack, pathName: "/Admin/Requests" },
        { id: 5, name: "ایجاد اعلان", white: PayamWhite, black: PayamBlack, pathName: "", isHover: false },
        { id: 6, name: "خروج", white: KhoroojWhite, black: KhoroojBlack, pathName: "/", isHover: false }


    ]
    )
    const [notifModal, setNotifModal] = useState(false)

    const pathName = usePathname()
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
    return (
        <div className='  w-[208px] h-[1024px] bg-[#00008B]'>
            <NotifModal notifModal={notifModal} setNotifModal={setNotifModal} />
            <div className=' mt-4 flex gap-4 items-center flex-col'>
                <Image height={62} width={124} alt='' src={logo} />
                <Image alt='' src={line} />
                {SideBar.map((item: any, index: any) => {

                    return (
                        <div key={item.id}>

                            <Link onClick={() => {
                                if (item.id === 5) {
                                    setNotifModal(true)
                                }
                            }}
                                onMouseOut={() => checkIconOut(index)} onMouseOver={() => checkIconOver(index)}
                                href={item.pathName}
                                className={`flex gap-2 w-[181.5px] transition-all font-medium text-[17px] items-center h-[48px] rounded-md hover:bg-white hover:text-[#191970] group hover:w-[181px] hover:bg-opacity-[97%] ${(pathName === item.pathName) ? 'text-[#191974] w-[181px] bg-white ' : 'text-white'}`}>
                                <Image className='group-hover:h-9' width={5} height={30} src={bilbilak} alt='' />
                                {pathName === item.pathName || item.isHover ? (<Image src={item.black} width={22} alt='' />
                                ) : (<Image src={item.white} width={22} alt='' />
                                )}
                                {item.name}
                            </Link>

                        </div>
                    )
                })}
            </div>

        </div>)
}

export default UsersAcount