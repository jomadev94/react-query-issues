import { Link, Navigate, useParams } from "react-router-dom";
import { useIssue } from "../../hooks/useIssue";
import { IssueComment } from "../components/IssueComment";

export const IssueView = () => {
  const params = useParams();
  const { id = "0" } = params;
  const { issueQuery, commentsQuery } = useIssue(id);
  const { data: issue, isLoading, isError } = issueQuery;
  const { data: comments=[] } = commentsQuery;

  return isError ? (
    <Navigate to={"/"} />
  ) : (
    <div className="row mb-5">
      <div className="col-12 mb-3">
        <Link to="./issues/list">Go Back</Link>
      </div>
      {isLoading ? (
        <h2>Cargando...</h2>
      ) : (
        <>
          <IssueComment issue={issue!} />
          {comments.map((comment) => (
            <IssueComment key={comment.id} issue={comment!} />
          ))}
        </>
      )}
    </div>
  );
};
