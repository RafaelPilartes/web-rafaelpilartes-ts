import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../../../../components/main/SectionTitle'
import { useCustomerViewModel } from '@/viewModels/customer.viewmodel'
import { CustomerEntity } from '@/core/entities/content/CustomerEntity'
import { Skeleton } from '../../ui/Skeleton'
import { ClientsColumn, MarqueeItem } from '@/components/ui/clients-marquee'

export const HomeCustomers = () => {
  const { t } = useTranslation('home')
  const { getAllCustomers } = useCustomerViewModel()
  const { data: response, isLoading, isError } = getAllCustomers()

  const customers = response?.data || []

  if (isError) return null

  return (
    <section id="customers" className="container py-16">
      <SectionTitle
        subtitle={t('customers.subtitle')}
        title={t('customers.title')}
      />

      <div className="mt-[60px] w-full">
        {isLoading ? (
          <div className="flex justify-center gap-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className={`flex w-full max-w-xs flex-col gap-6 ${
                  idx === 1
                    ? 'hidden md:flex'
                    : idx === 2
                      ? 'hidden lg:flex'
                      : ''
                }`}
              >
                {Array.from({ length: 3 }).map((_, j) => (
                  <Skeleton key={j} className="h-20 w-full rounded-2xl" />
                ))}
              </div>
            ))}
          </div>
        ) : customers.length > 0 ? (
          (() => {
            const items: MarqueeItem[] = customers.map((c: CustomerEntity) => ({
              image: c.photo,
              name: c.name
            }))
            // Each column scrolls the full set, rotated so they don't line up.
            const rotate = (arr: MarqueeItem[], n: number) =>
              arr.length ? [...arr.slice(n), ...arr.slice(0, n)] : arr
            const third = Math.floor(items.length / 3)

            return (
              <div className="flex max-h-[460px] gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
                <ClientsColumn items={items} className="flex-1" duration={16} />
                <ClientsColumn
                  items={rotate(items, third)}
                  className="hidden flex-1 md:block"
                  duration={20}
                />
                <ClientsColumn
                  items={rotate(items, third * 2)}
                  className="hidden flex-1 lg:block"
                  duration={18}
                />
              </div>
            )
          })()
        ) : (
          <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-white/50">
            {t('customers.empty')}
          </div>
        )}
      </div>
    </section>
  )
}
