import { FC } from "react";
import { useLabels } from "../../hooks/useLabels";

interface Props {
  selectedLabels: string[];
  onChange: (labelName: string) => void;
}

export const LabelPicker: FC<Props> = ({ selectedLabels, onChange }) => {
  const { isFetching, isLoading, error, isError, data } = useLabels();

  return (
    <>
      {isLoading ? (
        <h2>Cargando...</h2>
      ) : (
        data!.map((label) => (
          <span
            key={label.id}
            className={`badge rounded-pill m-1 label-picker ${selectedLabels.includes(label.name) && 'label-active'}`}
            style={{
              border: `1px solid #${label.color}`,
              color: `#${label.color}`,
            }}
            onClick={() => onChange(label.name)}
          >
            {label.name}
          </span>
        ))
      )}
    </>
  );
};
