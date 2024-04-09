import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loginState } from "../store/atoms/admin";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const setLoggedIn = useSetRecoilState(loginState);

  const handleLoginAdmin = async () => {
    const data = await fetch('http://localhost:3000/admin/login',{
      method: "POST",
      headers: {
        "username": username,
        "password": password
      }
    });

    const json = await data.json();
    console.log(json);

    if (json?.token) {
      localStorage.setItem('token', json.token);
      navigate('/admin/dashboard');
      setLoggedIn({
        isLoggedIn: true,
        userName: username
      });
      // window.location = "/admin/dashboard"
    }
    else alert(json?.message);
  }

  return (
    <div className="p-4 w-full">
      <h3 className="text-xl font-light text-center my-2">Tutor&apos;s Login:</h3>
      <form>
        <label htmlFor="username" className="">username:</label> <br />
        <input 
          type="email" 
          id="username" 
          value={username} 
          onChange={(e) => {
            setUsername(e.target.value)
          }} 
          placeholder="type username..." 
          className="border-2 py-2 px-4 rounded-lg block w-full"
        /> 
        <br/>
        <label htmlFor="password" className="">password:</label> 
        <br />
        <input 
          type="password" 
          id="password" 
          placeholder="type password..." 
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          className="border-2 py-2 px-4 rounded-lg block w-full"
        /> 
        <br/>

        <input 
            type="submit" 
            value="Login" 
            className="block p-3 bg-slate-500 text-white text-center w-full rounded-lg cursor-pointer hover:bg-slate-400"
            onClick={(e) => {
              e.preventDefault();
              handleLoginAdmin();
            }}
        />
        
        <span className="mt-4 block text-center text-sm font-light">
          or
          <Link to={"/admin/signup"}>
            <span 
              className="mx-1 px-3 py-1 bg-red-300 text-black rounded-lg cursor-pointer hover:bg-orange-300"
              >
              Sign-up
            </span>
          </Link>
        </span>
        
      </form>
    </div>
  )
}

export default LoginForm;