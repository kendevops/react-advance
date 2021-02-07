import React, { useState, useEffect } from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import EventNoteIcon from "@material-ui/icons/EventNote";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: "20px",
  },
  note: {
    color: "red",
    fontWeight: "bold",
  },
  backgroundColor: {
    marginTop: "30px",
    backgroundColor: "white",
    borderRadius: "20px",
  },
  backgroundMargin: {
    margin: " 20px 50px",
  },
  subColor: {
    color: "blue",
    fontWeight: "bold",
  },
  sub: {
    marginRight: "20px",
  },
  subMargin: {
    marginTop: "20px",
  },
  Button1: {
    borderRadius: "20px",
    padding: "1px 20px",
  },
  Button2: {
    borderRadius: "20px",
    padding: "10px 20px",
    marginTop: "10px",
  },
  backgroundColor2: {
    marginTop: "30px",
    backgroundColor: "#d9dbdb",
    borderRadius: "20px",
  },
  background: {
    marginTop: "10px",
    textAlign: "center",
    fontSize: "400%",
    fontWeight: "bold",
  },
  background2: {
    textAlign: "center",
    color: "green",
    fontWeight: "bold",
    fontSize: "150%",
  },
  backgroundButton: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    borderRadius: "20px",
    marginBottom: "10px",
  },
  buttonMargin: {
    marginTop: "10%",
  },
  // subMag: {
  //     paddingRight: "12px"
  // }
}));

const Data = [
  {
    id: "gdhdksksisisk",
    courseTitle: "How to navigate",
    content:
      "lorem ipsum dolor sit ametconsectetur adipiscing elit.Donec a aliquam elit.Ut eget justo sed diam bibendum accumsan in quis odio Praesent sed congue ipsum.Cras vehicula miut justo aliquam tempus.Sed hendrerit fermentum est.Cras tincidunt risus varius neque egestasvolutpat",
    section: 90,
    question: 85,
    time: 120,
    button: "",
    score: 80,
    grade: "Great",
  },
  {
    id: "gdhdksksisisk",
    courseTitle: "How to create a CSS button",
    content:
      "lorem ipsum dolor sit ametconsectetur adipiscing elit.Donec a aliquam elit.Ut eget justo sed diam bibendum accumsan in quis odio Praesent sed congue ipsum.Cras vehicula miut justo aliquam tempus.Sed hendrerit fermentum est.Cras tincidunt risus varius neque egestasvolutpat",
    section: 12,
    question: 105,
    time: 60,
    button: "",
    score: 80,
    grade: "poor",
  },
  {
    id: "gdhdksksisisk",
    courseTitle: "How to create a toggle button",
    content:
      "lorem ipsum dolor sit ametconsectetur adipiscing elit.Donec a aliquam elit.Ut eget justo sed diam bibendum accumsan in quis odio Praesent sed congue ipsum.Cras vehicula miut justo aliquam tempus.Sed hendrerit fermentum est.Cras tincidunt risus varius neque egestasvolutpat",
    section: 102,
    question: 15,
    time: 60,
    button: "",
    score: 20,
    grade: "Great",
  },
];

// const getLocalStorage = () => {
//   if (window !== "undefined") {
//     const uData = localStorage.getItem("user");
//     const userData = uData !== null ? JSON.parse(uData) : [];
//     console.log("FROM LOCAL STR 1 OUT SIDE", userData.user);
//   }
// };
// getLocalStorage();

