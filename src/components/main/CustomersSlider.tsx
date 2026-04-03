// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, FreeMode } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

import { CustomerEntity } from '@/core/entities/content/CustomerEntity'

const CustomersSlider = ({ customers }: { customers: CustomerEntity[] }) => {
  return (
    <Swiper
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 5
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 15
        }
      }}
      autoplay
      freeMode={true}
      pagination={{
        clickable: true
      }}
      modules={[FreeMode, Pagination]}
      className="h-[110px] sm:h-[190px] "
    >
      {customers.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="relative group h-[70%] bg-[#55555525] rounded-lg px-6 py-8 flex sm:flex-col items-center justify-center gap-x-6 sm:gap-x-6 group hover:bg-[#a9414126] grayscale cursor-grab active:cursor-grabbing hover:grayscale-0 transition-all duration-300 ">
              {/* avatar */}
              <img
                className="w-[65%] group-hover:scale-105 transition-all duration-300"
                width={400}
                height={400}
                src={item.photo}
                alt=""
              />
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export default CustomersSlider
