import { HStack, Icon } from '@chakra-ui/react';
import { Tooltip } from '@/components/ui/tooltip';
import type { Category } from '@/hooks/useCategories';
import { getCategoryIcon } from '@/constants/category-icons';

interface Props {
  categories: Category[];
}

export const CategoryIconList = ({ categories }: Props) => {

  return (
    <HStack marginY={2}>
      {categories.map(category => (
        <Tooltip key={category.id} content={category.name} showArrow>
          <Icon
            key={category.id}
            as={getCategoryIcon(category.name)}
            boxSize={5}
            cursor="pointer"
            color="gray.500"
            transition="all 0.2s ease"
            _hover={{ color: 'orange.400', transform: 'scale(1.15)' }}
          />
        </Tooltip>
      ))}
    </HStack>
  );
};

export default CategoryIconList;
