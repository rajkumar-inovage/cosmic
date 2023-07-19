import React from "react";
import { Box } from "@mui/material";
import { Helmet } from "react-helmet";
import SidebarLeft from "../../components/Sidebar/SidebarLeft";

const ManageCourse = () => {
  return (
    <>
      <Helmet>
        <title>Manage Course</title>
      </Helmet>
      <Box sx={{ display: "flex" }}>
        <SidebarLeft />
        <Box sx={{ flexGrow: 1, px: 3, mt: 5 }} className="manage-course">
          <h1>Manage Course</h1>
        </Box>
      </Box>
    </>
  );
};

export default ManageCourse;
