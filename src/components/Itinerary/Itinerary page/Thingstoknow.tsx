import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../ui/modal";
import InclusionModal from "./itinerary modal/InclusionModal";


export default function Thingstoknow() {
    const { isOpen, openModal, closeModal } = useModal();
    return (
        <>
            <section className=" bg-white rounded-lg mt-4 shadow-md">
                <div className="overflow-hidden" >
                    <div className="flex flex-col gap-2 lg:gap-2 rounded-lg bg-white p-6 ">
                        {/* Heading */}
                        <div className="flex justify-between">
                            <h2 className="text-2xl text-orange-600 font-bold">Things to know</h2>
                            <button
                                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-orange-600 shadow-theme-xs hover:bg-gray-300 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-orange-600 dark:hover:bg-gray/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto" onClick={openModal}
                            >
                                <svg
                                    className="fill-current"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                                        fill=""
                                    />
                                </svg>
                                Edit</button>
                        </div>


                        <span className="font-medium  text-sm">Before you go</span>
                        <hr className="border-gray-300" />
                        {/* Content */}
                        <div className="flex flex-col w-full ">
                            <div className="grid w-full grid-cols-1 gap-4  sm:grid-cols-3">
                                {/* Inclusions */}
                                <div className="flex flex-col space-y-4">
                                    <h3 className="font-bold text-lg">What's included</h3>
                                    <div className="flex flex-col space-y-2">
                                        <div className="flex flex-col p-4 rounded-lg border border-gray-200 space-y-1 justify-start">
                                            {/* Icon */}
                                            <div className="w-6 icon-transition">img</div>

                                            {/* Title */}
                                            <span className="font-semibold text-sm">Heading</span>

                                            {/* Description */}
                                            <div className="text-xs text-gray-600">
                                                <p>dsicription</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                                <div className="flex flex-col space-y-4">
                                    <h3 className="font-bold text-lg">What's not included</h3>
                                    <div className="flex flex-col space-y-2">
                                        <div className="flex flex-col p-4 rounded-lg border border-gray-200 space-y-1 justify-start">
                                            {/* Icon */}
                                            <div className="w-6 icon-transition">img</div>

                                            {/* Title */}
                                            <span className="font-semibold text-sm">Heading</span>

                                            {/* Description */}
                                            <div className="text-xs text-gray-600">
                                                <p>dsicription</p>
                                            </div>
                                        </div>
                                        <button className="text-sm font-medium text-orange-600" >
                                            Show less
                                        </button>
                                    </div>
                                </div>

                                {/* Things to Carry */}
                                <div className="flex flex-col space-y-4">
                                    <h3 className="font-bold text-lg">What to carry</h3>
                                    <div className="flex flex-col space-y-2">
                                        {/* yahaloop lage ga */}
                                        <div className="flex flex-col p-4 rounded-lg border border-gray-200 space-y-1 justify-start">
                                            {/* Icon */}
                                            <div className="w-6 icon-transition">img</div>

                                            {/* Title */}
                                            <span className="font-semibold text-sm">Heading</span>

                                            {/* Description */}
                                            <div className="text-xs text-gray-600">
                                                <p>Dsicription</p>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* View More Button */}

            </section>
            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
                <InclusionModal />
            </Modal>
        </>
    )
}