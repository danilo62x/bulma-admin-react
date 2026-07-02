import { useEffect } from 'react'
import { useUiStore } from '@/stores/ui'

export function usePageTitle(title: string) {
  const setPageTitle = useUiStore((s) => s.setPageTitle)
  useEffect(() => {
    setPageTitle(title)
  }, [title, setPageTitle])
}
