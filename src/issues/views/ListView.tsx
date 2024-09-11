import { useState } from "react";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssuesInfinite } from "../../hooks/useIssues";
import { State } from "../../models/issue";

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();

  const { query: issuesQuery } = useIssuesInfinite({
    state: state,
    labels: selectedLabels,
  });

  const { isLoading, data, isFetching, fetchNextPage, hasNextPage } = issuesQuery;

  const changeState = (state: State | undefined) => {
    setState(state);
  };

  const onLabelChanged = (labelName: string) => {
    const labels = selectedLabels.includes(labelName)
      ? selectedLabels.filter((label) => label != labelName)
      : [...selectedLabels, labelName];
    setSelectedLabels(labels);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {isLoading ? (
          <h2>Cargando...</h2>
        ) : (
          <>
            <IssueList
              issues={data?.pages.flat() || []}
              state={state}
              onChangeState={(state) => changeState(state)}
            />
            <div className="d-flex justify-content-between align-items-center mt-3">
              <button
                onClick={() => fetchNextPage()}
                className="btn btn-outline-primary"
                disabled={isFetching || !hasNextPage}
              >
                Ver mas
              </button>
            </div>
          </>
        )}
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={(labelName) => onLabelChanged(labelName)}
        />
      </div>
    </div>
  );
};
