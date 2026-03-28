import useGameQueryStore from '@/store';
import { Icon, Input, InputGroup } from '@chakra-ui/react';
import { useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

// interface Props {
//     onSearch: (searchText: string) => void;
// }

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);

  const setSearchText = useGameQueryStore(s => s.setSearchText);
  const navigate = useNavigate()

  return (
    <form onSubmit={event => {
        event.preventDefault();
        // if (ref.current) onSearch(ref.current.value)
        if (ref.current) {
          setSearchText(ref.current.value);
          navigate('/');
        } 
    }}>
        <InputGroup startElement={<Icon as={BsSearch} color="tomato" size={"md"}/>}>
          <Input ref={ref} borderRadius={20} placeholder="Search games..." variant={'subtle'} />
        </InputGroup>
    </form>
  );
};

export default SearchInput;
