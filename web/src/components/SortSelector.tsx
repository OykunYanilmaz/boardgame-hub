import sortOrders from '@/constants/sort-orders';
import useGameQueryStore from '@/store';
import { Button, Icon, Menu, Portal } from '@chakra-ui/react';
import { BsChevronDown } from 'react-icons/bs';

// interface Props {
//     onSelectSortOrder: (sortOrder: string) => void;
//     sortOrder: string;
// }

const SortSelector = () => {
  const setSortOrder = useGameQueryStore(s => s.setSortOrder);
  const sortOrder = useGameQueryStore(s => s.gameQuery.sortOrder);
  const currentSortOrder = sortOrders.find(order => order.value === sortOrder);

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          {currentSortOrder?.label || 'Relevance'}
          <Icon as={BsChevronDown}></Icon>
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {sortOrders.map(order => (
              <Menu.Item onClick={() => setSortOrder(order.value)} key={order.value} value={order.value}>
                {order.label}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default SortSelector;
