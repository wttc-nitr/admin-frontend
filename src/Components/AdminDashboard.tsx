import { useEffect, useState } from "react";
import Courses from "./Courses";
import { Link } from "react-router-dom";

export type Course = { 
  _id?: string
  "title": string, 
  "description": string, 
  "price": number, 
  "imageLink": string, 
  "published": boolean 
};

const AdminDashboard = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  const fetchData = async () => {
    const data = await fetch('http://localhost:3000/admin/courses', {
      method: 'get',
      headers: {
        authorization: "Bearer " + localStorage.getItem('token')
      }
    });

    const json = await data.json();
    console.log(json);

    setCourses(json.courses);
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!courses || courses.length === 0)
    return <div>Loading dashboard...</div>;

  return (
    <div className="mx-auto">
      <h2>Admin Dashboard</h2>
      <h2>Hi there admin</h2>
      <h3>Your created courses:</h3>

      <Link to={'/admin/createcourse'}>
        <h3 className="p-4 m-4 bg-sky-500">Create a new course.</h3>
      </Link>

      <div className="m-2 p-2 flex flex-wrap justify-center">
        <Courses courses={courses}/>
      </div>

    </div>
  )
};

export default AdminDashboard;