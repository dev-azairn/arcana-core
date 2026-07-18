import api from "./axios";
import type { ActionHistory } from "@/types";
import { mapHistory } from "./mappers";

export const getHistory = async (): Promise<ActionHistory[]> => {
  const { data } = await api.get("/api/history");
  return data.map(mapHistory);
};
