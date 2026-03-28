import type { Category } from "./Category";

export interface Game {
  id: number;
  name: string;
  slug: string;
  description: string;
  yearPublished: number;
  weight: number;
  publisher: { id: number; name: string };
  categories: Category[];
}
