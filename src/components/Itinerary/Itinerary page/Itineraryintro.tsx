import { useState } from "react"
import { Modal } from "../../ui/modal"
import Intromodal from "./itinerary modal/Intromodal"
import { useModal } from "../../../hooks/useModal";

export default function Itineraryintro() {
  const [isOpentext, setOpne] = useState(false)
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <>
      <section className=" bg-white rounded-lg mt-2  shadow-md">
        <div className="overflow-hidden" >
          <div className="flex flex-col gap-4 lg:gap-5 rounded-lg bg-white p-6 ">
            {/* Heading */}
            <div className="flex justify-between">
              <h1 className="text-3xl text-orange-600 font-bold lg:text-4xl lg:font-bold">This is itinerary Title</h1>
              <button
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-xs font-medium text-orange-600 shadow-theme-xs hover:bg-gray-300 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-orange-600 dark:hover:bg-gray/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto" onClick={openModal}
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

            <hr className="border-gray-300" />

            {/* Content */}
            <div className="flex flex-col gap-4 text-gray-700 text-sm lg:text-base ">
              <p className={`${isOpentext ? "" : "line-clamp-6"}`} >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente natus accusamus debitis expedita. Nobis quis qui facilis corrupti, commodi laborum doloribus animi enim?
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere, amet repellat omnis perspiciatis nemo eveniet nulla magni maxime eligendi ipsam aliquam rerum excepturi vel.              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere in hic quo beatae quas aliquam, maiores quisquam fugiat harum eum sit dolor quasi et necessitatibus, quam vel? Aliquam, mollitia Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus autem quas a nostrum sunt omnis rem totam natus? Nihil reiciendis dolor, optio fugiat voluptate autem ipsa vero et soluta atque?Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quibusdam totam dolor, distinctio repudiandae vel neque repellendus, quos iusto asperiores voluptatibus nihil. Exercitationem neque eos, cumque eligendi quas a ab?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur odit alias libero voluptates ab. Nobis fugiat quia optio voluptates, praesentium a voluptatem, quis sapiente vitae, perspiciatis sequi doloribus quaerat modi.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa temporibus odit eaque delectus ducimus quae ipsum iste tenetur minima molestias, modi accusantium dolores placeat maiores adipisci pariatur quaerat ex nesciunt Lorem ipsum, dolor sit amet consectetur adipisicing elit. A et excepturi, nobis itaque voluptatibus optio. Laborum voluptate et, laudantium autem repellat tenetur velit ipsa illum magnam dolore! Maiores, sed at.
              </p>


            </div>
            <div className="text-center lg:text-right lg:pr-4 ">
              <button className="text-sm font-medium text-orange-600 hover:underline lg:text-base" onClick={() => { setOpne(!isOpen) }}>View {isOpen ? <>Less</> : <>More</>}</button>
            </div>
          </div>
        </div>
        {/* View More Button */}
      </section>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
      <Intromodal/>
      </Modal>
    </>
  )
}