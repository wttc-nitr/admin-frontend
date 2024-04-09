// import {Link} from "react-router-dom"
import LoginForm from "./LoginForm";

const Body = () => {  
  return (
    <div className="w-full  flex justify-around mx-auto mt-12 ">
      <div className="w-2/5 bg-slate-200 rounded-lg shadow-lg">
        <LoginForm />

      </div>
    </div>
  )
}

export default Body;