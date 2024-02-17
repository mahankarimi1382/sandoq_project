import Image from "next/image"
import star from "../../../public/star.png"
import starBlue from "../../../public/starBlue.png"
function BardashtModal({ bardashtVal, setBardashtVal }: any) {
    return (
        <div>
            {bardashtVal ? <div role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full justify-center p-4 sm:items-center sm:p-0">

                        <div dir="rtl" className=" rounded-xl w-[666px] h-[514px] overflow-hidden bg-white shadow-xl transition-all">
                            <div className="flex p-5 gap-2 items-center flex-col">
                                <span onClick={()=>{setBardashtVal(false)}} className=" font-semibold text-[20px]">برداشت</span>
                                <div className=" gap-4 w-full flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <Image className=" h-[15px] w-[15px]" alt="" src={star} />
                                        <span className="text-[14px] font-thin text-red-600">برداشت پول  به معنای بسته شدن حساب میباشد</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Image className=" h-[15px] w-[15px]" alt="" src={starBlue} />
                                        <span className="text-[14px] font-thin text-blue-800">شماره حساب باید به نام صاحب حساب باشد</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Image className=" h-[15px] w-[15px]" alt="" src={starBlue} />
                                        <span className="text-[14px] font-thin text-blue-800">مبلغ مورد نظر بلافاصله واریز نمی‌شود و پس از تایید مدیر صندوق انجام خواهد شد.ضمنا مبلغ مورد نظر پس از تامین اعتبار توسط صندوق واریز خواهد شد.</span>
                                    </div>
                                    <div className="flex items-center gap-10">
                                        <div className=" w-[24px] h-[24px] bg-white border-[1.5px] rounded-md border-indigo-700"></div>
                                        <span>واریز به حساب ثبت شده</span>
                                    </div>
                                    <div className="flex items-center gap-10">
                                        <div className=" w-[24px] h-[24px] bg-white border-[1.5px] rounded-md border-indigo-700"></div>
                                        <span>واریز به حساب</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : null}
        </div>
    )
}

export default BardashtModal