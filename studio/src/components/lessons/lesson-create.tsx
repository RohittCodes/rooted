'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useLessonForm } from '@/hooks/use-lesson-form'
import { TitleSlugFields } from '@/components/lessons/title-slug-fields'
import { DescriptionField } from '@/components/lessons/description-field'
import { ContentField } from '@/components/lessons/content-field'
import { DifficultyStatusFields } from '@/components/lessons/difficulty-status-fields'
import { CategoryTagsFields } from '@/components/lessons/category-tags-fields'
import { createLessonSchema } from '@/schema'
import { z } from 'zod'

export type FormData = z.infer<typeof createLessonSchema>

export default function LessonCreate() {
  const { data: session } = useSession()
  const { form, isSubmitting, error, onSubmit } = useLessonForm(session?.user?.id)

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Create Lesson</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="bg-card rounded-lg p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TitleSlugFields control={form.control} />
            <DescriptionField control={form.control} />
            <ContentField control={form.control} />
            <DifficultyStatusFields control={form.control} />
            <CategoryTagsFields control={form.control} />

            <div className="flex gap-4 justify-end pt-4">
              <Button type="button" variant="outline" onClick={() => form.reset()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Lesson'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
