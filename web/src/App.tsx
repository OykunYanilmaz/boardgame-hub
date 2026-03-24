import { Grid, GridItem } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import GameGrid from './components/GameGrid';
import CategoryList from './components/CategoryList';
import { useState } from 'react';
import type { Category } from './hooks/useCategories';
import MechanismSelector from './components/MechanismSelector';
import type { Mechanism } from './hooks/useMechanisms';

export interface GameQuery {
  category: Category | null;
  mechanism: Mechanism | null;
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
        lg: '200px 1fr'
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <GridItem area="aside" paddingX={1} display={{ base: 'none', lg: 'block' }}>
        <CategoryList selectedCategory={gameQuery.category} onSelectCategory={(category) => setGameQuery({ ...gameQuery, category })}/>
      </GridItem>
      <GridItem area="main">
        <MechanismSelector onSelectMechanism={(mechanism) => setGameQuery({ ...gameQuery, mechanism })} selectedMechanism={gameQuery.mechanism} />
        <GameGrid gameQuery={gameQuery} />
      </GridItem>
    </Grid>
  );
}

export default App;
