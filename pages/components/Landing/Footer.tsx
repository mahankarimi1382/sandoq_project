import Image from 'next/image'
import React from 'react'
import Enamad from '../../../public/Enamad.png'
import BaleLogo from "../../../public/BaleLogo.png"
import EitaLogo from "../../../public/EitaLogo.png"
function Footer() {
    return (
        <div className=' mt-16 w-full h-[322px] bg-[#0C0C37] flex flex-col'>
            <div className='flex w-full 900:w-4/5 900:m-auto mt-10 justify-center text-sm 900:justify-between'>
                <div className=' flex flex-col items-center text-white'>
                    <Image className=' w-10 900:w-[60px]' src={Enamad} alt='' />
                    <span className=' 900:text-[15px] 900:font-semibold'>نماد اعتماد الکترونیک</span>
                    <span className=' 900:text-[13px] 900:font-medium'>www.eNAMAD.ir</span>
                </div>
                <div className='flex justify-between w-3/5 900:w-1/2 px-6'>
                    <div className='flex flex-col'>
                        <span className=' text-white 900:font-semibold 900:text-[20px]'>کانال های اطلاع رسانی</span>
                        <div className='flex pt-4 gap-6'>
                            <Image src={BaleLogo} alt='' />
                            <span className=' text-white 900:text-[20px] 900:font-semibold'>sandogh_amin</span>
                        </div>
                        <div className='flex pt-4 gap-6'>
                            <Image src={EitaLogo} alt='' />
                            <span className=' text-white 900:text-[20px] 900:font-semibold'>sandogh_amin</span>
                        </div>

                    </div>
                    <div className='flex flex-col 900:text-[20px] 900:font-semibold'>
                        <span className=' text-white'>تماس با ما</span>
                        <span className=' text-white pt-4'>021-77981981</span>
                    </div>

                </div>
            </div>
            <div className=' w-4/5 m-auto'>
                <span className=' 900:font-semibold 900:text-[20px] text-white'>تمامی حقوق مادی و معنوی این سایت متعلق به صندوق قرض الحسنه امین است.</span>
            </div>
        </div>

    )
}

export default Footer