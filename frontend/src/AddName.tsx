import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { postName } from "./api";

const AddName = () => {
  const [value, setValue] = useState<string>("");
  const queryClient = useQueryClient();
  const postNameMutation = useMutation({
    mutationFn: (value: string) => postName(value),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["names"] }),
  });
  return (
    <div
      id="Container"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
        onClick={() => {
          postNameMutation.mutate(value);
        }}
      >
        Add a Name
      </button>
    </div>
  );
};
export default AddName;
