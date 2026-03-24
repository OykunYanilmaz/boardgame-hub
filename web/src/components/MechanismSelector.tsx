import useMechanisms, { type Mechanism } from '@/hooks/useMechanisms';
import { Button, Icon, Menu, Portal } from '@chakra-ui/react';
import { BsChevronDown } from 'react-icons/bs';

interface Props {
  onSelectMechanism: (mechanism: Mechanism) => void;
  selectedMechanism: Mechanism | null;
}

const MechanismSelector = ({ onSelectMechanism, selectedMechanism }: Props) => {
  const { data, error } = useMechanisms();

  if (error) return null;

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          {selectedMechanism?.name || 'Mechanisms'}
          <Icon as={BsChevronDown}></Icon>
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {data.map(mechanism => (
                <Menu.Item
                  onClick={() => onSelectMechanism(mechanism)}
                //   onClick={() => setSelectedPlatformId(mechanism.id)}
                  value={mechanism.name}
                  key={mechanism.id}
                >
                  {mechanism.name}
                </Menu.Item>
              ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default MechanismSelector;
