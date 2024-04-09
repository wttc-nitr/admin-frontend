import { loginState } from "../atoms/admin";
import { selector } from "recoil";

export const loginSelector = selector({
  key: "loginSelector",
  get: ({get}) => {
    const state = get(loginState);
    return state.isLoggedIn;
  }
});