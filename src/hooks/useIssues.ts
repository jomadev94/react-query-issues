import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { githubAPI } from "../api/githubAPI";
import { Issue, State } from "../models/issue";
import { useEffect, useState } from "react";

interface IssueQuery {
  labels: string[];
  state?: State;
}

// const getIssues = async (
//   labels: string[],
//   page: number,
//   state?: State
// ): Promise<Issue[] | undefined> => {
//   try {
//     const params = new URLSearchParams();
//     if (state) params.append("state", state);
//     if (labels.length > 0) {
//       const labelsString = labels.join(",");
//       params.append("labels", labelsString);
//     }
//     params.append("page", page.toString());
//     params.append("per_page", "5");
//     const { data } = await githubAPI.get<Issue[]>("/issues", { params });
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

interface QueryProps {
  pageParams?: number;
  queryKey: (string | IssueQuery)[];
}

const getIssues = async ({
  pageParams = 1,
  queryKey,
}: QueryProps): Promise<Issue[]> => {
  try {
    const params = new URLSearchParams();
    const [, , search] = queryKey;
    const { state, labels } = search as IssueQuery;

    if (state) params.append("state", state);
    if (labels.length > 0) {
      const labelsString = labels.join(",");
      params.append("labels", labelsString);
    }
    params.append("page", pageParams.toString());
    params.append("per_page", "5");
    const { data } = await githubAPI.get<Issue[]>("/issues", { params });
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// export const useIssues = ({ labels, state }: IssueQuery) => {
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     setPage(1);
//   }, [state, labels]);

//   const query = useQuery({
//     queryKey: ["issues", { state, labels, page }],
//     queryFn: () => getIssues(labels, page, state),
//   });

//   const nextPage = () => {
//     if (query.data?.length != 0) setPage(page + 1);
//   };

//   const prevPage = () => {
//     if (page > 1) {
//       setPage(page - 1);
//     }
//   };

//   return { page, nextPage, prevPage, query };
// };

export const useIssuesInfinite = ({ labels, state }: IssueQuery) => {
  const query = useInfiniteQuery({
    queryKey: ["issues", "infinite", { labels, state }],
    // Recibe automaticamente la queryKey y el pageParam
    queryFn: getIssues,
    initialPageParam: 1,
    // Funcion que recibe dos arreglos como parametros y retorna el numero de la pagina siguiente
    // (en caso de que lo haya)
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length != 0) return pages.length + 1;
    },
  });
  return { query };
};
