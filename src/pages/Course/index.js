import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Grid,
  Link,
  Button,
  FormControl,
  TextField,
  MenuItem,
  Menu,
  Select,
  InputLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Helmet } from "react-helmet";
import SidebarLeft from "../../components/Sidebar/SidebarLeft";
import Course from "../../assets/images/Course.jpg";
import BASE_URL from "../../Utils/baseUrl";
import token from "../../Utils/token";
import Network from "../../Utils/network";

const Courses = () => {
  // State Manage
  const [courses, setCourses] = useState("");
  const [loading, setLoading] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");
  // Authorization
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Network", `${Network}`);

  // Fetch Course list
  useEffect(() => {
    const fetchCourses = async () => {
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      try {
        const response = await fetch(`${BASE_URL}/course/list`, requestOptions);
        const result = await response.json();
        setCourses(result.payload.data);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Search Users
  const filteredCourse =
    courses &&
    courses.filter((course) => {
      const searchVal = `${course.title} ${course.description}`.toLowerCase();
      const searchValue = searchTitle.toLowerCase();
      return searchVal.includes(searchValue);
    });

  // Pagination here
  const [currentPage, setCurrentPage] = useState(1);
  const [coursePerPage] = useState(3);
  const lastIndex = currentPage * coursePerPage;
  const firstIndex = lastIndex - coursePerPage;
  const currentCourse = filteredCourse.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(
    filteredCourse && filteredCourse.length / coursePerPage
  );
  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  function prePage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  }
  console.log(courses);
  return (
    <>
      <Helmet>
        <title>All Courses</title>
      </Helmet>
      <Box sx={{ display: "flex" }}>
        <SidebarLeft />
        <Box sx={{ flexGrow: 1, p: 3, mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <h1>All Courses</h1>
            </Grid>
            <Grid item xs={6} sx={{display:"flex", justifyContent:"right"}}>
              <Button
                component={Link}
                href={`/course/create/`}
                variant="contained"
              >
                Add Course
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Search by title"
                placeholder="Search by title"
                value={searchTitle}
                //onChange={(e) => setSearchTitle(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={8} sx={{ textAlign: "right" }}>
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel id="type">Filter By Type:</InputLabel>
                <Select
                  labelId="type-label"
                  id="type-id"
                  //value={testType}
                  //onChange={(e) => setTestType(e.target.value)}
                  autoWidth
                  label="Filter By Type:"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="practice">Practice</MenuItem>
                  <MenuItem value="evaluated">Evaluated</MenuItem>
                  <MenuItem value="quiz">Quizz</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 160, ml: 3 }}>
                <InputLabel id="status">Filter By Status:</InputLabel>
                <Select
                  labelId="status-label"
                  id="status-id"
                  //value={testStatus}
                  //onChange={handleStatusChange}
                  autoWidth
                  label="Filter By Status:"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="0">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }} className="manage-course">
            <Grid item xs={12}>
              {loading ? (
                <Box sx={{ textAlign: "center", mt: 5 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Card>
                  {courses && courses.length !== 0 ? (
                    courses &&
                    courses.map((course, index) => (
                      <Box sx={{ px: 3 }} key={index}>
                        <Grid
                          container
                          sx={{
                            borderBottom: "1px solid #B8B8B8",
                            py: 2,
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Grid item xs={12} md={1}>
                            <Box className="course-image">
                              <img
                                src={Course}
                                alt={course.title}
                                loading="lazy"
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={5}>
                            <h3>{course.title}</h3>
                          </Grid>
                          <Grid item xs={12} md={2}>
                            <h4>{course.created_by}</h4>
                          </Grid>
                          <Grid item xs={12} md={2}>
                            <Button
                              component={Link}
                              href={`/course/manage/${course.guid}`}
                              variant="outlined"
                            >
                              Manage Course
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    ))
                  ) : (
                    <Alert sx={{ mt: 5 }} severity="error">
                      Course not found!
                    </Alert>
                  )}
                </Card>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Courses;
