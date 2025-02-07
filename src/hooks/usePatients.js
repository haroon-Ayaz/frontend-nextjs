import { useQuery } from "@tanstack/react-query";
import { fetchPatients } from "@/app/updates/utils/api";

export function usePatients() {
  return useQuery({
    queryKey: ["patients"],
    queryFn: fetchPatients,
    refetchInterval: 2000,
  });
}