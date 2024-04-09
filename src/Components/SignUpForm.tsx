import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginState } from "../store/atoms/admin";
import { useSetRecoilState } from "recoil";

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setLoggedIn = useSetRecoilState(loginState);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const data = await fetch('http://localhost:3000/admin/signup',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username": username,
        "password": password
      })
    });

    const json = await data.json();
    console.log(json);
    if (json.token) {
      localStorage.setItem('token', json.token);
      setLoggedIn({
        isLoggedIn: true,
        userName: username
      });
      navigate('/admin/dashboard');
    }
    else alert(json.msg);
  }

  return (
    <div className="p-4 w-2/5 mx-auto mt-12 bg-slate-200 shadow-lg rounded-lg">
      <h3 className="text-xl font-light text-center my-2">Tutor&apos;s Signup:</h3>
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
          value="Signup" 
          className="block p-3 bg-slate-500 text-white text-center w-full rounded-lg cursor-pointer hover:bg-slate-400"
          onClick={(e) => {
            e.preventDefault();
            handleSignUp();
          }}
        />

        <span className="mt-4 block text-center text-sm font-light">
          or
          <Link to={"/"}>
            <span 
              className="mx-1 px-3 py-1 bg-red-300 text-black rounded-lg cursor-pointer hover:bg-orange-300"
              >
              Log-in
            </span>
          </Link>
        </span>
      </form>
    </div>
  )
}

export default SignUpForm;