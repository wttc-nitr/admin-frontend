import React from 'react'
import ReactDOM from 'react-dom/client'
import AppLayout from './AppLayout';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import SignUpForm from './Components/SignUpForm';
import AdminDashboard from './Components/AdminDashboard';
import Body from './Components/Body';
import ViewCourse from './Components/ViewCourse';
import CreateCourse from './Components/CreateCourse';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout/>,
    children: [
      {
        path: '/',
        element: <Body/>
      },
      {
        path: '/admin/signup',
        element: <SignUpForm/>
      },
      {
        path: '/admin/dashboard',
        element: <AdminDashboard/>
      }, 
      {
        path: '/admin/courses/:courseId',
        element: <ViewCourse />
      }, 
      {
        path: '/admin/createcourse',
        element: <CreateCourse/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter}/>
  </React.StrictMode>
);
