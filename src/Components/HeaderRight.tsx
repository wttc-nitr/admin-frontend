import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "../store/atoms/admin";
import { loginSelector } from "../store/selectors/loginSelector";

const HeaderRight = () => {
  const loggedIn = useRecoilValue(loginSelector);
  const setLoggedIn = useSetRecoilState(loginState);
  const navigate = useNavigate();

  return (
    <div>
        {
          !loggedIn ? (
              <div className="flex">
              <Link to={'/'}>
                <h3 className="py-2 px-4 m-2 bg-blue-600 text-white rounded-lg">Login</h3>
              </Link>
              <Link to={'/admin/signup'}>
                <h3 className="py-2 px-4 m-2 bg-cyan-700 text-white rounded-lg">Signup</h3>
              </Link>
            </div>
          ) : (
            <div>
            <button 
              className="inline-block py-2 px-4 m-2 bg-slate-700 text-white rounded-md"
              onClick={() => {
                setLoggedIn({
                  isLoggedIn: false,
                  userName: ''
                });
                localStorage.removeItem('token');
                navigate('/');
              }}
            >
              Logout
            </button>
          </div>
          )
        }
      </div>
  )
};

export default HeaderRight;