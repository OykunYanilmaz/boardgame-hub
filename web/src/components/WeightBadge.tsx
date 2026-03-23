import { Badge, HStack } from '@chakra-ui/react';
import { FaWeightHanging } from 'react-icons/fa';

interface Props {
    weight: number;
}


const complexityMap = [
    { min: 3.8, color: 'red' },
    { min: 3.1, color: 'yellow' },
    { min: 0, color: 'green' },
]

const WeightBadge = ({weight}: Props) => {
  const color = complexityMap.find(cm => weight >= cm.min)?.color;
  
  return (
    <HStack>
      <Badge fontSize='14px' borderRadius='5px' padding={2} colorPalette={color}>
        <FaWeightHanging />
        {weight}
      </Badge>
    </HStack>
  );
};

export default WeightBadge;
