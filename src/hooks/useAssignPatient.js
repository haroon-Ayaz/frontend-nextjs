import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignPatientAPI } from "@/app/updates/utils/api";

export function useAssignPatient() {
  const queryClient = useQueryClient();
  return useMutation(assignPatientAPI, {
    onSuccess: () => {
      // Invalidate patients query so it refetches the updated data
      queryClient.invalidateQueries(["patients"]);
    },
  });
}
