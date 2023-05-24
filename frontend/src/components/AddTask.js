import * as React from "react";
import axios from "axios";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Switch from "@mui/material/Switch";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";

const defaultTheme = createTheme();
const useStyles = makeStyles()(() => {
  return {
    label: {
      fontSize: "12px",
    },
    input: {
      color:"#000000c7",
      fontSize:"0.9rem"
    },
    dateinput:{
      fontSize: "12px",
      color:"00000071",
      marginTop:"16px"
    }
  };
});


export default function AddTask() {
  const { classes } = useStyles();
  
  function handleSubmit(e) {
    e.preventDefault();

    const url = `http://127.0.0.1:8000/api/createtask/`;
    const newData = new FormData(e.target);

    axios
      .post(url, newData)
      .then((response) => {
        console.log("Task added successfully:", response.data);
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" style={{ width: 420 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p className="font-[500] text-lg" >
            Add Task
          </p>
          <Box component="form" method="POST" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              type="text"
              required
              fullWidth
              id="name"
              label="Task"
              name="name"
              autoComplete="name"
              autoFocus
              variant="standard"
              size="small"
              InputProps={{
                classes: {
                  root: classes.input,
                },
              }}
              InputLabelProps={{
                classes: {
                  root: classes.label,
                },
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="description"
              label="Description"
              type="text"
              id="description"
              autoComplete="description"
              multiline
              maxRows={20}
              variant="standard"
              size="small"
              InputLabelProps={{
                classes: {
                  root: classes.label,
                },
              }}
              InputProps={{
                classes: {
                  root: classes.input,
                },
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              name="duetime"
              type="datetime-local"
              id="duetime"
              variant="standard"
              size="small"
              placeholder="Default Placeholder"
              InputProps={{
                classes: {
                  root: classes.dateinput,
                },
              }}
            />
            <FormControlLabel
              margin="normal"
              label={<span className="text-[0.89rem] text-[#000000a8]">Done</span>}
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "6px",
              }}
              control={
                <Switch
                  name="done"
                  id="done"
                  color="primary"
                />
              }
            />

            <Button type="submit" variant="contained" fullWidth size="small" sx={{ mt: 3 }}>
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
