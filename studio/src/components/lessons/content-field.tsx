'use client'

import { Control } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { FormData } from '@/components/lessons/lesson-create'
import dynamic from 'next/dynamic'
import 'react-markdown-editor-lite/lib/index.css'

// Dynamically import the editor to avoid SSR issues
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
})

export function ContentField({ control }: { control: Control<FormData> }) {
  return (
    <FormField
      control={control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Content</FormLabel>
          <FormControl>
            <MdEditor
              className="border border-gray-200 rounded-lg h-96 bg-primary"
              renderHTML={(text) => text}
              onChange={({ text }) => field.onChange(text)}
              value={field.value}
              placeholder="Enter lesson content (Markdown supported)"
              config={{
                view: {
                  menu: true,
                  md: true,
                  html: false,
                },
                canView: {
                  menu: true,
                  md: true,
                  html: false,
                  fullScreen: true,
                  hideMenu: true,
                },
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}