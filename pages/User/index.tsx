//@ts-nocheck
import React, { useState } from 'react'
import Menu from '../components/Menue/Menu';
import LastTransAction from '../components/UserComponent/dashbord/LastTransAction';
import VaamJaari from '../components/UserComponent/dashbord/VaamJaari';
import AcountInfo from '../components/UserComponent/dashbord/AcountInfo';
import UserNav from '../components/UserComponent/dashbord/UserNav';
import UserChart from '../components/UserComponent/dashbord/UserChart';
import { HashLoader } from 'react-spinners';
import { useScroll } from 'react-spring';

function index() {


    const [isLoading, setIsLoading] = useState(false)
    return (
        <div dir='rtl' className='flex'>
            <Menu />
            <div className=' w-full flex flex-col'>
                <UserNav />
                <div className=' w-5/6 flex flex-col mt-16 m-auto gap-4 justify-between'>
                    <div className='flex justify-between'>
                        <LastTransAction />
                        <VaamJaari setIsLoading={setIsLoading} />
                    </div>
                    <div className='flex justify-between'>
                        <AcountInfo />
                        <UserChart />
                    </div>
                </div>
            </div>
            {isLoading ? (<div className=' fixed flex items-center justify-center w-full bg-opacity-50 bg-gray-500 h-full z-20'>
                <HashLoader size={100} color='blue' loading={isLoading} />
            </div>) : (null)}

        </div>
    )
}

export default index