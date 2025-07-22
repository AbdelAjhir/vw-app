import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "./index";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (_state: RootState) => T): T => {
  return useSelector(selector);
};
