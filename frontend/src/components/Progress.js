import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Card, Tag, Typography } from "antd";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Switch from "@mui/material/Switch";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";
const { Text } = Typography;

const defaultTheme = createTheme();

const { Meta } = Card;

const useStyles = makeStyles()(() => {
  return {
    label: {
      fontSize: "12px",
    },
    input: {
      color:"#000000c7",
      fontSize:"0.9rem"
    },
  };
});

export default function Progress() {
  const { classes } = useStyles();
  const [task, setTask] = useState([]);
  const [isedit, setIsedit] = useState(false);
  const [id, setId] = useState();
  const [isDelete, setDelete] = useState(false);
  function getDateTime(dateString) {
    var time = dateString.slice(11, 16);

    const dateObject = new Date(dateString);
    const day = dateObject.getDate();
    const month = dateObject.toLocaleString("default", { month: "short" });
    const year = dateObject.getFullYear().toString().slice(-2);

    const date = `${day} ${month} ${year}`;

    console.log(time);
    console.log(date);
    return { date, time };
  }

  function getTask() {
    const url = `http://127.0.0.1:8000/api/gettask/`;

    axios
      .get(url)
      .then((response) => {
        console.log("Get task :" + response.data);
        setTask(response.data.filter(ele=>ele.done===false));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  }

  function handleEdit(e) {
    e.preventDefault();

    const url = `http://127.0.0.1:8000/api/updatetask/${id}`;
    const newData = new FormData(e.target);

    axios
      .put(url, newData)
      .then((response) => {
        console.log("Task updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });

    setIsedit(!isedit);
  }

  function handleDelete(id) {
    const url = `http://127.0.0.1:8000/api/deletetask/${id}`;
    axios
      .delete(url)
      .then((response) => {
        console.log("Task deleted successfully:");
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });

    setDelete(!isDelete);
  }

  function handleChange(id) {
    setIsedit(!isedit);
    setId(id);
  }

  useEffect(() => {
    getTask();
  }, [isedit, id, isDelete]);

  return (
    <div className="ml-10 mt-10 grid grid-cols-3 gap-6">
      {task.map((ele) => {
        var { date, time } = getDateTime(ele.duetime);
        return ele.id === id && isedit ? (
          <Card style={{ width: 300 }}>
              <Box component="form" method="POST" onSubmit={handleEdit}>
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
                  defaultValue={ele.name}
                  InputProps={{
                    classes:{
                      root:classes.input,
                    }
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
                  maxRows={10}
                  variant="standard"
                  size="small"
                  defaultValue={ele.description}
                  InputLabelProps={{
                    classes: {
                      root: classes.label,
                    },
                  }}
                  InputProps={{
                    classes:{
                      root:classes.input,
                    }
                  }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="duetime"
                  type="datetime-local"
                  id="duetime"
                  variant="standard"
                  size="small"
                  defaultValue={ele.duetime.slice(0, -4)}
                  InputProps={{
                    classes:{
                      root:classes.input,
                    }
                  }}
                />
                <FormControlLabel
                  label={<span style={{ fontSize: "12px" }}>Done</span>}
                  sx={{
                    display: "flex",
                    alignItems:"center",
                    marginTop:"4px"
                  }}
                  control={<Switch defaultChecked={ele.done} size="small" name="done" id="done" color="primary" />}
                />

                <Button
                  type="submit"
                  variant="text"
                  size="small"
                  sx={{ mt: 3 }}
                >
                  Submit
                </Button>
              </Box>
          </Card>
        ) : (
          <Card
            style={{ width: 300 }}
            actions={[
              <button onClick={() => handleDelete(ele.id)}>
                <DeleteOutlined key="delete" />
              </button>,
              <button onClick={() => handleChange(ele.id)}>
                <EditOutlined key="edit" />
              </button>,
              <Text className="flex items-center text-sm text-[#00000071]">
                <CalendarOutlined className="ml-2 mr-1" /> {date}
              </Text>,
            ]}
          >
            {ele.done === true ? (
              <Tag className="mb-3" bordered={false} color="green">
                Done
              </Tag>
            ) : (
              <Tag className="mb-3" bordered={false} color="blue">
                Processing
              </Tag>
            )}
            <Meta title={ele.name} description={ele.description} />
            <Tag className="mt-3 flex w-16 items-center " bordered={false}>
              <ClockCircleOutlined className="mr-2" />
              {time}
            </Tag>
          </Card>
        );
      })}
    </div>
  );
}
