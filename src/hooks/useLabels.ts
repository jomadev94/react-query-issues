import { useQuery } from "@tanstack/react-query";
import { githubAPI } from "../api/githubAPI";
import { Label } from "../models/labels";

const getLables = async (): Promise<Label[] | undefined> => {
  try {
    const { data } = await githubAPI.get("/labels?per_page=100");
    return data;
  } catch (error) {
    console.log(error);
  }
};

const generatePlaceholder = (): Label[] => {
  const labels = [];
  for (let index = 0; index < 30; index++) {
    labels.push({
      id: index,
      node_id: "MDU6TGFiZWw2OTEwNTM1OA==",
      url: "",
      name: "Cargando...",
      color: "c7def8",
      default: false,
    });
  }
  return labels;
};

export const useLabels = () => {
  const placeholder=generatePlaceholder();
  return useQuery({
    queryKey: ["labels"],
    queryFn: getLables,
    staleTime: 1000 * 60 * 60,
    placeholderData: placeholder,
  });
};
