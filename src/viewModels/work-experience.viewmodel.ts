import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { workExperienceUseCase } from '@/domain/usecases/WorkExperienceUseCase'
import { WorkExperienceEntity } from '@/core/entities/portfolio/WorkExperienceEntity'
import { toast } from 'sonner'

export const EXPERIENCE_KEYS = {
  all: ['work-experiences'] as const,
  lists: () => [...EXPERIENCE_KEYS.all, 'list'] as const,
  list: (filters: string) => [...EXPERIENCE_KEYS.lists(), { filters }] as const,
  details: () => [...EXPERIENCE_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...EXPERIENCE_KEYS.details(), id] as const
}

export const useWorkExperienceViewModel = () => {
  const queryClient = useQueryClient()

  const getAllExperiences = (limit?: number, offset?: number, searchTerm?: string) => {
    return useQuery({
      queryKey: EXPERIENCE_KEYS.list(JSON.stringify({ limit, offset, searchTerm })),
      queryFn: () => workExperienceUseCase.executeGetAll(limit, offset, searchTerm)
    })
  }

  const getExperienceById = (id: string) => {
    return useQuery({
      queryKey: EXPERIENCE_KEYS.detail(id),
      queryFn: () => workExperienceUseCase.executeGetById(id),
      enabled: !!id
    })
  }

  const createMutation = useMutation({
    mutationFn: (data: Omit<WorkExperienceEntity, 'id' | 'created_at' | 'updated_at'>) =>
      workExperienceUseCase.executeCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPERIENCE_KEYS.all })
      toast.success('Experiência criada com sucesso')
    },
    onError: (error: Error) => toast.error(`Erro: ${error.message}`)
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<WorkExperienceEntity> }) =>
      workExperienceUseCase.executeUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPERIENCE_KEYS.all })
      toast.success('Experiência atualizada com sucesso')
    },
    onError: (error: Error) => toast.error(`Erro: ${error.message}`)
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => workExperienceUseCase.executeDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPERIENCE_KEYS.all })
      toast.success('Experiência removida com sucesso')
    },
    onError: (error: Error) => toast.error(`Erro: ${error.message}`)
  })

  return {
    getAllExperiences, getExperienceById,
    createExperience: createMutation.mutateAsync, isCreating: createMutation.isPending,
    updateExperience: updateMutation.mutateAsync, isUpdating: updateMutation.isPending,
    deleteExperience: deleteMutation.mutateAsync, isDeleting: deleteMutation.isPending
  }
}
