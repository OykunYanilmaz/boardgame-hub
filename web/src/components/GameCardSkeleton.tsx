import { Card, Skeleton, SkeletonText } from "@chakra-ui/react"

const GameCardSkeleton = () => {
  return (
    <Card.Root>
      <Skeleton height="200px"/>
      <Card.Body>
        <SkeletonText />
      </Card.Body>
    </Card.Root>
  )
}

export default GameCardSkeleton
