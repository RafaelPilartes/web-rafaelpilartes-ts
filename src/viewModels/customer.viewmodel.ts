import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { customerUseCase } from '@/domain/usecases/CustomerUseCase'
import { CustomerEntity } from '@/core/entities/content/CustomerEntity'
import { toast } from 'sonner'

export const CUSTOMER_KEYS = {
  all: ['customers'] as const,
  lists: () => [...CUSTOMER_KEYS.all, 'list'] as const,
  list: (filters: string) => [...CUSTOMER_KEYS.lists(), { filters }] as const
}

export const useCustomerViewModel = () => {
  const queryClient = useQueryClient()

  const getAllCustomers = (limit?: number, offset?: number, searchTerm?: string) => {
    return useQuery({
      queryKey: CUSTOMER_KEYS.list(JSON.stringify({ limit, offset, searchTerm })),
      queryFn: () => customerUseCase.executeGetAll(limit, offset, searchTerm)
    })
  }

  const createMutation = useMutation({
    mutationFn: (data: Omit<CustomerEntity, 'id' | 'created_at' | 'updated_at'>) =>
      customerUseCase.executeCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMER_KEYS.all })
      toast.success('Cliente criado com sucesso')
    },
    onError: (error: Error) => toast.error(`Erro: ${error.message}`)
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CustomerEntity> }) =>
      customerUseCase.executeUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMER_KEYS.all })
      toast.success('Cliente atualizado com sucesso')
    },
    onError: (error: Error) => toast.error(`Erro: ${error.message}`)
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => customerUseCase.executeDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMER_KEYS.all })
      toast.success('Cliente removido com sucesso')
    },
    onError: (error: Error) => toast.error(`Erro: ${error.message}`)
  })

  return {
    getAllCustomers,
    createCustomer: createMutation.mutateAsync, isCreating: createMutation.isPending,
    updateCustomer: updateMutation.mutateAsync, isUpdating: updateMutation.isPending,
    deleteCustomer: deleteMutation.mutateAsync, isDeleting: deleteMutation.isPending
  }
}
