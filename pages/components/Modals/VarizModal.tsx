import Image from "next/image"
import samanBankIcon from "../../../public/Saman_Bank_logo.png"
import pasargadBankIcon from "../../../public/Bank_Pasargad_logo.png"

function VarizModal({ varizVal,setVarizVal }: any) {
    return (
        <div>
            {varizVal ? <div role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full justify-center p-4 sm:items-center sm:p-0">

                        <div dir="rtl" className=" w-[466px] h-[444px] overflow-hidden bg-[#EFEFEF] shadow-xl transition-all">
                            <div className=" p-5 gap-7 items-center flex flex-col">
                                <span className=" font-medium text-[18px]">مبلغ مورد نظر خود را وارد کنید</span>
                                <div className=" flex items-center gap-2">
                                    <input className=" rounded-lg w-[191px] h-[40px]" />
                                    <span className="text-[#6A6A6A] font-medium text-[18px]">ریال</span>
                                </div>
                                <span className=" text-[18px] font-medium">درگاه بانکی مورد نظر را انتخاب کنید</span>
                                <div className="flex gap-12">
                                    <div className="flex items-center gap-2">
                                        <div className=" bg-white w-[32px] h-[32px]"></div>
                                        <Image className=" w-[57px]" alt="" src={samanBankIcon} />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className=" bg-white w-[32px] h-[32px]"></div>
                                        <Image className=" w-[43px]" alt="" src={pasargadBankIcon} />
                                    </div>
                                </div>
                                <button  onClick={()=>{
                    setVarizVal(false)
                
                }}  className=" text-[16px] font-medium w-[148px] h-[36px] rounded-lg bg-[#ACACAC]">پرداخت</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : null}
        </div>
    )
}

export default VarizModal