const useLocalStorage = (defaultValue, key) => {
  const [value, setValue] = useState(() => {
    if (window !== "undefined") {
      const uData = localStorage.getItem(key);
      return uData !== null ? JSON.parse(uData) : defaultValue;
    }
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

const AssessmentState = () => {
  const [localData, setLocalData] = useLocalStorage([], "user");

  useEffect(() => {
    setLocalData("uData");
  }, [setLocalData]);

  console.log("FROM LOCAL STR 1 OUT SIDE", localData.user.email);

  // useEffect(() => {
  //     // if (window !== "undefined") {
  //     //  const uData = localStorage.getItem('user');
  //     //     const userData = uData ? JSON.parse(uData) : '';
  //     //     console.log("FROM THE USE EFFECT BLOCK", userData)
  //     //     setLocalData(userData);

  //     // }
  //     const uData = localStorage.getItem('user') === true;
  //     const userData = uData ? JSON.parse(uData) : '';
  //     const userData2 = JSON.parse(localStorage.getItem("data"))
  //     console.log("FROM THE USE EFFECT BLOCK", userData2)

  //     const fetchUserData = async () => {
  //   setLocalData(await userData2);
  //     }

  //     fetchUserData()

  // console.log("LOCAL ACCESS 1", localData.user._id)

  // }, [])

  // console.log("LOCAL ACCESS", localData.user)
  // console.log("LOCAL USER ID", localData.user._id)

  // const access = localData.accessToken
  // const userId = localData.user._id
  const [assesmentState, setAssesmentState] = useState([]);

  // console.log("FROM LOCAL STR 1", localData.accessToken)

  const access =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY2hpYSBnYWJyaWVsIiwiZW1haWwiOiJnYWJyaWVsc29uY2hpYUBnbWFpbC5jb20iLCJ0b2tlbiI6bnVsbCwiaWF0IjoxNjA5OTIwNjUwLCJleHAiOjE2MDk5MjE1NTAsImF1ZCI6InN0dWRlbnQiLCJpc3MiOiJJUVNUT1JFIiwic3ViIjoiNWZlZjdiZDI5MTQ2MTM3NzE0YmVmMzMwIn0.3yNvY2MUlzm5MsXekUR-D4WxePh1jCgPFxNUZ6ArVoU";
  const userId = "5fef7bd29146137714bef330";
  // const [assesmentState, setAssesmentState] = useState([])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/v1/assessments/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      .then((res) => {
        console.log("ASSESSMENT DATA", res.data.data.assessments);
        setAssesmentState(res.data.data.assessments);
      })
      .catch((error) => {
        console.error("ASSESSMENT DATA", error);
      });
  }, []);

  const classes = useStyles();
  return (
    <>
      {assesmentState.map((e) => (
        <Grid container sm={12} className={classes.backgroundColor}>
          {/* { console.log("JSON.stringify"(localData.accessToken))}
                {console.log("SOMETHING I CAME", e.instructions)} */}
          <Grid item container sm={12} className={classes.backgroundMargin}>
            <Grid item sm={8}>
              <Button variant="contained" className={classes.Button1}>
                {e.completed ? "completed" : "Not taken"}
              </Button>
              <Typography className={classes.subMargin}>
                <span className={classes.subColor}>Course:</span>
                <span> {e.title}</span>
              </Typography>
              <Typography className={classes.subMargin}>
                {e.instructions}
              </Typography>
              <Typography className={classes.subMargin}>
                <span className={classes.sub}>
                  <span className={classes.subColor}>No of Questions:</span>
                  <span className={classes.subMag}>{e.noOfQuestions}</span>
                </span>
                <span className={classes.sub}>
                  <span className={classes.subColor}>No of Attempts Made:</span>
                  <span className={classes.subMag}>
                    {e.attempts.noOfAttempts}
                  </span>
                </span>
                <span className={classes.sub}>
                  <span className={classes.subColor}>
                    No of Attempts Allowed:
                  </span>
                  <span className={classes.subMag}>{e.noOfAllowedAttemps}</span>
                </span>
              </Typography>
              <Button variant="contained" className={classes.Button2}>
                Get certified
              </Button>
            </Grid>
            <Grid item sm={2} />
            <Grid item sm={2}>
              <Grid item container sm={12}>
                <Grid item sm={12} className={classes.backgroundColor2}>
                  <Grid item sm={12}>
                    <Typography className={classes.background}>
                      {e.cumulative.percentagePass}%
                    </Typography>
                    <Typography className={classes.background2}>
                      {e.cumulative.comment}
                    </Typography>
                  </Grid>
                  <Grid item container sm={12}>
                    <Grid item lg={1} />
                    <Grid item sm={10} className={classes.buttonMargin}>
                      <Button
                        variant="contained"
                        className={classes.backgroundButton}
                      >
                        <Typography variant="body2" color="primary">
                          Retake Test
                        </Typography>
                      </Button>
                    </Grid>
                    <Grid item lg={1} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default AssessmentState;
