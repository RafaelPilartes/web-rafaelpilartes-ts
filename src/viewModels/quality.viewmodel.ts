import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { qualityUseCase } from '@/domain/usecases/QualityUseCase'
import { QualityEntity } from '@/core/entities/content/QualityEntity'
import { toast } from 'sonner'

export const QUALITY_KEYS = {
  all: ['qualities'] as const,
  lists: () => [...QUALITY_KEYS.all, 'list'] as const,
  list: (filters: string) => [...QUALITY_KEYS.lists(), { filters }] as const
}

export const useQualityViewModel = () => {
  const queryClient = useQueryClient()

  const getAllQualities = (limit?: number, offset?: number, searchTerm?: string) => {
    return useQuery({
      queryKey: QUALITY_KEYS.list(JSON.stringify({ limit, offset, searchTerm })),
      queryFn: () => qualityUseCase.executeGetAll(limit, offset, searchTerm)
    })
  }

  const createMutation = useMutation({
    mutationFn: (data: Omit<QualityEntity, 'id' | 'created_at' | 'updated_at'>) =>
      qualityUseCase.executeCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUALITY_KEYS.all })
      toast.success('Qualidade criada com sucesso')
    },
    onError: (error: Error) => toast.error(`Erro: ${error.message}`)
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<QualityEntity> }) =>
      qualityUseCase.executeUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUALITY_KEYS.all })
      toast.success('Qualidade atualizada com sucesso')
    },
    onError: (error: Error) => toast.error(`Erro: ${error.message}`)
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => qualityUseCase.executeDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUALITY_KEYS.all })
      toast.success('Qualidade removida com sucesso')
    },
    onError: (error: Error) => toast.error(`Erro: ${error.message}`)
  })

  return {
    getAllQualities,
    createQuality: createMutation.mutateAsync, isCreating: createMutation.isPending,
    updateQuality: updateMutation.mutateAsync, isUpdating: updateMutation.isPending,
    deleteQuality: deleteMutation.mutateAsync, isDeleting: deleteMutation.isPending
  }
}
