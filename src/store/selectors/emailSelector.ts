import { selector } from "recoil";
import { loginState } from "../atoms/admin";

export const emailSelector = selector({
  key: "emailSelector",
  get: ({get}) => {
    const state = get(loginState);
    return state.userName
  }
})