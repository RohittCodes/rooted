// components/CategoryFieldsComponent.tsx
import { useState, useEffect } from 'react'
import { Control, Controller } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCategories } from '@/hooks/use-categories'
import { createCategory } from '@/actions/category'
import { toast } from '@/hooks/use-toast'

interface CategoryOption {
  value: string;
  label: string;
}

export interface LessonFormData {
  title: string;
  slug: string;
  description: string;
  content: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  categoryIds: string[];
  tagIds: string[];
  createdById: string;
  publishedAt?: Date;
}

export function CategoryTagsFields({ control }: { control: Control<LessonFormData> }) {
  const { categories, loading, error } = useCategories()
  const [newCategory, setNewCategory] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([])

  useEffect(() => {
    if (categories) {
      setCategoryOptions(categories.map((category) => ({
        value: category.id,
        label: category.name,
      })))
    }
  }, [categories])

  const handleCreateCategory = async () => {
    if (!newCategory.trim()) return

    setIsCreating(true)
    try {
      const createdCategory = await createCategory({ name: newCategory, slug: newCategory.toLowerCase().replace(/\s+/g, '-') })
      setCategoryOptions(prevOptions => [...prevOptions, { value: createdCategory.id, label: createdCategory.name }])
      toast({
        title: 'Success',
        description: `Category "${createdCategory.name}" has been created.`,
      })
      setNewCategory('')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create category. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsCreating(false)
    }
  }

  if (loading) return <div>Loading categories...</div>
  if (error) return <div>Error loading categories: {error.message}</div>

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="categoryIds"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Categories</FormLabel>
            <FormControl>
              <Select onValueChange={(value) => field.onChange([value])} value={field.value[0]}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex items-center gap-2">
        <Input
          placeholder="Create new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleCreateCategory} disabled={isCreating || !newCategory.trim()}>
          {isCreating ? 'Creating...' : 'Create'}
        </Button>
      </div>

      <FormField
        control={control}
        name="tagIds"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tags</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter tags (comma-separated)"
                value={field.value.join(', ')}
                onChange={(e) =>
                  field.onChange(e.target.value.split(',').map((tag) => tag.trim()))
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}