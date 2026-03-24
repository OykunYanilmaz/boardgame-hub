
import getGameEmoji from '@/utils/get-game-emoji';
import { Image } from '@chakra-ui/react'

interface Props {
    yearPublished: number;
}

const Emoji = ({yearPublished}: Props) => {
  
  return (
    <Image src={getGameEmoji(yearPublished)} boxSize='25px'/>
  )
}

export default Emoji

