import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteName } from "./api";

interface props {
  name: string;
}

const DeleteName = ({ name }: props) => {
  const queryClient = useQueryClient();
  const deleteNameMutation = useMutation({
    mutationFn: (value: string) => deleteName(value),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["names"] }),
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
      onClick={() => {
        deleteNameMutation.mutate(name);
      }}
    >
      ❌
    </div>
  );
};
export default DeleteName;
