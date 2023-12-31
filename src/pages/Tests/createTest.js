import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link,
  FormHelperText,
  Snackbar,
  Alert
} from "@mui/material";
import { Helmet } from "react-helmet";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "react-hook-form";
import BASE_URL from "../../Utils/baseUrl";
import CreatedBy from "../../Utils/createdBy";
import token from "../../Utils/token";
import Network from "../../Utils/network";
import SidebarLeft from "../../components/Sidebar/SidebarLeft";

const StyledFormControl = styled(FormControl)({
  marginBottom: "16px",
});

const CreateTest = () => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    details: "",
    category_guid:"",
    created_by: { CreatedBy },
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isTestCreated, setIsTestCreated] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [guid, setGuid] = useState("");

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Network", `${Network}`);

  var formdata = new FormData();
  formdata.append("title", formData.title);
  formdata.append("type", formData.type);
  formdata.append("category_guid", formData.category_guid);
  formdata.append("details", formData.details);
  formdata.append("created_by", CreatedBy);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  // function handleInputChange(event) {
  //   setFormData({
  //     ...formData,
  //     [event.target.name]: event.target.value,
  //   });
  // }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const handleFormSubmit = async (event) => {
    if (event && typeof event.preventDefault === "function") {
      event.preventDefault();
    }
    //event.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/tests/add`, requestOptions);
      const result = await response.json();
      setAlertOpen(true)
      if (result.success === true) {
        setIsTestCreated(true);
        setTimeout(() => {
          const newTestID = result.payload.guid;
          setGuid(newTestID);
          setAlertOpen(false)
          navigate(`/test/manage/${newTestID}`);
        }, 3000);
      }
      else {
        setAlertOpen(false)
        setIsTestCreated(false);
      }
    } catch (error) {
      setValidationErrors(error.response.data);
      setIsTestCreated(false);
    }
  };

  // Fetch Category List
  const [testCategory, setTestCategory] = useState([]);
  React.useEffect(() => {
    const fetchCategoryList = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Network", `${Network}`);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };
      try {
        const response = await fetch(
          `${BASE_URL}/tests/categories`,
          requestOptions
        );
        const result = await response.json();
        setTestCategory(result.payload);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchCategoryList();
  }, []);

  return (
    <>
      <Helmet>
        <title>Create Test</title>
      </Helmet>
      <Box sx={{ display: "flex" }}>
        <SidebarLeft />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Grid
            container
            spacing={2}
            sx={{ width: "100%" }}
            alignItems="center"
          >
            <Snackbar
          open={alertOpen}
          autoHideDuration={3000}
          onClose={() => setAlertOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={isTestCreated === true ? "success" : "warning"}>
            {isTestCreated === true
              ? "Test created Successfull"
              : "Someting went wrong!"}
          </Alert>
        </Snackbar>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={6}>
              <Typography variant="h1" sx={{ fontSize: 30, fontWeight: 600 }}>
                Create Test
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              <Button variant="contained" component={Link} href="/test/list" className="custom-button">
                Cancel
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <StyledFormControl sx={{ width: "100%" }}>
                  <TextField
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    pattern="[A-Za-z]{1,}"
                  />
                  {validationErrors.title && (
                    <FormHelperText error>
                      {validationErrors.title}
                    </FormHelperText>
                  )}
                </StyledFormControl>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl sx={{ mt: 5, width: "100%" }}>
                      <InputLabel id="type-select-label">Type</InputLabel>
                      <Select
                        labelId="type-select-label"
                        id="type-select"
                        name="type"
                        value={formData.type}
                        label="Type"
                        onChange={handleInputChange}
                        required
                      >
                        <MenuItem value={`practice`}>Practice</MenuItem>
                        <MenuItem value={`evaluated`}>Evaluated</MenuItem>
                        <MenuItem value={`quiz`}>Quizz</MenuItem>
                      </Select>
                      {validationErrors.type && (
                        <FormHelperText error>
                          {validationErrors.type}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl sx={{ mt: 5, width: "100%" }}>
                      <InputLabel id="category-select-label">
                        Category
                      </InputLabel>
                      <Select
                        labelId="category-select-label"
                        id="category-select"
                        name="category_guid"
                        value={formData.category_guid}
                        label="Category"
                        onChange={handleInputChange}
                        required
                      >
                        {testCategory &&
                          testCategory.map((category, index) => (
                            <MenuItem key={index} value={category.guid}>
                              {category.title}
                            </MenuItem>
                          ))}
                        {/* <MenuItem value={`practice`}>Practice</MenuItem>
                        <MenuItem value={`evaluated`}>Evaluated</MenuItem>
                        <MenuItem value={`quiz`}>Quizz</MenuItem> */}
                      </Select>
                      {validationErrors.category_guid && (
                        <FormHelperText error>
                          {validationErrors.category_guid}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
                <StyledFormControl sx={{ mt: 5, width: "100%" }}>
                  <label
                    htmlFor="details"
                    sx={{
                      fontSize: 24,
                      fontWeight: 600,
                      fontFamily: "Arial",
                      mt: 5,
                    }}
                  >
                    Details
                  </label>
                  <Editor
                    onEditorChange={(content) =>
                      setFormData((formData) => ({
                        ...formData,
                        details: content,
                      }))
                    }
                  />
                </StyledFormControl>

                <Button variant="contained" type="submit" className="custom-button">
                  Save Test
                </Button>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
export default CreateTest;
