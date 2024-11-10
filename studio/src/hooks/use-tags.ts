// src/hooks/useCategories.ts

import { useEffect, useState } from 'react'
import { getTags } from '@/actions/tags';
import { createTagSchema } from '@/schema';
createTagSchema

export function useTags() {
  interface Tag {
    id: string;
    name: string;
    slug: string;
    description: string | null;
  }

  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const result = await getTags()
        setTags(result)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load categories'))
      } finally {
        setLoading(false)
      }
    }

    fetchTags()
  }, [])

  return { tags, loading, error }
}
