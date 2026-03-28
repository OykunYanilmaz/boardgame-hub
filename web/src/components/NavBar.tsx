import { HStack, Text, Image } from "@chakra-ui/react"
import logo from '../assets/board-games.svg'
import ThemeSwitch from "./ThemeSwitch"
import SearchInput from "./SearchInput"

// interface Props {
//     onSearch: (searchText: string) => void;
// }

const NavBar = () => {
  return (
    <HStack padding='10px' gap={3}>
      <HStack flexShrink={0} >
          <Image src={logo} boxSize={{ base: "36px", sm: "44px", md: "52px", lg: "60px" }} />
          <Text whiteSpace='nowrap' fontWeight={'bold'} 
                display={{ base: "none", sm: "block" }}
                fontSize={{ base: "18px", sm: "22px", md: "26px", lg: "30px" }}>BG-Hub</Text>
      </HStack>
      {/* <SearchInput onSearch={onSearch}/> */}
      <SearchInput />
      <ThemeSwitch />
    </HStack>
  )
}

export default NavBar
