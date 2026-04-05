import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { technologyUseCase } from '@/domain/usecases/TechnologyUseCase'
import { TechnologyEntity } from '@/core/entities/portfolio/TechnologyEntity'
import { toast } from 'sonner'

export const TECHNOLOGY_KEYS = {
  all: ['technologies'] as const,
  lists: () => [...TECHNOLOGY_KEYS.all, 'list'] as const,
  list: (filters: string) => [...TECHNOLOGY_KEYS.lists(), { filters }] as const
}

export const useTechnologyViewModel = () => {
  const queryClient = useQueryClient()

  const getAllTechnologies = (limit?: number, offset?: number, searchTerm?: string) => {
    return useQuery({
      queryKey: TECHNOLOGY_KEYS.list(JSON.stringify({ limit, offset, searchTerm })),
      queryFn: () => technologyUseCase.executeGetAll(limit, offset, searchTerm)
    })
  }

  const createMutation = useMutation({
    mutationFn: (data: Omit<TechnologyEntity, 'id' | 'created_at' | 'updated_at'>) =>
      technologyUseCase.executeCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TECHNOLOGY_KEYS.all })
      toast.success('Tecnologia criada com sucesso')
    },
    onError: (error: Error) => toast.error(`Erro: ${error.message}`)
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TechnologyEntity> }) =>
      technologyUseCase.executeUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TECHNOLOGY_KEYS.all })
      toast.success('Tecnologia atualizada com sucesso')
    },
    onError: (error: Error) => toast.error(`Erro: ${error.message}`)
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => technologyUseCase.executeDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TECHNOLOGY_KEYS.all })
      toast.success('Tecnologia removida com sucesso')
    },
    onError: (error: Error) => toast.error(`Erro: ${error.message}`)
  })

  return {
    getAllTechnologies,
    createTechnology: createMutation.mutateAsync, isCreating: createMutation.isPending,
    updateTechnology: updateMutation.mutateAsync, isUpdating: updateMutation.isPending,
    deleteTechnology: deleteMutation.mutateAsync, isDeleting: deleteMutation.isPending
  }
}
