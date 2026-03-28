import useMechanism from '@/hooks/useMechanism';
import useMechanisms, { type Mechanism } from '@/hooks/useMechanisms';
import { Button, Icon, Menu, Portal } from '@chakra-ui/react';
import { BsChevronDown } from 'react-icons/bs';

interface Props {
  onSelectMechanism: (mechanism: Mechanism) => void;
  selectedMechanismId?: number;
}

const MechanismSelector = ({ onSelectMechanism, selectedMechanismId }: Props) => {
  const { data, error } = useMechanisms();
  const selectedMechanism = useMechanism(selectedMechanismId);

  if (error) return null;

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button color={selectedMechanism ? 'tomato' : ''} variant="outline" size="sm">
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
