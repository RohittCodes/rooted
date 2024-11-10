'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createLessonSchema } from '@/schema'
import { createLesson } from '@/actions/lessons'
import { z } from 'zod'

export function useLessonForm(userId?: string) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof createLessonSchema>>({
    resolver: zodResolver(createLessonSchema),
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      content: '',
      difficulty: 'BEGINNER',
      status: 'DRAFT',
      categoryIds: [],
      tagIds: [],
      createdById: userId || '',
    },
  })

  const onSubmit = async (data: z.infer<typeof createLessonSchema>) => {
    try {
      setIsSubmitting(true)
      setError(null)
  
      // Format data to ensure arrays are correctly structured
      const formattedData = {
        ...data,
        categoryIds: data.categoryIds.filter(Boolean), // Remove empty strings
        tagIds: data.tagIds.filter(Boolean), // Remove empty strings
        ...(userId ? { createdById: userId } : {}), // Only include createdById if userId is defined
      }
  
      const result = await createLesson(formattedData)
  
      if ('id' in result) {
        form.reset()
      } else {
        setError('An error occurred while creating the lesson')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }  

  return { form, isSubmitting, error, onSubmit }
}
