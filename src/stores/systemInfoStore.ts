import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface SystemInfoState {
  entryPoint: string
  workplaceId: string
  addEntryPoint: (entryPointNew: string) => void
  addWorkplaceId: (workplaceIdNew: string) => void
  removeEntryPoint: () => void
  removeWorkplace: () => void
}

export const useSystemStore = create<SystemInfoState>()(
  devtools(
    persist(
      set => ({
        entryPoint: '',
        workplaceId: '',

        addEntryPoint: entryPointNew => {
          set(() => ({ entryPoint: entryPointNew }))
        },
        addWorkplaceId: workplaceIdNew => {
          set(() => ({ workplaceId: workplaceIdNew }))
        },
        removeEntryPoint: () => {
          set(() => ({ entryPoint: '' }))
        },
        removeWorkplace: () => {
          set(() => ({ workplaceId: '' }))
        }
      }),
      {
        name: 'systemInfo-storage'
      }
    )
  )
)
