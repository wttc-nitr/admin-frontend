import Header from "./Components/Header";
import { Outlet } from "react-router-dom";
import { RecoilRoot } from "recoil";

const AppLayout = () => {
  return (
    <>
      <RecoilRoot>
        <Header/>
        <Outlet/>
      </RecoilRoot>
    </>
  )
};

export default AppLayout;