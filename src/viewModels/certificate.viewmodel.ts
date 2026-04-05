import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { certificateUseCase } from '@/domain/usecases/CertificateUseCase'
import { CertificateEntity } from '@/core/entities/portfolio/CertificateEntity'
import { toast } from 'sonner'

export const CERTIFICATE_KEYS = {
  all: ['certificates'] as const,
  lists: () => [...CERTIFICATE_KEYS.all, 'list'] as const,
  list: (filters: string) => [...CERTIFICATE_KEYS.lists(), { filters }] as const,
  details: () => [...CERTIFICATE_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...CERTIFICATE_KEYS.details(), id] as const
}

export const useCertificateViewModel = () => {
  const queryClient = useQueryClient()

  const getAllCertificates = (limit?: number, offset?: number, searchTerm?: string) => {
    return useQuery({
      queryKey: CERTIFICATE_KEYS.list(JSON.stringify({ limit, offset, searchTerm })),
      queryFn: () => certificateUseCase.executeGetAll(limit, offset, searchTerm)
    })
  }

  const getCertificateById = (id: string) => {
    return useQuery({
      queryKey: CERTIFICATE_KEYS.detail(id),
      queryFn: () => certificateUseCase.executeGetById(id),
      enabled: !!id
    })
  }

  const createMutation = useMutation({
    mutationFn: (data: Omit<CertificateEntity, 'id' | 'created_at' | 'updated_at'>) =>
      certificateUseCase.executeCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CERTIFICATE_KEYS.all })
      toast.success('Certificado criado com sucesso')
    },
    onError: (error: Error) => toast.error(`Erro: ${error.message}`)
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CertificateEntity> }) =>
      certificateUseCase.executeUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CERTIFICATE_KEYS.all })
      toast.success('Certificado atualizado com sucesso')
    },
    onError: (error: Error) => toast.error(`Erro: ${error.message}`)
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => certificateUseCase.executeDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CERTIFICATE_KEYS.all })
      toast.success('Certificado removido com sucesso')
    },
    onError: (error: Error) => toast.error(`Erro: ${error.message}`)
  })

  return {
    getAllCertificates, getCertificateById,
    createCertificate: createMutation.mutateAsync, isCreating: createMutation.isPending,
    updateCertificate: updateMutation.mutateAsync, isUpdating: updateMutation.isPending,
    deleteCertificate: deleteMutation.mutateAsync, isDeleting: deleteMutation.isPending
  }
}
