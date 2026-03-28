import useMechanisms from "./useMechanisms";

const useMechanism = (id?: number) => {
  const { data: mechanisms } = useMechanisms();
  return mechanisms?.find(m => m.id === id)
}

export default useMechanism;
