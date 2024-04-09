import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginSelector } from "../store/selectors/loginSelector";

const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [imageLink, setImageLink] = useState('');
  const [checked, setChecked] = useState(false);
  const loggedIn = useRecoilValue(loginSelector);

  if (!loggedIn)
    return <h3>Please login to continue.</h3>


  const handleCreate = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const data = await fetch('http://localhost:3000/admin/courses/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        authorization: "Bearer " + localStorage.getItem('token')
      },
      body: JSON.stringify({
        title,
        description,
        price,
        imageLink,
        "published": checked
      })
    });

    const json = await data.json();
    alert(json.message)
    console.log(json);

    setTitle('');
    setDescription('');
    setPrice(0);
    setChecked(false);
    setImageLink('');
  }

  return (
    <div className="mx-auto">
      <div>
        <Link to={'/admin/dashboard'}>
          <h2 className="text-xl font-semibold text-center my-4">Go-to Admin-Dashboard</h2>
        </Link>
      </div>
      <h3>Create course:</h3>

      <div className="mx-auto p-4 my-4 w-1/2 border bg-gray-200 shadow-lg rounded-lg flex flex-col justify-around">
        <label htmlFor="title">Title:</label>
        <input 
          type="text" 
          id="title"
          value={ title } 
          className="block text-lg font-normal m-1 p-2 w-full rounded-lg"
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />

        <br/>
        
        <label htmlFor="description">Description:</label>
        <input 
          type="text" 
          id="description"
          value={description} 
          className="block text-lg font-normal m-1 p-2 w-full rounded-lg"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <br/>
        
        <label htmlFor="price">Price:</label>
        <input 
          type="text" 
          id="price"
          value={price} 
          className="block text-lg font-normal m-1 p-2 w-full rounded-lg"
          onChange={(e) => {
            setPrice(parseInt(e.target.value))
          }}
        />

        <br/>

        <label htmlFor="imageLink">Image-Link:</label>
        <input 
          type="text" 
          id="imageLink"
          value={imageLink} 
          className="block text-lg font-normal m-1 p-2 w-full rounded-lg"
          onChange={(e) => {
            setImageLink(e.target.value)
          }}
        />

        <br/>
        <div className="flex justiify start px-2">
          <input 
            type="checkbox" 
            id="publish" 
            checked={checked} 
            onChange={() => setChecked(x => !x)} 
            className="inline-block w-8"
          />
          <label htmlFor="publish" className="mx-2">Publish?</label>
        </div>

        <br/>

        <button 
          className="block p-3 bg-sky-500 text-white text-center w-full rounded-lg cursor-pointer hover:bg-sky-700" 
          onClick={(e) => handleCreate(e)}
          >
            Create Course
        </button>
      </div>
    </div>
  )
};

export default CreateCourse;