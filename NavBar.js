import {
  AppBar,
  Grid,
  MenuItem,
  MenuList,
  IconButton,
} from "@material-ui/core";
import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../images/logo.png";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  nav: {
    color: "#fff",
    boxShadow: "none",
    outline: "none",
  },
  navContainer: {},
  navMobile: {
    position: "relative",
  },
  logo: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flex: "1",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  menuButtonMobile: {
    // // display: "block",
    display: "flex",
    gridTemplateColumns: "auto",
    flexDirection: "column",
    flex: "1",
    backgroundColor: "#2196F3",
    padding: "10px",
    textAlign: "center",
    width: "100%",
    position: "absolute",
    top: "100px",
    // display: "flex",
    // flexDirection: "column",
    // width: "100%",
    // height: "90vh",
    // position: "absolute",
    // top: "10px",
    // // justifyContent: "center",
    // alignItems: "center",
    // // left: "-100px",
    // opacity: "1",
    // transition: "all 0.5s ease",
  },

  menuButtonMobile2: {
    display: "grid",
    // flexDirection: "column",
    // // width: "100%",
    // height: "90vh",
    // position: "absolute",
    // // top: "10px",
    // // left: "-100px",
    // opacity: "1",
    // transition: "all 0.5s ease",
  },
  menuList: {
    display: "flex",
    flex: "1",
    outline: "none",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  menuList2: {
    display: "flex",
    outline: "none",
    [theme.breakpoints.down("sm")]: {
      // display: "block",
      visibility: "hidden",
    },
  },
  button: {
    backgroundColor: "#3e23ff",
    color: "#fff",
    padding: "15px",
    borderRadius: "50px",
    margin: "10px",
    "&:hover": {
      backgroundColor: "#3e10ff",
      color: "#fff",
    },
    [theme.breakpoints.down("sm")]: {
      // display: "block",
      width: "100%",
      height: "auto",
    },
  },
}));

const NavBar = (props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const closeMobileMenu = () => setIsOpen(false);

  return (
    <AppBar position="absolute" color="transparent" className={classes.nav}>
      <Grid container xs={12}>
        <Grid item xs={0} sm={1} />
        <Grid item container xs={12} sm={10}>
          <Grid item xs={1} className={classes.logo}>
            <NavLink to="/">
              <img src={logo} alt="IQ logo" style={{ width: "100px" }} />
            </NavLink>
          </Grid>
          <Grid
            item
            container
            className={isOpen ? classes.menuButtonMobile : classes.menuList}
          >
            <Grid item xs={10} className={classes.menuList}>
              <MenuItem component={Link} to="/" onClick={closeMobileMenu}>
                Courses
              </MenuItem>
              <MenuItem component={Link} to="/signup" onClick={closeMobileMenu}>
                About Us
              </MenuItem>
              <MenuItem component={Link} to="/login" onClick={closeMobileMenu}>
                Articles
              </MenuItem>
              <MenuItem component={Link} to="/login" onClick={closeMobileMenu}>
                Contact
              </MenuItem>
            </Grid>
            <Grid item xs={2} className={classes.menuList2}>
              <MenuItem component={Link} to="/login" onClick={closeMobileMenu}>
                Log in
              </MenuItem>
              <MenuItem
                component={Link}
                to="/signup"
                className={classes.button}
                onClick={closeMobileMenu}
              >
                Get Started
              </MenuItem>
            </Grid>
          </Grid>

          {/* <MenuList
              className={isOpen ? classes.menuButtonMobile2 : classes.menuList2}
            ></MenuList> */}
          <IconButton
            edge="end"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
          >
            {isOpen ? (
              <CloseIcon style={{ fontSize: "50px" }} />
            ) : (
              <MenuIcon style={{ fontSize: "50px" }} />
            )}
          </IconButton>
        </Grid>
        <Grid item xs={0} sm={1} />
      </Grid>
    </AppBar>
  );
};

export default NavBar;
