import useDefaultData from "./useDefaultData";

export interface Mechanism {
  id: number;
  name: string;
}

const useMechanisms = () => useDefaultData<Mechanism>('/mechanisms/')

export default useMechanisms;
