import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { projectUseCase } from '@/domain/usecases/ProjectUseCase'
import { ProjectEntity } from '@/core/entities/portfolio/ProjectEntity'
import { toast } from 'sonner'

export const PROJECT_KEYS = {
  all: ['projects'] as const,
  lists: () => [...PROJECT_KEYS.all, 'list'] as const,
  list: (filters: string) => [...PROJECT_KEYS.lists(), { filters }] as const,
  details: () => [...PROJECT_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...PROJECT_KEYS.details(), id] as const
}

export const useProjectViewModel = () => {
  const queryClient = useQueryClient()

  const getAllProjects = (limit?: number, offset?: number, searchTerm?: string, filters?: Partial<ProjectEntity>) => {
    return useQuery({
      queryKey: PROJECT_KEYS.list(JSON.stringify({ limit, offset, searchTerm, filters })),
      queryFn: () => projectUseCase.executeGetAll(limit, offset, searchTerm, filters)
    })
  }

  const getProjectById = (id: string) => {
    return useQuery({
      queryKey: PROJECT_KEYS.detail(id),
      queryFn: () => projectUseCase.executeGetById(id),
      enabled: !!id
    })
  }

  const createMutation = useMutation({
    mutationFn: (data: Omit<ProjectEntity, 'id' | 'created_at' | 'updated_at'>) =>
      projectUseCase.executeCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.all })
      toast.success('Projeto criado com sucesso')
    },
    onError: (error: Error) => toast.error(`Erro ao criar projeto: ${error.message}`)
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProjectEntity> }) =>
      projectUseCase.executeUpdate(id, data),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.all })
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.detail(data.id) })
      toast.success('Projeto atualizado com sucesso')
    },
    onError: (error: Error) => toast.error(`Erro ao atualizar projeto: ${error.message}`)
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => projectUseCase.executeDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.all })
      toast.success('Projeto removido com sucesso')
    },
    onError: (error: Error) => toast.error(`Erro ao remover projeto: ${error.message}`)
  })

  return {
    getAllProjects, getProjectById,
    createProject: createMutation.mutateAsync, isCreating: createMutation.isPending,
    updateProject: updateMutation.mutateAsync, isUpdating: updateMutation.isPending,
    deleteProject: deleteMutation.mutateAsync, isDeleting: deleteMutation.isPending
  }
}
