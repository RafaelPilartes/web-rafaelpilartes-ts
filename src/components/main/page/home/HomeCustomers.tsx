import { SectionTitle } from '../../../../components/main/SectionTitle'
import CustomersSlider from '../../CustomersSlider'
import { mockCustomers } from '@/core/mocks/customersMock'

export const HomeCustomers = () => {
  return (
    <section className="container py-16">
      <SectionTitle subtitle="clientes" title="Parceiros e clientes" />

      <div className="w-full gap-x-4 gap-y-6 mt-[60px] ">
        <div className="flex flex-col gap-x-8 ">
          <div className="w-full">
            <CustomersSlider customers={mockCustomers} />
          </div>
        </div>
      </div>
    </section>
  )
}
