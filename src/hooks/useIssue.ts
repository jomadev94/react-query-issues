import { useQuery } from "@tanstack/react-query";
import { githubAPI } from "../api/githubAPI";
import { Issue } from "../models/issue";

export const getIssueInfo = async (id: string): Promise<Issue | undefined> => {
  try {
    const { data } = await githubAPI.get(`issues/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getIssueComments = async (
  id: string
): Promise<Issue[] | undefined> => {
  try {
    const { data } = await githubAPI.get(`issues/${id}/comments`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const useIssue = (id: string) => {
  const issueQuery = useQuery({
    queryKey: ["issue", id],
    queryFn: () => getIssueInfo(id),
  });
  const commentsQuery = useQuery({
    queryKey: ["issue", id, "comments"],
    queryFn: () => getIssueComments(id),
  });
  return { issueQuery, commentsQuery };
};
