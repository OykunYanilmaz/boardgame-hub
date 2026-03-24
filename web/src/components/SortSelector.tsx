import { Button, Icon, Menu, Portal } from '@chakra-ui/react';
import { BsChevronDown } from 'react-icons/bs';

interface Props {
    onSelectSortOrder: (sortOrder: string) => void;
    sortOrder: string;
}


const SortSelector = ({onSelectSortOrder, sortOrder}: Props) => {
  const sortOrders = [
    { value: '', label: 'Relevance' },
    { value: 'name', label: 'Name Ascending' },
    { value: '-name', label: 'Name Descending' },
    { value: 'weight', label: 'Weight Ascending' },
    { value: '-weight', label: 'Weight Descending' },
  ];

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
              <Menu.Item onClick={() => onSelectSortOrder(order.value)} key={order.value} value={order.value}>
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
