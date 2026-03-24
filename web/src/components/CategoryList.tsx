import { getCategoryIcon } from '@/constants/category-icons';
import useCategories from '@/hooks/useCategories';
import { HStack, Icon, List, Spinner, Text } from '@chakra-ui/react';
import CategoryListSkeleton from './CategoryListSkeleton';
// import { BiCategory } from "react-icons/bi";

const CategoryList = () => {
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

    <List.Root marginTop={4}>
      {data.map(category => (
        <List.Item key={category.id} paddingY="5px" listStyle={'none'}>
          <HStack cursor="pointer" transition="all 0.2s ease" _hover={{ color: 'tomato' }}>
            <Icon as={getCategoryIcon(category.name)} />
            <Text fontSize="md">{category.name}</Text>
          </HStack>
        </List.Item>
      ))}
    </List.Root>
  );
};

export default CategoryList;
