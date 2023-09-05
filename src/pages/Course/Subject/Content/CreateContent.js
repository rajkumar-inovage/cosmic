import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Button,
  InputLabel,
  Link,
  Input,
  IconButton,
  Snackbar,
  Alert,
  Card,
  CssBaseline,
  Container,
} from "@mui/material";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import BASE_URL from "../../../../Utils/baseUrl";
import token from "../../../../Utils/token";
import Network from "../../../../Utils/network";
import CreatedBy from "../../../../Utils/createdBy";
import { serialize } from "object-to-formdata";
import FormTextField from "../../../../components/Common/formTextField";
import FormEditorField from "../../../../components/Common/formEditorField";
import SidebarLeft from "../../../../components/Sidebar/SidebarLeft";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import RightSidebar from "components/Sidebar/RightSidebar";
import TextFieldsOutlinedIcon from "@mui/icons-material/TextFieldsOutlined";
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
import TheatersOutlinedIcon from "@mui/icons-material/TheatersOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";

const CreateContent = () => {
  const { courseGuid } = useParams();
  const [alertOpen, setAlertOpen] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [valueLength, setValueLength] = useState("");
  const [isInputValid, setInputValid] = useState(true);
  const [titleValid, setTitleValid] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isTextareaValid, setTextareaValid] = useState(false);
  const [isTitleLengthValid, setIsTitleLengthValid] = useState(false);
  const [fileError, setFileError] = useState(null);
  const [filename, setFilename] = useState(null);
  const [editorFields, setEditorFields] = useState([]);
  const [textFields, setTextFields] = useState([]);
  const [mediaFields, setMediaFields] = useState([]);
  const [urlFields, setUrlFields] = useState([]);
  const navigate = useNavigate();
  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      userfile: undefined,
      created_by: CreatedBy,
    },
  });
  const { title } = watch();
  // Append Fields
  const handleAddEditorField = () => {
    const newEditorField = (
      <FormEditorField
        control={control}
        name={`description_${editorFields.length}`}
      />
    );
    setEditorFields([...editorFields, newEditorField]);
  };

  const handleAddTextField = () => {
    const newTextField = (
      <FormTextField
        control={control}
        name={`text_field_${textFields.length}`}
      />
    );
    setTextFields([...textFields, newTextField]);
  };

  const handleAddMediaField = () => {
    const newMediaField = (
      <Grid item xs={12} className="content" key={mediaFields.length}>
        {/* Your media field content */}
      </Grid>
    );
    setMediaFields([...mediaFields, newMediaField]);
  };

  const handleAddUrlField = () => {
    // Handle adding URL fields
  };

  // Validation on character Length
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setTitleValid(newValue.length);
    const truncatedValue = newValue.slice(0, 50);
    setInputValue(truncatedValue);
    setValue("title", truncatedValue);
    setValueLength(truncatedValue.length);
    const isValid = truncatedValue.length >= 3 && truncatedValue.length <= 50;
    setInputValid(isValid);
    if (truncatedValue.length === 50) {
      setInputValid(false);
    }
  };
  // /Validation on file size
  const handleFileChange = (e) => {
    const [selectedFile] = e.target.files;
    if (selectedFile) {
      if (selectedFile.size > 300 * 1024 * 1024) {
        setFileError("File size should be less than 300MB.");
        setFilename(null);
      } else {
        setFileError("");
        setFilename(selectedFile.name);
        setValue("userfile", selectedFile);
      }
    }
  };

  // Authentication
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Network", `${Network}`);

  const handleFormSubmit = async (data) => {
    if (data.description.length >= 107) {
      setTextareaValid(true);
    } else if (titleValid < 3 || titleValid > 50) {
      setIsTitleLengthValid(true);
    } else {
      console.log(data);
      setAlertOpen(true);
      setIsSuccess(true);
      setTextareaValid(false);
      setIsTitleLengthValid(false);
      setTimeout(() => {
        setAlertOpen(false);
      }, 1000);
    }
  };
  return (
    <>
      <Helmet>
        <title>Create Content</title>
      </Helmet>
      <Box sx={{ display: "flex" }}>
        <SidebarLeft />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Grid
            container
            spacing={2}
            sx={{ width: "100%" }}
            alignItems="center"
          ></Grid>
          <Grid container spacing={2} sx={{ my: 1 }}>
            <Grid item xs={6}>
              <Typography variant="h1" sx={{ fontSize: 30, fontWeight: 600 }}>
                Create Content
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              <Button
                variant="contained"
                className="custom-button"
                href={`/course/subjects`}
                component={Link}
              >
                Back
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ my: 1 }}>
            <Grid item xs={9}>
              <Card sx={{ p: 3, height: "100%" }}>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} className="content">
                      <FormTextField
                        control={control}
                        label="Title"
                        variant="outlined"
                        name="title"
                        pattern="[A-Za-z]{1,}"
                        style={{ width: "100%" }}
                        onChange={handleInputChange}
                        required
                        value={title}
                        error={!isInputValid}
                        helperText={
                          !isInputValid
                            ? "Title must be between 3 and 35 characters"
                            : ""
                        }
                      />
                      {isTitleLengthValid && (
                        <Typography sx={{ mt: 2 }} color="error">
                          Title must have allowed min 3 and max 35 characters
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} className="content">
                      <FormEditorField control={control} name="description" />
                    </Grid>
                    <Grid item xs={12} className="content">
                      <Box className="add-file">
                        <input
                          name="userfile"
                          id="file-input"
                          type="file"
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                        />
                        <strong>Upload File</strong>
                        <label htmlFor="file-input">
                          <IconButton component="span">
                            <FileUploadIcon
                              sx={{
                                color: "#EAC43D",
                                width: "50px",
                                height: "50px",
                                cursor: "pointer",
                              }}
                            />
                          </IconButton>
                        </label>
                        <span>{filename ? filename : "No file selected"}</span>
                        {fileError && (
                          <p style={{ color: "red" }}>{fileError}</p>
                        )}
                      </Box>
                    </Grid>
                    {editorFields.map((field, index) => (
                      <Grid item xs={12} key={index} className="content">
                        {field}
                      </Grid>
                    ))}
                    {textFields.map((field, index) => (
                      <Grid item xs={12} key={index} className="content">
                        {field}
                      </Grid>
                    ))}
                    {mediaFields.map((field, index) => (
                      <Grid item xs={12} key={index} className="content">
                        {field}
                      </Grid>
                    ))}
                    {/* Add other fields here */}
                  </Grid>

                  <Button
                    variant="contained"
                    size="medium"
                    type="submit"
                    sx={{ mt: 5 }}
                    className="custom-button"
                  >
                    Create
                  </Button>
                </form>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card sx={{ p: 3, height: "100%" }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography>Select Tools</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="outlined"
                      className="textField"
                      onClick={handleAddTextField}
                    >
                      <TextFieldsOutlinedIcon />
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="outlined"
                      className="editorField"
                      onClick={handleAddEditorField}
                    >
                      <IntegrationInstructionsOutlinedIcon />
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="outlined"
                      className="mediaField"
                      onClick={handleAddMediaField}
                    >
                      <TheatersOutlinedIcon />
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="outlined"
                      className="linkField"
                      onClick={handleAddUrlField}
                    >
                      <LinkOutlinedIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
export default CreateContent;
