import CategoryList from "@/components/CategoryList"
import GameGrid from "@/components/GameGrid"
import GameHeading from "@/components/GameHeading"
import MechanismSelector from "@/components/MechanismSelector"
import SortSelector from "@/components/SortSelector"
import { Box, Grid, GridItem, HStack } from "@chakra-ui/react"

const HomePage = () => {
  return (
    <Grid
      templateAreas={{
        // base: `"nav" "main"`,
        // lg: `"nav nav" "aside main"`,
        base: `"main"`,
        lg: `"aside main"`,
      }}
      templateColumns={{
        base: '1fr',
        lg: '200px 1fr',
      }}
    >
      {/* <GridItem area="nav"> */}
        {/* <NavBar onSearch={searchText => setGameQuery({ ...gameQuery, searchText })} /> */}
        {/* <NavBar /> */}
      {/* </GridItem> */}
      <GridItem area="aside" paddingX={1} display={{ base: 'none', lg: 'block' }}>
        {/* <CategoryList
          selectedCategoryId={gameQuery.categoryId}
          onSelectCategory={category => setGameQuery({ ...gameQuery, categoryId: category.id })}
        /> */}
        <CategoryList />
      </GridItem>
      <GridItem area="main">
        <Box paddingLeft={3}>
          {/* <GameHeading gameQuery={gameQuery} /> */}
          <GameHeading />
          <HStack gap={3} marginY={5}>
            {/* <MechanismSelector
              onSelectMechanism={mechanism =>
                setGameQuery({ ...gameQuery, mechanismId: mechanism.id })
              }
              selectedMechanismId={gameQuery.mechanismId}
            /> */}
            <MechanismSelector />
            {/* <SortSelector
              sortOrder={gameQuery.sortOrder}
              onSelectSortOrder={sortOrder => setGameQuery({ ...gameQuery, sortOrder })}
            /> */}
            <SortSelector />
          </HStack>
        </Box>
        {/* <GameGrid gameQuery={gameQuery} /> */}
        <GameGrid />
      </GridItem>
    </Grid>
  )
}

export default HomePage
