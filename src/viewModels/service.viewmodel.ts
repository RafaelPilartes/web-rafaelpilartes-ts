import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { serviceUseCase } from '@/domain/usecases/ServiceUseCase'
import { ServiceEntity } from '@/core/entities/content/ServiceEntity'
import { toast } from 'sonner'

export const SERVICE_KEYS = {
  all: ['services'] as const,
  lists: () => [...SERVICE_KEYS.all, 'list'] as const,
  list: (filters: string) => [...SERVICE_KEYS.lists(), { filters }] as const
}

export const useServiceViewModel = () => {
  const queryClient = useQueryClient()

  const getAllServices = (limit?: number, offset?: number, searchTerm?: string) => {
    return useQuery({
      queryKey: SERVICE_KEYS.list(JSON.stringify({ limit, offset, searchTerm })),
      queryFn: () => serviceUseCase.executeGetAll(limit, offset, searchTerm)
    })
  }

  const createMutation = useMutation({
    mutationFn: (data: Omit<ServiceEntity, 'id' | 'created_at' | 'updated_at'>) =>
      serviceUseCase.executeCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SERVICE_KEYS.all })
      toast.success('Serviço criado com sucesso')
    },
    onError: (error: Error) => toast.error(`Erro: ${error.message}`)
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ServiceEntity> }) =>
      serviceUseCase.executeUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SERVICE_KEYS.all })
      toast.success('Serviço atualizado com sucesso')
    },
    onError: (error: Error) => toast.error(`Erro: ${error.message}`)
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => serviceUseCase.executeDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SERVICE_KEYS.all })
      toast.success('Serviço removido com sucesso')
    },
    onError: (error: Error) => toast.error(`Erro: ${error.message}`)
  })

  return {
    getAllServices,
    createService: createMutation.mutateAsync, isCreating: createMutation.isPending,
    updateService: updateMutation.mutateAsync, isUpdating: updateMutation.isPending,
    deleteService: deleteMutation.mutateAsync, isDeleting: deleteMutation.isPending
  }
}
