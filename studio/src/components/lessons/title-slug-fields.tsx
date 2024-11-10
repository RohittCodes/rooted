import { Control } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FormData } from '@/components/lessons/lesson-create'

export function TitleSlugFields({ control }: { control: Control<FormData> }) {
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter lesson title"
                {...field}
                onChange={(e) => {
                  field.onChange(e)
                  control._formValues.slug = generateSlug(e.target.value)
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="slug"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Slug</FormLabel>
            <FormControl>
              <Input placeholder="lesson-slug" {...field} />
            </FormControl>
            <FormDescription>URL-friendly version of the title</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}