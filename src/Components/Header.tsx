import HeaderRight from "./HeaderRight";
import { useSetRecoilState } from "recoil";
import { loginState } from "../store/atoms/admin";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const setLoggedIn = useSetRecoilState(loginState);
  return (
    <div className="bg-slate-200 text-center h-auto shadow-lg w-full flex justify-between">
      <div>
        <h1 className="p-4 text-xl cursor-pointer" onClick={(e) => {
          e.preventDefault();
          setLoggedIn({
            isLoggedIn: false,
            userName: ''
          });
          navigate('/')
        }}>
          Course-Selling App
        </h1>
      </div>

      <HeaderRight/>
    </div>
  )
};

export default Header;