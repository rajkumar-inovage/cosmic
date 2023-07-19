import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Grid,
  Tooltip,
  Alert,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import BASE_URL from "../../Utils/baseUrl";
import token from "../../Utils/token";
import Network from "../../Utils/network";
import Online from "./Online";

const OnlineUser = () => {
  // Color Generator
  function generateColorCode(str) {
    const charCode = str.charCodeAt(0);
    const red = (charCode * 20) % 256;
    const green = (charCode * 20) % 256;
    const blue = (charCode * 40) % 256;
    return `rgb(${red}, ${green}, ${blue})`;
  }

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState("");
  // Authorization
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Network", `${Network}`);

  // Fetch user list
  useEffect(() => {
    const fetchUsers = async () => {
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      try {
        const response = await fetch(`${BASE_URL}/users/list`, requestOptions);
        const result = await response.json();
        setUsers(result.payload.data);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  const timestamp = "2023-07-18 19:48:37";
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    const currentTime = new Date().getTime();
    const timestampInMillis = new Date(timestamp).getTime(); // Convert the timestamp to milliseconds
    const diffInMilliseconds = currentTime - timestampInMillis;
    const tenMinutesInMilliseconds = 10 * 60 * 1000; // 10 minutes in milliseconds
    setIsActive(diffInMilliseconds <= tenMinutesInMilliseconds);
  }, [timestamp]);

  return (
    <>
      <Grid container sx={{ alignItems: "center" }}>
        <Grid item xs={12}>
          <h2>Online User</h2>
        </Grid>
      </Grid>
      <Card sx={{ mt: 4.5, maxHeight: "440px", overflowY: "scroll" }}>
        <Box sx={{ p: 3 }}>
          {loading ? (
            <Box sx={{ textAlign: "center", mt: 5 }}>
              <CircularProgress />
            </Box>
          ) : users && users.length !== 0 ? (
            users &&
            users.map((user, index) => {
              const firstInitial = user.first_name ? user.first_name[0] : "";
              const lastInitial = user.last_name ? user.last_name[0] : "";
              const bgColor = generateColorCode(firstInitial + lastInitial);
              return (
                // <Grid
                //   key={index}
                //   container
                //   sx={{
                //     borderBottom: "1px solid #B8B8B8",
                //     py: 2,
                //     alignItems: "center",
                //     justifyContent: "space-between",
                //   }}
                // >
                //   <Grid item xs={3}>
                //     <Box className="online-students">
                //       <Box
                //         className="user-logo"
                //         sx={{
                //           fontSize: 20,
                //           fontWeight: 500,
                //           fontFamily: "Arial",
                //           // backgroundColor: getRandomColor(),
                //           backgroundColor: `${bgColor}`,
                //           color: "#fff",
                //           width: "56px",
                //           height: "56px",
                //           display: "flex",
                //           alignItems: "center",
                //           justifyContent: "center",
                //           borderRadius: "50%",
                //           position: "relative",
                //           textTransform: "uppercase",
                //         }}
                //       >
                //         <span
                //           className="active-status"
                //           style={{
                //             backgroundColor:
                //               user.status === "1" ? "#65C01E" : "#FF725E",
                //           }}
                //         ></span>
                //         {firstInitial}
                //         {lastInitial}
                //       </Box>
                //     </Box>
                //   </Grid>
                //   <Grid item xs={9} className="user-detail">
                //     <h5>
                //       {user.first_name} {user.last_name}
                //     </h5>
                //     <strong>User ID:</strong> {user.guid}
                //   </Grid>
                // </Grid>
                <Online onlineUser={user} firstInitial={firstInitial} lastInitial={lastInitial} bgColor={bgColor}  />
              );
            })
          ) : (
            <Alert sx={{ mt: 5 }} severity="error">
              No user online!
            </Alert>
          )}
        </Box>
      </Card>
    </>
  );
};

export default OnlineUser;
