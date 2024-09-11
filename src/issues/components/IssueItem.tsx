import { FiInfo, FiMessageSquare, FiCheckCircle } from "react-icons/fi";
import { Issue, State } from "../../models/issue";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { getIssueComments, getIssueInfo } from "../../hooks/useIssue";
import { timeSince } from "../../helpers/time-since";

interface Props {
  issue: Issue;
}

export const IssueItem: FC<Props> = ({ issue }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const prefetch = () => {
    queryClient.prefetchQuery({
      queryKey: ["issue", issue.number.toString()],
      queryFn: () => getIssueInfo(issue.number.toString()),
      staleTime: 1000 * 60 * 2,
    });
    queryClient.prefetchQuery({
      queryKey: ["issue", issue.number.toString(), "comments"],
      queryFn: () => getIssueComments(issue.number.toString()),
      staleTime: 1000 * 60 * 2,
    });
  };

  const setQueryData = () => {
    queryClient.setQueryData(["issue", issue.number.toString()], issue, {
      updatedAt: 1000 * 60,
    });
  };

  return (
    <div
      className="card mb-2 issue"
      onClick={() => navigate(`/issues/issue/${issue.number}`)}
      onMouseEnter={setQueryData}
    >
      <div className="card-body d-flex align-items-center">
        {issue.state === State.Open ? (
          <FiInfo size={30} color="red" />
        ) : (
          <FiCheckCircle size={30} color="green" />
        )}

        <div className="d-flex flex-column flex-fill px-2">
          <span>{issue.title}</span>
          <span className="issue-subinfo">
            {`#${issue.number} opened ${timeSince(issue.created_at)} ago by `}
            <span className="fw-bold">{issue.user.login}</span>
          </span>
          <div className="d-flex mt-2 gap-2">
            {issue.labels.map((label) => (
              <span
                className="rounded-pill px-2 py-1"
                style={{
                  border: `1px black solid`,
                  color: "black",
                  backgroundColor: `#${label.color}`,
                  opacity: 0.8,
                  fontSize: 11,
                  fontWeight: "bold",
                }}
                key={label.id}
              >
                {label.name}
              </span>
            ))}
          </div>
        </div>

        <div className="d-flex align-items-center">
          <img
            src={issue.user.avatar_url}
            alt={issue.user.login}
            className="avatar"
          />
          <span className="px-2">{issue.comments}</span>
          <FiMessageSquare />
        </div>
      </div>
    </div>
  );
};
