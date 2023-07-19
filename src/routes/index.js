import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from '../pages'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import ForgotPassword from '../pages/Auth/ForgotPassword'
import CreatePassword from '../pages/Auth/CreatePassword'
import Tests from '../pages/Tests/index'
import CreateTest from '../pages/Tests/createTest'
import EditTest from '../pages/Tests/editTest'
import AddQuestion from '../pages/Tests/addQuestion'
import AllQuestions from '../pages/Tests/allQuestions'
import EditQuestion from '../pages/Tests/editQuestion'
import ImportQuestion from '../pages/Tests/importQuestion'
import PreviewTest from '../pages/Tests/previewTest'
import ManageTest from '../pages/Tests/manageTest'
import EnrollTest from '../pages/Tests/enrollTest'
import Enrollments from '../pages/Tests/enrollments'
import TakeTest from '../pages/Tests/takeTest'
import TestSetting from '../pages/Tests/testSetting'
import SubmissionReports from '../pages/Tests/submissionReports'
import OnlineClasses from '../pages/Classroom'
import CreateMeeting from '../pages/Classroom/CreateMeeting'
import EditMeeting from '../pages/Classroom/EditMeeting'
import ShareMeeting from '../pages/Classroom/ShareMeeting'
import StudentReport from '../pages/Tests/studentReport'
import Dashboard from '../pages/Students'
import Users from '../pages/Users'
import CreateUser from '../pages/Users/Create'
import ViewUser from '../pages/Users/ViewUser'
import EditUser from '../pages/Users/EditUser'
import ManageCourse from "../pages/Course/ManageCourse"
import Courses from "../pages/Course"
import CreateCourse from "../pages/Course/CreateCourse"
import Students from "../pages/Users/Students"



const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<HomePage/>} />
        <Route path={'/auth/login'} element={<Login/>} />
        <Route path={'/auth/register'} element={<Register/>} />
        <Route path={'/auth/forgot-password'} element={<ForgotPassword/>} />
        <Route path={'/auth/create-password'} element={<CreatePassword/>} />
        <Route path={'/test/list'} element={<Tests/>} />
        <Route path={'/test/create'} element={<CreateTest/>} />
        <Route path={'/test/edit/:guid'} element={<EditTest/>} />
        <Route path={'/test/add-question/:guid'} element={<AddQuestion />} />
        <Route path={'/test/all-questions/:guid'} element={<AllQuestions />} />
        <Route path={'/test/edit-question/:guid'} element={<EditQuestion/>} />
        <Route path={'/test/import-question/:guid'} element={<ImportQuestion/>} />
        <Route path={'/test/preview-test/:guid'} element={<PreviewTest/>} />
        <Route path={'/test/manage/:guid'} element={<ManageTest/>} />
        <Route path={'/test/enrollments/:guid'} element={<Enrollments/>} />
        <Route path={'/test/enroll/:guid'} element={<EnrollTest/>} />
        <Route path={'/test/take-test/:guid'} element={<TakeTest/>} />
        <Route path={'/test/setting/:guid'} element={<TestSetting/>} />
        <Route path={'/test/report/:guid'} element={<SubmissionReports/>} />
        <Route path={'/online-classes'} element={<OnlineClasses/>} />
        <Route path={'/meeting/create'} element={<CreateMeeting/>} />
        <Route path={'/meeting/edit/:meetingGuid'} element={<EditMeeting/>} />
        <Route path={'/meeting/share/:meetingGuid'} element={<ShareMeeting/>} />
        <Route path={'/test/report/test-id/student-id'} element={<StudentReport/>} />
        <Route path={'/student/dashboard'} element={<Dashboard/>} />
        <Route path={'/user/list'} element={<Users/>} />
        <Route path={'/user/create'} element={<CreateUser/>} />
        <Route path={'/user/view/:userGuid'} element={<ViewUser/>} />
        <Route path={'/user/edit/:userGuid'} element={<EditUser />} />
        <Route path={'/course/manage/:courseGuid'} element={<ManageCourse />} />
        <Route path={'/course/list'} element={<Courses/>} />
        <Route path={'/course/create'} element={<CreateCourse />} />
        <Route path={'/user/students'} element={<Students/>}/>
      </Routes>
    </Router>
  )
}

export default AppRouter