import { getCategoryIcon } from '@/constants/category-icons';
import useCategories from '@/hooks/useCategories';
import { Box, Button, Heading, Icon, List, Spinner } from '@chakra-ui/react';
import CategoryListSkeleton from './CategoryListSkeleton';
import useGameQueryStore from '@/store';
// import { BiCategory } from "react-icons/bi";

// interface Props {
//   onSelectCategory: (category: Category) => void;
//   selectedCategoryId?: number
// }

const CategoryList = () => {
  const { data, isLoading, error } = useCategories();
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const selectedCategoryId = useGameQueryStore(s => s.gameQuery.categoryId);
  const setSelectedCategoryId = useGameQueryStore(s => s.setCategoryId);

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

    <Box borderRight={'solid 1px'} height="100%">
      <Heading fontSize={'lg'} marginTop={2}>
        Categories
      </Heading>
      <List.Root marginTop={4}>
        {data.map(category => (
          <List.Item key={category.id} paddingY="3px" listStyle={'none'}>
            <Button
              whiteSpace="normal"
              textAlign={'left'}
              textDecoration={category.id === selectedCategoryId ? 'underline' : 'none'}
              color={category.id === selectedCategoryId ? 'tomato' : 'none'}
              cursor="pointer"
              transition="all 0.2s ease"
              _hover={{ color: 'tomato' }}
              onClick={() => setSelectedCategoryId(category.id)}
              variant="plain"
              fontSize="lg"
            >
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
