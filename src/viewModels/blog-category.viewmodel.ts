import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { blogCategoryUseCase } from '@/domain/usecases/BlogCategoryUseCase'
import { BlogCategoryEntity } from '@/core/entities/content/BlogCategoryEntity'
import { toast } from 'sonner'

export const BLOG_CATEGORY_KEYS = {
  all: ['blog-categories'] as const,
  lists: () => [...BLOG_CATEGORY_KEYS.all, 'list'] as const,
  list: (filters: string) =>
    [...BLOG_CATEGORY_KEYS.lists(), { filters }] as const,
  details: () => [...BLOG_CATEGORY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...BLOG_CATEGORY_KEYS.details(), id] as const
}

export const useBlogCategoryViewModel = () => {
  const queryClient = useQueryClient()

  const getAllCategories = (limit?: number, offset?: number, searchTerm?: string) => {
    return useQuery({
      queryKey: BLOG_CATEGORY_KEYS.list(
        JSON.stringify({ limit, offset, searchTerm })
      ),
      queryFn: () => blogCategoryUseCase.executeGetAll(limit, offset, searchTerm)
    })
  }

  const createMutation = useMutation({
    mutationFn: (
      data: Omit<BlogCategoryEntity, 'id' | 'created_at' | 'updated_at'>
    ) => blogCategoryUseCase.executeCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOG_CATEGORY_KEYS.all })
      toast.success('Categoria criada com sucesso')
    },
    onError: (error: Error) => {
      toast.error(`Erro ao criar categoria: ${error.message}`)
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data
    }: {
      id: string
      data: Partial<BlogCategoryEntity>
    }) => blogCategoryUseCase.executeUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOG_CATEGORY_KEYS.all })
      toast.success('Categoria atualizada com sucesso')
    },
    onError: (error: Error) => {
      toast.error(`Erro ao atualizar categoria: ${error.message}`)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => blogCategoryUseCase.executeDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOG_CATEGORY_KEYS.all })
      toast.success('Categoria removida com sucesso')
    },
    onError: (error: Error) => {
      toast.error(`Erro ao remover categoria: ${error.message}`)
    }
  })

  return {
    getAllCategories,
    createCategory: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateCategory: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    deleteCategory: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending
  }
}
