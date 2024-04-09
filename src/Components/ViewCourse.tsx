import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Course } from "./AdminDashboard";

const ViewCourse = () => {
  const {courseId} = useParams();
  // console.log('useParams', courseId);
  const [courses, setCourses] = useState<Course[]>([]);
  const [read, setRead] = useState(true);
  const [title, setTitle] = useState('title');
  const [desc, setDesc] = useState('description');
  const [price, setPrice] = useState(0);

  const [cnt1, setCnt1] = useState(0);
  const [cnt2, setCnt2] = useState(0);
  const [cnt3, setCnt3] = useState(0);

  const fetchData = async () => {
    const data = await fetch('http://localhost:3000/admin/courses', {
      method: "get",
      headers: {
        authorization: "Bearer " + localStorage.getItem('token')
      }
    });

    const json = await data.json()
    setCourses(json.courses);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (courses.length === 0)
    return (
      <div>
        <Link to={'/admin/dashboard'}>
          <h2 className="text-lg font-semibold">Go-to Admin-Dashboard</h2>
        </Link>
        <h3>Loading your course...</h3>
      </div>
    )

  const course = courses.filter(course => course._id === courseId)[0];
  // console.log(course);

  const handleUpdate = async () => {
    const data = await fetch('http://localhost:3000/admin/courses/' + courseId, {
      method: 'put',
      headers: {
        authorization: "Bearer " + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "title": title, 
        "description": desc, 
        "price": price, 
        "imageLink": "https://linktoimage.com", 
        "published": true 
      })
    });

    const json = await data.json();
    console.log(json);
  }

  return (
    <div className="text-center">
      <div>
        <Link to={'/admin/dashboard'}>
          <h2 className="text-lg font-semibold m-4 p-4 bg-teal-100 rounded-md shadow-lg">Go-to Admin-Dashboard</h2>
        </Link>
      </div>

      <div className="mx-auto p-4 my-4 w-1/2 border border-black bg-green-100 h-72 shadow-xl rounded-lg flex flex-col justify-around">
        <input 
          type="text" 
          value={cnt1 === 0 ? course.title : title } 
          readOnly={read} 
          className="block text-lg font-normal m-1 p-2 w-full rounded-lg"
          onChange={(e) => {
            setCnt1(i => i+1);
            setTitle(e.target.value)
          }}
        />
        <input 
          type="text" 
          value={cnt2 === 0 ? course.description : desc} 
          readOnly={read} 
          className="block text-lg font-normal m-1 p-2 w-full rounded-lg"
          onChange={(e) => {
            setCnt2(i => i+1);
            setDesc(e.target.value);
          }}
        />
        <input 
          type="text" 
          value={cnt3 === 0 ? course.price : price} 
          readOnly={read} 
          className="block text-lg font-normal m-1 p-2 w-full rounded-lg"
          onChange={(e) => {
            setCnt3(i => i+1);
            setPrice(parseInt(e.target.value))
          }}
        />
        {/* <h2 className="text-lg font-normal m-1 p-2">{course.title}</h2>
        <h3 className="m-2 p-2">{course.description}</h3>
        <h3 className="m-2 p-2 text-sm font-light">{course.price}</h3> */}
      </div>

      <div className="mx-auto my-3 p-4">
        <button 
          className="inline-block p-2 m-2 w-1/2 bg-amber-300 text-black hover:bg-amber-200 rounded-xl"
          onClick={() => setRead(x => !x)}
          >
            Edit this Course
        </button>
        <button 
          className="inline-block p-2 m-2 w-1/2 bg-orange-700 text-white hover:bg-orange-800 rounded-xl"
          onClick={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
          >
            Update the Course
        </button>
      </div>
    </div>
  )
}

export default ViewCourse;