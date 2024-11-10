// src/hooks/useCategories.ts

import { useEffect, useState } from 'react'
import { getCategories } from '@/actions/category'

export function useCategories() {
  interface Category {
    id: string;
    name: string;
    description: string | null;
    slug: string;
    parentId: string | null;
    lessonIds: string[];
    createdAt: Date;
    updatedAt: Date;
  }

  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getCategories()
        setCategories(result)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load categories'))
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading, error }
}
