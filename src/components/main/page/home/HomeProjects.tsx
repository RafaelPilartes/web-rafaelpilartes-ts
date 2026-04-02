import { SectionTitle } from '../../../../components/main/SectionTitle'
import { ButtonBase } from '../../../../components/main/ButtonBase'

export const HomeProjects = () => {
  return (
    <section className="container relative py-16">
      <SectionTitle subtitle="projetos" title="Veja os meus" />
      {/* <div className="w-full gap-x-4 gap-y-6 mt-[60px] "> */}
      <div className="flex flex-col lg:flex-row gap-x-10">
        <div className="flex-1 flex flex-col gap-y-12 mb-10 lg:mb-0 ">
          {/* Text */}
          <div className="flex-1">
            <h2 className="h2 leading-tight text-accent">Últimos projetos.</h2>
            <p className="max-w-lg mb-6 mt-6">
              Explore a galeria de projetos inspiradores. Cada trabalho reflete
              meu compromisso com a excelência e criatividade. Seja o próximo
              sucesso nesta jornada!!
            </p>
            <ButtonBase onClick={() => (window.location.href = '/work')}>
              Ver todo os projetos
            </ButtonBase>
          </div>

          {/* Image */}
          <a
            href="/work/slug"
            className="flex-1 group relative overflow-hidden border-2 border-white/50 rounded-xl  "
          >
            {/* Overloy */}
            <div className="group-hover:bg-black/70 w-full h-full absolute z-40 transition-all duration-300 "></div>

            {/* Image */}
            <img
              src={'/thumb3.jpg'}
              width={800}
              height={800}
              alt="Rafael Project"
              className="group-hover:scale-125 transition-all duration-500"
            />
            {/* Pretitle */}
            <div className="absolute -bottom-full left-12 group-hover:bottom-24 transition-all duration-500 z-50 ">
              <span className="text-[1.3rem] text-accent font-semibold">
                UI/UX Design
              </span>
            </div>
            {/* Title */}
            <div className="absolute -bottom-full left-12 group-hover:bottom-14 transition-all duration-700 z-50 ">
              <span className="text-3xl text-white">Project Title</span>
            </div>
          </a>
        </div>
        <div className="flex-1 flex flex-col gap-10">
          {/* Image */}
          <a
            href="/work/slug"
            className="group relative overflow-hidden border-2 border-white/50 rounded-xl  "
          >
            {/* Overloy */}
            <div className="group-hover:bg-black/70 w-full h-full absolute z-40 transition-all duration-300 "></div>

            {/* Image */}
            <img
              src={'/thumb4.jpg'}
              width={800}
              height={800}
              alt="Rafael Project"
              className="group-hover:scale-125 transition-all duration-500"
            />
            {/* Pretitle */}
            <div className="absolute -bottom-full left-12 group-hover:bottom-24 transition-all duration-500 z-50 ">
              <span className="text-[1.3rem] text-accent font-semibold">
                UI/UX Design
              </span>
            </div>
            {/* Title */}
            <div className="absolute -bottom-full left-12 group-hover:bottom-14 transition-all duration-700 z-50 ">
              <span className="text-3xl text-white">Project Title</span>
            </div>
          </a>

          <a
            href="/work/slug"
            className="group relative overflow-hidden border-2 border-white/50 rounded-xl  "
          >
            {/* Overloy */}
            <div className="group-hover:bg-black/70 w-full h-full absolute z-40 transition-all duration-300 "></div>

            {/* Image */}
            <img
              src={'/thumb2.jpg'}
              width={800}
              height={800}
              alt="Rafael Project"
              className="group-hover:scale-125 transition-all duration-500"
            />
            {/* Pretitle */}
            <div className="absolute -bottom-full left-12 group-hover:bottom-24 transition-all duration-500 z-50 ">
              <span className="text-[1.3rem] text-accent font-semibold">
                UI/UX Design
              </span>
            </div>
            {/* Title */}
            <div className="absolute -bottom-full left-12 group-hover:bottom-14 transition-all duration-700 z-50 ">
              <span className="text-3xl text-white">Project Title</span>
            </div>
          </a>
        </div>
      </div>
      {/* </div> */}
    </section>
  )
}
