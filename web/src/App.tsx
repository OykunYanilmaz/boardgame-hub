import { Box, Grid, GridItem, HStack } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import GameGrid from './components/GameGrid';
import CategoryList from './components/CategoryList';
import { useState } from 'react';
// import type { Category } from './hooks/useCategories';
import MechanismSelector from './components/MechanismSelector';
// import type { Mechanism } from './hooks/useMechanisms';
import SortSelector from './components/SortSelector';
import GameHeading from './components/GameHeading';

export interface GameQuery {
  // category: Category | null;
  categoryId?: number;
  mechanismId?: number;
  sortOrder: string;
  searchText: string;
}

function App() {
  // const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  // const [selectedMechanism, setSelectedMechanism] = useState<Mechanism | null>(null);
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: '1fr',
        lg: '200px 1fr',
      }}
    >
      <GridItem area="nav">
        <NavBar onSearch={searchText => setGameQuery({ ...gameQuery, searchText })} />
      </GridItem>
      <GridItem area="aside" paddingX={1} display={{ base: 'none', lg: 'block' }}>
        <CategoryList
          selectedCategoryId={gameQuery.categoryId}
          onSelectCategory={category => setGameQuery({ ...gameQuery, categoryId: category.id })}
        />
      </GridItem>
      <GridItem area="main">
        <Box paddingLeft={3}>
          <GameHeading gameQuery={gameQuery} />
          <HStack gap={3} marginY={5}>
            <MechanismSelector
              onSelectMechanism={mechanism =>
                setGameQuery({ ...gameQuery, mechanismId: mechanism.id })
              }
              selectedMechanismId={gameQuery.mechanismId}
            />
            <SortSelector
              sortOrder={gameQuery.sortOrder}
              onSelectSortOrder={sortOrder => setGameQuery({ ...gameQuery, sortOrder })}
            />
          </HStack>
        </Box>
        <GameGrid gameQuery={gameQuery} />
      </GridItem>
    </Grid>
  );
}

export default App;
