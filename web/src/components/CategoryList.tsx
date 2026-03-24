import { getCategoryIcon } from '@/constants/category-icons';
import useCategories, { type Category } from '@/hooks/useCategories';
import { Box, Button, Heading, Icon, List, Spinner } from '@chakra-ui/react';
import CategoryListSkeleton from './CategoryListSkeleton';
// import { BiCategory } from "react-icons/bi";

interface Props {
  onSelectCategory: (category: Category) => void;
  selectedCategory: Category | null;
}

const CategoryList = ({selectedCategory, onSelectCategory}: Props) => {
  const { data, isLoading, error } = useCategories();
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  if (error) return null;
  
  if (isLoading)
    return (
      <>
        <Spinner />
        {skeletons.map(skeleton => (
          <CategoryListSkeleton key={skeleton} />
        ))}
      </>
    );

  return (
    // <Tabs.Root defaultValue="categories" marginTop={4}>
    //   <Tabs.List>
    //     <Tabs.Trigger value="types">
    //       <BiCategory />
    //       <Text>Typ.</Text>
    //     </Tabs.Trigger>
    //     <Tabs.Trigger value="categories">
    //       <BiCategory />
    //       <Text>Cat.</Text>
    //     </Tabs.Trigger>
    //   </Tabs.List>
    //   <Tabs.Content value="types">Types</Tabs.Content>
    //   <Tabs.Content value="categories">

    //   </Tabs.Content>
    // </Tabs.Root>

    <Box borderRight={'solid 1px'} height='100%'>
    <Heading fontSize={'lg'} marginTop={2}>Categories</Heading>
    <List.Root marginTop={4}>
      {data.map(category => (
        <List.Item key={category.id} paddingY="3px" listStyle={'none'}>
            <Button whiteSpace="normal" textAlign={'left'}
                    textDecoration={category.id === selectedCategory?.id ? 'underline' : 'none'}
                    color={category.id === selectedCategory?.id ? 'tomato' : 'none'}
                    cursor="pointer" transition="all 0.2s ease" _hover={{ color: 'tomato'}} 
                    onClick={() => onSelectCategory(category)} variant='plain' fontSize="lg">
              <Icon as={getCategoryIcon(category.name)} />
              {category.name}
            </Button>
        </List.Item>
      ))}
    </List.Root>
    </Box>
  );
};

export default CategoryList;
