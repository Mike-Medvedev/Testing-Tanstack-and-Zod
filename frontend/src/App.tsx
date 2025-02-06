import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { fetchNames } from "./api";
import AddName from "./AddName";
import DeleteName from "./DeleteName";

const App = () => {
  const [triggerNamesFetch, setTriggerNamesFetch] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { data, isError, isFetching } = useQuery<string[]>({
    queryKey: ["names"],
    queryFn: fetchNames,
    enabled: triggerNamesFetch,
  });

  const loading = "Fetching..";

  const error = "Error...";

  return (
    <div
      id="Container"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <div
        id="ButtonGroup1"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <button
          style={{ padding: "1rem", borderRadius: "4px" }}
          onClick={() => {
            queryClient.invalidateQueries({ queryKey: ["names"] });
            setTriggerNamesFetch(true);
          }}
        >
          Click me for data!
        </button>
        {isFetching
          ? loading
          : isError
          ? error
          : data &&
            data.map((name, index) => (
              <div key={index} style={{ display: "flex", gap: "1rem" }}>
                {name} <DeleteName name={name} />
              </div>
            ))}
      </div>
      <AddName />
    </div>
  );
};
export default App;
