import Aos from 'aos'
import { useEffect } from 'react'

function FourOhFour() {
  useEffect(() => {
    Aos.init({ duration: 1500 })
  }, [])

  return (
    <>
      <div className="w-full py-12 px-6 flex flex-col items-center justify-center gap-6 text-center ">
        <img
          src="/illustration/404.png"
          alt="Rafael Pilartes - Not found"
          className="w-full max-w-xl animate-bounce-slow "
        />

        <h1 className="text-4xl font-semibold max-w-s-520:text-2xl ">
          Ops... Página não encontrada!
        </h1>
        <p className="text-base ">
          A página que você procura não existe. Por favor, retorne à página
          inicial.
        </p>

        <div className="w-full max-w-xs flex"></div>
      </div>
    </>
  )
}

export default FourOhFour
