import { useState, useEffect } from 'react';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCategories } from '@/hooks/use-categories';
import { createCategory } from '@/actions/category';
import { useTags } from '@/hooks/use-tags';
import { createTag } from '@/actions/tags';
import { toast } from '@/hooks/use-toast';

interface Option {
  value: string;
  label: string;
}

interface CombinedFieldsProps {
  control: Control<any>;
}

export function CategoryTagsFields({ control }: CombinedFieldsProps) {
  // Categories State and Functions
  const { categories, loading: loadingCategories, error: errorCategories } = useCategories();
  const [newCategory, setNewCategory] = useState('');
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState<Option[]>([]);

  useEffect(() => {
    if (categories) {
      setCategoryOptions(
        categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))
      );
    }
  }, [categories]);

  const handleCreateCategory = async () => {
    if (!newCategory.trim()) return;

    setIsCreatingCategory(true);
    try {
      const createdCategory = await createCategory({
        name: newCategory,
        slug: newCategory.toLowerCase().replace(/\s+/g, '-'),
      });
      setCategoryOptions((prevOptions) => [
        ...prevOptions,
        { value: createdCategory.id, label: createdCategory.name },
      ]);
      toast({
        title: 'Success',
        description: `Category "${createdCategory.name}" has been created.`,
      });
      setNewCategory('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create category. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsCreatingCategory(false);
    }
  };

  // Tags State and Functions
  const { tags, loading: loadingTags, error: errorTags } = useTags();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTags, setFilteredTags] = useState<Option[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isCreatingTag, setIsCreatingTag] = useState(false);

  useEffect(() => {
    if (tags) {
      setFilteredTags(
        tags.map((tag) => ({
          value: tag.id,
          label: tag.name,
        }))
      );
    }
  }, [tags]);

  useEffect(() => {
    if (tags) {
      const filtered = tags
        .filter((tag) => tag.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((tag) => ({
          value: tag.id,
          label: tag.name,
        }));
      setFilteredTags(filtered);
    }
  }, [searchTerm, tags]);

  const handleCreateTag = async () => {
    if (!newTag.trim()) return;

    setIsCreatingTag(true);
    try {
      const createdTag = await createTag({ 
        name: newTag,
        slug: newTag.toLowerCase().replace(/\s+/g, '-')
      });
      setFilteredTags((prevOptions) => [
        ...prevOptions,
        { value: createdTag.id, label: createdTag.name },
      ]);
      toast({
        title: 'Success',
        description: `Tag "${createdTag.name}" has been created.`,
      });
      setNewTag('');
      setSearchTerm('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create tag. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsCreatingTag(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Component */}
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
                  {loadingCategories ? (
                    <div>Loading categories...</div>
                  ) : errorCategories ? (
                    <div>Error loading categories: {errorCategories.message}</div>
                  ) : (
                    categoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))
                  )}
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
        <Button onClick={handleCreateCategory} disabled={isCreatingCategory || !newCategory.trim()}>
          {isCreatingCategory ? 'Creating...' : 'Create'}
        </Button>
      </div>

      {/* Tags Component */}
      <FormField
        control={control}
        name="tagIds"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tags</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  placeholder="Search or create a tag"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-2"
                />
                {filteredTags.length > 0 ? (
                  <Select onValueChange={(value) => field.onChange([...field.value, value])}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select or create a tag" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredTags.map((tag) => (
                        <SelectItem key={tag.value} value={tag.value}>
                          {tag.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-sm text-gray-500">No tags found</p>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {searchTerm &&
        !filteredTags.some((tag) => tag.label.toLowerCase() === searchTerm.toLowerCase()) && (
          <div className="flex items-center gap-2">
            <Input
              placeholder="Create new tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleCreateTag} disabled={isCreatingTag || !newTag.trim()}>
              {isCreatingTag ? 'Creating...' : 'Create'}
            </Button>
          </div>
        )}
    </div>
  );
}
