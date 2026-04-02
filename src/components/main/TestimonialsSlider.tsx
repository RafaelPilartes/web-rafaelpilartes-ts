// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, FreeMode } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

import { TestimonialsSectionProps } from '../../types/testimonials'
import { BsQuote } from 'react-icons/bs'

const TestimonialsSlider = ({ testimonials }: TestimonialsSectionProps) => {
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
      freeMode={true}
      pagination={{
        clickable: true
      }}
      modules={[FreeMode, Pagination]}
      className="h-[240px] sm:h-[340px] "
    >
      {testimonials.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="relative bg-[#55555525] h-max rounded-lg px-6 py-8 flex sm:flex-col gap-x-6 sm:gap-x-6 group cursor-pointer hover:bg-[#a9414126] transition-all duration-300 ">
              {/* Icon */}
              <div className="text-4xl text-accent mb-4">
                <BsQuote />
              </div>

              {/* Title & Description */}
              <div className="mb-8">
                <div className="max-w-[450px] leading-normal ">
                  {item.description}
                </div>
              </div>

              {/* avatar */}

              <div className="flex items-center space-x-4">
                <img
                  className="w-10 h-10 rounded-full"
                  width={40}
                  height={40}
                  src={item.photo}
                  alt=""
                />
                <div className="font-medium dark:text-white">
                  <div>{item.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {item.createAt}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export default TestimonialsSlider
