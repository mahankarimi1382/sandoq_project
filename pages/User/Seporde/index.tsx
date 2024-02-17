//@ts-nocheck
import Menu from '@/pages/components/Menue/Menu'
import UserNav from '@/pages/components/UserComponent/dashbord/UserNav'
import React, { useEffect, useState } from 'react'
import uploadIcon from "../../../public/UploadIcon.png"
import Image from 'next/image'
import cardbilbilak from "../../../public/cardbilbilak.png"
import cardbilbilak2 from "../../../public/cardbilbilak2.png"
import cardBg from "../../../public/logo jadid2 2.png"
import amin from "../../../public/amin.png"
import VarizModal from '@/pages/components/Modals/VarizModal'
import BardashtModal from '@/pages/components/Modals/BardashtModal'
import Modal4 from '../../components/Modals/Modal4'
import axios from 'axios'
import { HashLoader } from 'react-spinners'
import { useRouter } from 'next/router'
import moment from 'moment-jalaali';

function index() {
    const [status, setStatus] = useState("")
    const router = useRouter()
    const [trancDetails, setTrancDetails] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [ann, setann] = useState()
    const [name, setName] = useState("")
    const [balance, setBalance] = useState("")
    const [modalVal, setModalVal] = useState(false)
    const [varizVal, setVarizVal] = useState(false)
    const [bardashtVal, setBardashtVal] = useState(false)
    useEffect(() => {
        const token = localStorage.getItem("Token")
        setIsLoading(true)
        axios.post(`http://familybank.v1r.ir/api/user/wallet/WalletBalance`,
            {},
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        ).then((res) => {
            setIsLoading(false)
            console.log(res)
            setBalance(res.data.balance)
            setName(res.data.fullName)
        }).catch((err) => {
            setIsLoading(false)
            console.log(err)
        })
        axios.get(`http://familybank.v1r.ir/api/user/transaction/showUserTransactions`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res)
            setTrancDetails(res.data)
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    const fetchData2 = () => {
        setIsLoading(true)
        const token = localStorage.getItem("Token")
        axios.post(`http://familybank.v1r.ir/api/user/transaction/paySubscription`,
            {},
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        ).then((res) => {
            console.log(res)
            setIsLoading(false)
            router.push(res.data.paymentUrl)


        }).catch((err) => {
            setIsLoading(false)
            console.log(err)
        })
    }
    const checkstatus = (status) => {
        switch (status) {
            case "failed":
                return "نا موفق"
            case "success":
                return "موفق"
            case "Pending":
                return "درحال بررسی"
            default:
                break;
        }
    }

    return (
        <div dir='rtl' className='flex'>
            {isLoading && (
                <div className=' fixed flex items-center justify-center w-full bg-opacity-50 bg-gray-500 h-full z-20 '>
                    <HashLoader size={100} color='blue' />
                </div>)}
            <Menu />
            <div className=' w-full flex flex-col'>
                <UserNav />
                <div className=' w-5/6 flex flex-col mt-2 m-auto gap-4 justify-between'>
                    <VarizModal setVarizVal={setVarizVal} varizVal={varizVal} />
                    <BardashtModal setBardashtVal={setBardashtVal} bardashtVal={bardashtVal} />
                    <Modal4 setModalVal={setModalVal} modalVal={modalVal} />
                    <div className=' justify-between gap-9 flex'>
                        <div className=' gap-3 min-w-[528px] h-[378px] p-8 flex flex-col justify-center items-center bg-gray-100'>
                            <div onClick={() => setModalVal(true)} className=' flex flex-col justify-center items-center border-dashed rounded-md border-[#3B82F6] border-2 w-[280px] h-[213.75px]'>
                                <Image width={70} src={uploadIcon} alt='' />
                                <span className=' text-gray-800 text-[16px] font-medium'>روی تصویر کلیک کنید </span>
                                <span className=' text-gray-400 text-[14px] font-medium'>حجم فایل حداکثر پنج مگابایت باشد</span>
                            </div>
                            <span className=' text-[16px] font-normal'>در صورتی که تمایل دارید مبلغ مورد نظر را به روش دیگری پرداخت کنید لطفا رسید پرداخت خود به حساب ذیل را در سامانه بارگزاری کنید.</span>
                            <div className='flex w-full flex-col'>

                            </div>

                        </div>
                        <div className=' min-w-[528px] h-[378px] p-8 flex flex-col justify-center items-center bg-gray-100'>
                            <div className=' flex-col flex gap-3'>
                                <div className=' p-2 flex flex-col justify-center items-center bg-white w-[345px] h-[190px] rounded-xl'>
                                    <div className=' w-full flex justify-between'>
                                        <Image width={40} src={cardbilbilak} alt='' />
                                        <Image width={40} src={cardbilbilak2} alt='' />
                                    </div>
                                    <Image width={238} src={cardBg} alt='' />
                                    <div className=' absolute  flex flex-col'>
                                        <span>{balance} ریال</span>
                                        <span> {name}</span>
                                    </div>
                                    <div dir='ltr' className=' w-full'>
                                        <Image src={amin} alt='' />
                                    </div>
                                </div>
                                <button onClick={() => {
                                    // setVarizVal(true)
                                    fetchData2()
                                }} className=' flex items-center justify-center font-semibold text-[16px] text-white w-[343px] h-[40px] bg-[#0000BF] rounded-lg'>واریز</button>
                                <span className=' text-[#00008B] flex text-[11px] font-normal'>مبلغ حق عضویت ماهانه
                                    <span className=' text-[#D02323]'>2,500,000</span>
                                    ریال
                                </span>
                                <button onClick={() => {
                                    setBardashtVal(true)
                                }} className=' w-[343px] h-[40px] text-[16px] font-semibold text-[#FF3D3D] border-[#FF3D3D] border-[1.5px] rounded-lg '>برداشت</button>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-3 flex-col p-3 min-w-[1092px] bg-gray-100 h-[482px]'>
                        <select className=' bg-[white] w-[198px] min-h-[44px] rounded-lg text-[#00008B] p-2 border-2 border-indigo-600 flex items-center justify-center' name='انتخاب بازه ی زمانی'>
                            <option>یک ماه اخیر</option>
                            <option>3 ماه اخیر</option>
                            <option> یک سال اخیر</option>
                        </select>
                        <div className=' font-semibold items-center justify-around text-[16px] text-[#00008B] flex bg-white w-full min-h-[44px] rounded-lg'>
                            <span className=' flex  justify-center w-[108px]'>وضعیت تراکنش</span>
                            <span className=' w-[100px] flex justify-center'>تاریخ</span>
                            <span className=' w-[100px] flex justify-center'>عنوان</span>
                            <span className=' w-[150px] flex justify-center'>کد رهگیری</span>
                            <span className=' w-[120px] flex justify-center'>مبلغ</span>
                        </div>
                        <div className='flex flex-col gap-1 no-scrollbar overflow-y-auto '>
                            {trancDetails.length !== 0 ? (<div>
                                {trancDetails.map((item: any) => {
                                    return (
                                        <div className=' items-center justify-around min-h-[44px] bg-white rounded-lg flex' key={item.id}>
                                            <span className=' flex  justify-center w-[108px]'>{checkstatus(item.status)}</span>
                                            <span className='w-[100px] flex justify-center'>{moment(item.created_at, 'YYYY-MM-DD').format('jYYYY/jMM/jDD')}</span>
                                            <span className=' w-[100px] flex justify-center'>{item.type === "installment" ? ("قسط وام") : ("قسط صندوق")}</span>
                                            {item.gateway_result ? (<span className=' w-[150px] flex justify-center'>{item.gateway_result.reference_id && item.gateway_result.reference_id}</span>) : (<span className='w-[150px]'></span>)}

                                            <div className=' w-[120px] flex justify-center'>{item.Price}</div>
                                        </div>
                                    )
                                })}
                            </div>) : (<div className=' flex items-center justify-center'>شما تراکنشی ندارید</div>)}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index