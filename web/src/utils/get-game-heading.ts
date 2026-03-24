import type { GameQuery } from "@/App";

const getGameHeading = (gameQuery: GameQuery) => {
    return `${gameQuery.category ? gameQuery.category.name + ' - ' : ''} 
            ${gameQuery.mechanism ? gameQuery.mechanism.name + ' - ' : ''} 
            Board Games`
}

export default getGameHeading;
