import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { blogPostUseCase } from '@/domain/usecases/BlogPostUseCase'
import { BlogPostEntity } from '@/core/entities/content/BlogPostEntity'
import { toast } from 'sonner'

export const BLOG_POST_KEYS = {
  all: ['blog-posts'] as const,
  lists: () => [...BLOG_POST_KEYS.all, 'list'] as const,
  list: (filters: string) => [...BLOG_POST_KEYS.lists(), { filters }] as const,
  details: () => [...BLOG_POST_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...BLOG_POST_KEYS.details(), id] as const,
  detailBySlug: (slug: string) => [...BLOG_POST_KEYS.details(), 'slug', slug] as const
}

export const useBlogPostViewModel = () => {
  const queryClient = useQueryClient()

  const getAllPosts = (
    limit?: number,
    offset?: number,
    searchTerm?: string,
    filters?: Partial<BlogPostEntity>
  ) => {
    return useQuery({
      queryKey: BLOG_POST_KEYS.list(
        JSON.stringify({ limit, offset, searchTerm, filters })
      ),
      queryFn: () =>
        blogPostUseCase.executeGetAll(limit, offset, searchTerm, filters)
    })
  }

  const getPostById = (id: string) => {
    return useQuery({
      queryKey: BLOG_POST_KEYS.detail(id),
      queryFn: () => blogPostUseCase.executeGetById(id),
      enabled: !!id
    })
  }

  const getPostBySlug = (slug: string) => {
    return useQuery({
      queryKey: BLOG_POST_KEYS.detailBySlug(slug),
      queryFn: () => blogPostUseCase.executeGetBySlug(slug),
      enabled: !!slug
    })
  }

  const createMutation = useMutation({
    mutationFn: (
      data: Omit<BlogPostEntity, 'id' | 'created_at' | 'updated_at'>
    ) => blogPostUseCase.executeCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOG_POST_KEYS.all })
      toast.success('Post criado com sucesso')
    },
    onError: (error: Error) => {
      toast.error(`Erro ao criar post: ${error.message}`)
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data
    }: {
      id: string
      data: Partial<BlogPostEntity>
    }) => blogPostUseCase.executeUpdate(id, data),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: BLOG_POST_KEYS.all })
      queryClient.invalidateQueries({
        queryKey: BLOG_POST_KEYS.detail(data.id)
      })
      toast.success('Post atualizado com sucesso')
    },
    onError: (error: Error) => {
      toast.error(`Erro ao atualizar post: ${error.message}`)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => blogPostUseCase.executeDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOG_POST_KEYS.all })
      toast.success('Post removido com sucesso')
    },
    onError: (error: Error) => {
      toast.error(`Erro ao remover post: ${error.message}`)
    }
  })

  return {
    getAllPosts,
    getPostById,
    getPostBySlug,
    createPost: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updatePost: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    deletePost: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending
  }
}
