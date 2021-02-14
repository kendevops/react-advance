import React, { useState, useEffect, useRef } from "react";
import Loader from "react-loader-spinner";
import {
  Grid,
  GridList,
  GridListTile,
  Button,
  Typography,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DashboardNav from "../Layout/DashboardNav";
import NotificationsIcon from "@material-ui/icons/Notifications";
import FilterListIcon from "@material-ui/icons/FilterList";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";

import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";

import { Link } from "react-router-dom";
import { signoutCookie } from "../Components/Auth/Storage";
import axios from "axios";

// import { DashBoardHeader } from "../Layout/InputButton";
import { CardComponent } from "../Layout/Card";
import ivy from "../images/image.png";

const useStyles = makeStyles((theme) => ({
  logout: {
    color: "#fff",
    textDecoration: "none",
  },
  input: {
    backgroundColor: "#fff",
    border: "none",
    borderRadius: "50px",
    padding: "20px",
    outline: "none",
    margin: "10px 0",
    width: "50%",
    position: "relative",
    boxShadow: "6px 7px 16px -1px rgba(0,0,0,0.53)",
    fontSize: "18px",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "15px",
      fontSize: "10px",

      // display: "flex",
      // justifyContent: "center",
      // alignItems: "center",
    },
    // [theme.breakpoints.down("sm")]: {
    //   width: "100%",
    //   fontSize: "0.6rem",
    // },
    // [theme.breakpoints.down("xs")]: {
    //   width: "100%",
    //   fontSize: "0.6rem",
    //   padding: "1rem",
    // },
  },

  searchContain: {
    width: "100%",
  },

  button: {
    backgroundColor: "#3e23ff",
    color: "#fff",
    width: "16%",
    padding: "22px",
    border: "none",
    borderRadius: "50px",
    margin: "10px",
    position: "relative",
    left: "-110px",
    top: "-2px",
    "&:hover": {
      backgroundColor: "#255DE2",
      color: "#fff",
    },
    [theme.breakpoints.down("sm")]: {
      width: "23%",
    },
  },

  findText: {
    fontSize: "2rem",
    color: "#fff",
    fontWeight: "bold",
    margin: 0,
    padding: 0,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
  header: {
    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${ivy})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "40vh",
    margin: "0px",
    [theme.breakpoints.down("sm")]: {
      height: "33vh",
      padding: "1rem",
    },
  },
  // bg: {
  //   background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${ivy})`,
  // },
  gridFlow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },

  topCourse: {
    marginTop: "3rem",
    [theme.breakpoints.down("sm")]: {
      marginTop: "0",
    },
  },
  headerContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    height: "19vh",
    margin: 0,
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      alignItems: "center",
    },
  },

  text: {
    fontSize: "2rem",
    fontWeight: "bold",
    fontFamily: [
      "Poppins",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    padding: "1rem",
    margin: "0.5rem",
  },
  courseButton: {
    background: "#343a48",
    color: "#fff",
    padding: "1rem",
    margin: "1.2rem",
    borderRadius: "0.5rem",
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc",
      boxShadow: "none",
    },
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 250,
    // color: "red",
    backgroundColor: "#fff",
    borderRadius: "10px",
    textAlign: "center",
    borderColor: "#0062cc",
  },
  formCategories: {
    color: "grey",
    textAlign: "center",
  },
}));

