import { Link } from "react-router-dom";
import { Course } from "./AdminDashboard";

const Courses = ({ courses } : {courses: Course[]}) => {
  return (
    <>
      {
        courses.map(course => (
          <Link to={'/admin/courses/' + course._id} key={course._id}>
            <div  className="m-4 w-1/5 min-w-[250px] border border-black bg-gray-200 shadow-xl rounded-lg cursor-pointer hover:bg-gray-300">
              <h2 className="text-lg font-normal m-1 p-2">{course.title}</h2>
              <h3 className="m-2 p-2">{course.description}</h3>
              <h3 className="m-2 p-2 text-sm font-light">{course.price}</h3>
            </div>
          </Link>
        ))
      }
    </>
  )
}

export default Courses;