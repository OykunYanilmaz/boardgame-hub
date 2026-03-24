import { List, SkeletonText } from '@chakra-ui/react';

const CategoryListSkeleton = () => {
  return (
    <List.Root>
      <List.Item listStyle={'none'}>
        <SkeletonText></SkeletonText>
      </List.Item>
    </List.Root>
  );
};

export default CategoryListSkeleton;
