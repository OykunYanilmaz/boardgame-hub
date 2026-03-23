import { Box } from "@chakra-ui/react"
import type { ReactNode } from "react"

interface Props {
    children: ReactNode;
}

const GameCardContainer = (props: Props) => {
  return (
    <Box width='346px' borderRadius={15} overflow="hidden">
        {props.children}
    </Box>
  )
}

export default GameCardContainer
