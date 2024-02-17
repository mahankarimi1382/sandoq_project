import React, { useEffect, useState } from 'react'
import logo from "../../../public/logo.png"
import Image from 'next/image'
import { useRouter } from 'next/router'
import { SyncLoader } from 'react-spinners'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Warning from '../../Warning'

function FirstPage() {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isDisable, setIsDisable] = useState(true)
    const [name, setName] = useState("")
    const [family, setFamily] = useState("")
    const [father_name, setFather_name] = useState("")
    const [national_id, setNational_id] = useState("")
    console.log()
    useEffect(() => {
        if (name && family && father_name && national_id !== "") {
            setIsDisable(false)
        }
    }, [father_name])

    return (
        <div dir='rtl' className=' w-full h-screen flex justify-center items-center'>

            <div className={` border-2 rounded-xl border-[#00008B] w-[513px] m-auto h-[425px] p-3 `}>
                <div className=' w-5/6 m-auto flex justify-center flex-col'>
                    <div className='flex items-center text-[16px] font-semibold justify-center gap-2'>
                        <span>صندوق قرض الحسنه امین</span>
                        <Image src={logo} width={45} height={22} alt='' />

                    </div>
                    <div className='flex flex-col mt-4 gap-3'>
                        <span className=' text-[16px] font-semibold '>لطفا اطلاعات خواسته شده را وارد کنید</span>
                        <input onChange={(e) => { setName(e.target.value) }} placeholder='نام' className=' h-[48px] p-3 placeholder:font-medium placeholder:text-[#5C5C5C] placeholder:text-[16px] border-[1.6px] rounded-xl border-[#00008B]' />
                        <input onChange={(e) => { setFamily(e.target.value) }} placeholder='نام خانوادگی' className=' h-[48px] p-3 border-[1.6px] rounded-xl border-[#00008B] placeholder:font-medium placeholder:text-[#5C5C5C] placeholder:text-[16px]' />
                        <input type='number' onChange={(e) => { setNational_id(e.target.value) }} placeholder=' کد ملی' className=' h-[48px] p-3 border-[1.6px] rounded-xl border-[#00008B] placeholder:font-medium placeholder:text-[#5C5C5C] placeholder:text-[16px]' />
                        <input onChange={(e) => { setFather_name(e.target.value) }} placeholder=' نام پدر' className=' h-[48px] p-3 border-[1.6px] rounded-xl border-[#00008B] placeholder:font-medium placeholder:text-[#5C5C5C] placeholder:text-[16px]' />
                        <button disabled={isDisable} className='h-[48px] text-white rounded-xl bg-[#00008B] flex items-center text-[20px] font-semibold justify-center'
                            onClick={() => {
                                console.log(typeof(national_id))
                                if (national_id.length !== 10) {
                                    Warning('کد ملی باید 10 رقم باشد')
                                    // toast.warning('کد ملی باید 10 رقم باشد', {
                                    //     position: "top-right",
                                    //     autoClose: 2500,
                                    //     hideProgressBar: false,
                                    //     closeOnClick: true,
                                    //     pauseOnHover: true,
                                    //     draggable: true,
                                    //     progress: undefined,
                                    //     theme: "colored",
                                    // });
                                    // <Warning/>
                                    // toast.warning('کد ملی باید 10 رقم باشد', {
                                    //     position: "top-right",
                                    //     autoClose: 2500,
                                    //     hideProgressBar: false,
                                    //     closeOnClick: true,
                                    //     pauseOnHover: true,
                                    //     draggable: true,
                                    //     progress: undefined,
                                    //     theme: "colored",
                                    //     });
                                } else {
                                    setIsLoading(true)
                                    let data = {
                                        name: name,
                                        family: family,
                                        national_id: national_id,
                                        father_name: father_name,
                                    }
                                    localStorage.setItem('UserData', JSON.stringify(data))
                                    router.push("SignUp/SendSms")
                                }

                            }} >
                            {isLoading ? (<SyncLoader color='white' size={8} />
                            ) : ("ثبت")}
                        </button>

                        <span className='text-[14px]'>
                            ورود شما به معنی پذیرش
                            <a className=' text-indigo-700'> قوانین صندوق </a>
                            می باشد
                        </span>
                        <ToastContainer />

                    </div>
                </div>
            </div>
        </div >
    )
}

export default FirstPage