import { SectionTitle } from '../../../../components/main/SectionTitle'
import CustomersSlider from '../../CustomersSlider'
import { useCustomerViewModel } from '@/viewModels/customer.viewmodel'
import { Skeleton } from '../../ui/Skeleton'

export const HomeCustomers = () => {
  const { getAllCustomers } = useCustomerViewModel()
  const { data: response, isLoading, isError } = getAllCustomers()

  const customers = response?.data || []

  if (isError) return null

  return (
    <section id="customers" className="container py-16">
      <SectionTitle subtitle="clientes" title="Parceiros e clientes" />

      <div className="w-full gap-x-4 gap-y-6 mt-[60px] ">
        <div className="flex flex-col gap-x-8 ">
          <div className="w-full">
            {isLoading ? (
              <div className="flex gap-4 overflow-hidden">
                {Array.from({ length: 6 }).map((_, idx) => (
                   <Skeleton key={idx} className="w-[200px] h-24 rounded-2xl flex-shrink-0" />
                ))}
              </div>
            ) : customers.length > 0 ? (
              <CustomersSlider customers={customers} />
            ) : (
                <div className="text-center text-white/50 p-6 border border-white/10 rounded-2xl bg-white/5 w-full">
                   Nenhum parceiro registado
                </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
