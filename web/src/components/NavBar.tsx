import { HStack, Text, Image } from "@chakra-ui/react"
import logo from '../assets/board-games.svg'
import ThemeSwitch from "./ThemeSwitch"

const NavBar = () => {
  return (
    <HStack justifyContent='space-between' padding='10px'>
        <HStack>
            <Image src={logo} boxSize={{ base: "36px", sm: "44px", md: "52px", lg: "60px" }} />
            <Text fontWeight={'bold'} fontSize={{ base: "18px", sm: "22px", md: "26px", lg: "30px" }}>BG-Hub</Text>
        </HStack>
        <ThemeSwitch />
    </HStack>
  )
}

export default NavBar
