import { HStack, Text, Image } from "@chakra-ui/react"
import logo from '../assets/board-games.svg'
import ThemeSwitch from "./ThemeSwitch"
import SearchInput from "./SearchInput"
import { Link } from "react-router-dom"
import useGameQueryStore from "@/store"
import SigningGroup from "./SigningGroup"

// interface Props {
//     onSearch: (searchText: string) => void;
// }

const NavBar = () => {
  const resetGameQuery = useGameQueryStore(s => s.resetGameQuery);
  
  return (
    <HStack padding='10px' gap={3}>
      <HStack flexShrink={0}>
          <Link to='/' onClick={resetGameQuery}>
            <Image src={logo} boxSize={{ base: "36px", sm: "44px", md: "52px", lg: "60px" }} objectFit={'cover'}/>
          </Link>
          <Link to='/' onClick={resetGameQuery}>
            <Text whiteSpace='nowrap' fontWeight={'bold'} 
                  display={{ base: "none", sm: "block" }}
                  fontSize={{ base: "18px", sm: "22px", md: "26px", lg: "30px" }}>BG-Hub</Text>
          </Link>
      </HStack>
      {/* <SearchInput onSearch={onSearch}/> */}
      <SearchInput />
      <ThemeSwitch />
      <SigningGroup />
    </HStack>
  )
}

export default NavBar
