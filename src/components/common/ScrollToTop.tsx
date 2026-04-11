import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Componente que força o scroll para o topo (0,0) sempre que a rota muda.
 * Requisito: Instantâneo e funciona mesmo se clicar no link da mesma página.
 */
function ScrollToTop() {
  const { pathname, key } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    })
  }, [pathname, key])

  return null
}

export default ScrollToTop
