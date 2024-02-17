
import UserNav from '../components/UserComponent/dashbord/UserNav';

import AdminMenu from '../components/Menue/AdminMenu';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { HashLoader } from 'react-spinners';
import Togle from '../components/Togle';
import ShowUserModal from '../components/Modals/ShowUserModal';

function index() {
    const [val, setVal] = useState(false)
    const [checked, setChecked] = useState(true);
    console.log(checked)
    const [isLoading, setIsloading] = useState(false)
    const [usersInfo, setUsersInfo] = useState([])
    const [userId, setUserId] = useState("")
    useEffect(() => {
        setIsloading(true)
        const token = localStorage.getItem("Token")

        axios.get(`http://familybank.v1r.ir/api/admin/all_users`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then((res) => {
            console.log(res.data.data)
            setIsloading(false)
            console.log(res.data.users_info)
            setUsersInfo(res.data.data)
        }).catch((err) => {
            setIsloading(false)
            console.log(err)
        })
    }, [])
    return (
        <div dir='rtl' className='flex'>
            {isLoading && (
                <div className=' fixed flex items-center justify-center w-full bg-opacity-50 bg-gray-500 h-full z-20 '>
                    <HashLoader size={100} color='blue' />
                </div>)}
            <AdminMenu />
            <div className=' w-full flex flex-col'>
                <UserNav />
                <div className=' mx-auto mt-20 w-[1056px] flex flex-col gap-1'>
                    <div className='flex text-[18px] rounded-lg h-[48px] font-semibold bg-gray-100 min-w-full justify-between items-center'>
                        <span className=' flex justify-center w-[150px]'>نام</span>
                        <span className=' flex justify-center w-[150px]'>نام خانوادگی</span>
                        <span className='flex justify-center w-[150px]'> نام پدر</span>
                        <span className='flex justify-center w-[150px]'> کد ملی</span>
                        <span className='flex justify-center w-[150px]'>شماره تماس</span>
                        <span className='flex justify-center w-[150px]'>وضعیت</span>
                        <span className='flex justify-center h-2 w-[150px]'></span>
                    </div>
                    <div>
                        {usersInfo.map((item: any) => {


                            return (
                                <div key={item.id} className=' w-full h-[48px] items-center flex rounded-lg justify-between text-[18px] font-normal even:bg-gray-100'>
                                    <span className='  flex justify-center w-[150px]'>{item.name}</span>
                                    <span className=' flex justify-center w-[150px]'>{item.family}</span>
                                    <span className=' flex justify-center w-[150px]'>{item.father_name}</span>
                                    <span className=' flex justify-center w-[150px]'>{item.national_id}</span>
                                    <span className=' flex justify-center w-[150px]'>{item.phone_number}</span>

                                    <div className=' w-[150px] flex items-center justify-center'>
                                        <Togle userId={item.id} status={item.status} />
                                    </div>

                                    <span onClick={() => {
                                        console.log(item)
                                        setUserId(item.id)
                                        setVal(true)
                                    }} className=' font-medium text-[20px] w-[150px] text-[#00008B]'>مشاهده کاربر</span>
                                </div>
                            )
                        })}
                        <ShowUserModal userId={userId} val={val} setVal={setVal} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index