const Explore = () => {
  const classes = useStyles();

  const [localData, setLocalData] = useState([]);
  const [localToken, setLocalToken] = useState([]);
  // const [CoursesId, setCoursesId] = useState([])
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [changeCategory, setChangeCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  // const handleChangeCategory = (event) => {
  //   // setChangeCategory(event.target.value);
  // };

  // const options = allCategories.map((arr1) => arr1.category.map((arr2) => (
  //   <MenuItem value={arr2.name} key={arr2._id}>{arr2.name}</MenuItem>
  // )))

  // console.log("ALL CATIGOGIES", allCategories)
  // const categories = allCategories.map((categoryArray) => categoryArray.category)
  // const options = categories.map((category) => (category.map((innerCat) => (console.log(innerCat.name)))))
  const options = allCategories.map((category) => category.name);

  const handleClick = () => {
    setChangeCategory(`${options[selectedIndex]}`);
    // console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    // setChangeCategory(event.target.value);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    async function fetchLocalData() {
      if (window !== "undefined") {
        const uData = await localStorage.getItem("user");
        const userData = (await uData) ? JSON.parse(uData) : "";
        // console.log("FROM THE USE EFFECT BLOCK", userData.user._id)
        if (userData) {
          setLocalData(userData.user._id);
          setLocalToken(userData.accessToken);
        } else {
          // console.log("PROBLEM GETTING THE USER ID")
        }
      }
    }
    fetchLocalData();
  }, []);
  useEffect(() => {
    if (changeCategory) {
      // axios.get(`https://iqstore.herokuapp.com/v1/courses?category=${changeCategory}`,
      // console.log('SELECTER', changeCategory)

      axios
        .get(
          `https://iqstore.herokuapp.com/v1/courses?category=${changeCategory}`,
          {
            headers: {
              Authorization: `Bearer ${localToken}`,
            },
          }
        )
        .then((res) => {
          setLoading(!loading);
          // setCoursesId(res.data.data.courses._id)
          setAllCourses(res.data.data.courses);
        })
        .catch((error) => {
          // console.error("COURSES", error)
        });
    } else if (search) {
      axios
        .get(`https://iqstore.herokuapp.com/v1/courses?term=${search}`, {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        })
        .then((res) => {
          setLoading(!loading);
          // setCoursesId(res.data.data.courses._id)
          setAllCourses(res.data.data.courses);
        })
        .catch((error) => {
          // console.error("COURSES", error)
        });
    } else {
      axios
        .get(`https://iqstore.herokuapp.com/v1/courses`, {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        })
        .then((res) => {
          setLoading(false);
          // setCoursesId(res.data.data.courses._id)
          setAllCourses(res.data.data.courses);
        })
        .catch((error) => {
          // console.error("COURSES", error)
        });
    }
  }, [localToken, search, changeCategory]);

  useEffect(() => {
    axios
      .get(`https://iqstore.herokuapp.com/v1/courses`, {
        headers: {
          Authorization: `Bearer ${localToken}`,
        },
      })
      .then((res) => {
        // console.log("GOTTEN FORM THE CATEGORIES", res.data.data.courses.[0].category.[0].name)
        setAllCategories(res.data.data.categories);
      })
      .catch((error) => {
        // console.error("CATEGORIES", error)
      });
  }, [localToken]);
  // console.log("CATIGOLIST", allCategories)

  return (
    <Grid container xs={12} className={classes.header}>
      <DashboardNav />
      <Grid item xs={12} container>
        <Grid item xs={0} sm={1} />
        <Grid item container xs={11}>
          <Grid item container xs={12} className={classes.btnNotification}>
            <div
              style={{
                width: "12%",
              }}
            >
              <Avatar
                style={{
                  backgroundColor: "#3E24FB",
                }}
              >
                <NotificationsIcon />
              </Avatar>
            </div>
            <Button
              className={classes.button}
              style={{ width: "15%", padding: "10px" }}
            >
              <Link
                to="/login"
                className={classes.logout}
                onClick={() => {
                  signoutCookie(() => {});
                }}
              >
                Log out
              </Link>
            </Button>
          </Grid>
          <Grid item xs={12} className={classes.headerContent}>
            <Typography className={classes.findText}>
              Find Great Online Courses
            </Typography>
            <Grid item xs={12} md={9} className={classes.searchContain}>
              <input
                type="text"
                className={classes.input}
                placeholder="Find Any Course"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </Grid>
            <Grid item style={{ zIndex: 1 }}>
              <span style={{ marginRight: "0.9rem" }}>
                <ButtonGroup
                  variant="contained"
                  color="primary"
                  ref={anchorRef}
                  aria-label="split button"
                >
                  <Button onClick={handleClick}>
                    {options[selectedIndex]}
                  </Button>
                  <Button
                    color="primary"
                    size="small"
                    aria-controls={open ? "split-button-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                  >
                    <ArrowDropDownIcon />
                  </Button>
                </ButtonGroup>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList id="split-button-menu">
                            {options.map((option, index) => (
                              <MenuItem
                                key={option}
                                selected={index === selectedIndex}
                                onClick={(event) =>
                                  handleMenuItemClick(event, index)
                                }
                              >
                                {option}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </span>
              <Button
                variant="contained"
                startIcon={<ExpandMoreIcon />}
                style={{
                  // marginRight: "2rem",
                  padding: "1rem",
                  borderRadius: "2rem",
                  width: "10rem",
                }}
              >
                Filter
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={0} sm={1} />
        <Grid item container xs={11} className={classes.topCourse}>
          <Typography className={classes.text}>Top Courses</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={0} sm={1} />
        <Grid item container xs={11} className={classes.gridFlow}>
          <GridList
            cellHeight={500}
            cols={{ xs: 1, sm: 3.5 }}
            style={{
              flexWrap: "nowrap",
              transform: "translateZ(0)",
            }}
          >
            {allCourses.map((course) => {
              return (
                <GridListTile>
                  <CardComponent
                    img={course.coverImage.url}
                    price={course.price}
                    description={course.description}
                    coursesID={course._id}
                    localToken={localToken}
                    title={course.title}
                  />
                </GridListTile>
              );
            })}
          </GridList>
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={0} sm={1} />
        <Grid item container xs={11}>
          <Button
            variant="contained"
            size="medium"
            className={classes.courseButton}
          >
            Science Courses
          </Button>
          <Button
            variant="contained"
            size="medium"
            className={classes.courseButton}
          >
            Engineering and Development
          </Button>
          <Button
            variant="contained"
            size="medium"
            className={classes.courseButton}
          >
            Arts and Creatives
          </Button>
          <Button
            variant="contained"
            size="medium"
            className={classes.courseButton}
          >
            Programming
          </Button>
          <Button
            variant="contained"
            size="medium"
            className={classes.courseButton}
          >
            Business and Managment
          </Button>
          <Button
            variant="contained"
            size="medium"
            className={classes.courseButton}
          >
            Machine Learning
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Explore;
