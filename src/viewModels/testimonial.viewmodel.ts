import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { testimonialUseCase } from '@/domain/usecases/TestimonialUseCase'
import { TestimonialEntity } from '@/core/entities/content/TestimonialEntity'
import { toast } from 'sonner'

export const TESTIMONIAL_KEYS = {
  all: ['testimonials'] as const,
  lists: () => [...TESTIMONIAL_KEYS.all, 'list'] as const,
  list: (filters: string) => [...TESTIMONIAL_KEYS.lists(), { filters }] as const
}

export const useTestimonialViewModel = () => {
  const queryClient = useQueryClient()

  const getAllTestimonials = (limit?: number, offset?: number, searchTerm?: string) => {
    return useQuery({
      queryKey: TESTIMONIAL_KEYS.list(JSON.stringify({ limit, offset, searchTerm })),
      queryFn: () => testimonialUseCase.executeGetAll(limit, offset, searchTerm)
    })
  }

  const createMutation = useMutation({
    mutationFn: (data: Omit<TestimonialEntity, 'id' | 'created_at' | 'updated_at'>) =>
      testimonialUseCase.executeCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TESTIMONIAL_KEYS.all })
      toast.success('Testemunho criado com sucesso')
    },
    onError: (error: Error) => toast.error(`Erro: ${error.message}`)
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TestimonialEntity> }) =>
      testimonialUseCase.executeUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TESTIMONIAL_KEYS.all })
      toast.success('Testemunho atualizado com sucesso')
    },
    onError: (error: Error) => toast.error(`Erro: ${error.message}`)
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => testimonialUseCase.executeDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TESTIMONIAL_KEYS.all })
      toast.success('Testemunho removido com sucesso')
    },
    onError: (error: Error) => toast.error(`Erro: ${error.message}`)
  })

  return {
    getAllTestimonials,
    createTestimonial: createMutation.mutateAsync, isCreating: createMutation.isPending,
    updateTestimonial: updateMutation.mutateAsync, isUpdating: updateMutation.isPending,
    deleteTestimonial: deleteMutation.mutateAsync, isDeleting: deleteMutation.isPending
  }
}
