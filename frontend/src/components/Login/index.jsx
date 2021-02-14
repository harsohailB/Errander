import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { LOGIN } from "../../contexts/types";
import { UserContext } from "../../contexts/UserContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

// Temporary User
const tempUser = {
  id: "temp",
  name: "Harsohail Brar",
  age: 21,
  rating: 8.2,
  description: "Software Engineering Student",
};

const Login = () => {
  const classes = useStyles();

  const [user, dispatchToUser] = useContext(UserContext);
  const history = useHistory();

  // State Management
  const [formUser, setFormUser] = useState({
    username: "",
    password: "",
  });

  const hasErrors = () => {
    return formUser.username.length === 0 || formUser.password.length === 0;
  };

  const onFormChange = (event) => {
    setFormUser({
      ...formUser,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    if (!hasErrors()) {
      dispatchToUser({ type: LOGIN, payload: tempUser });
      history.push("/");
    }
  };

  return user ? (
    <Container component="main" maxWidth="sm" marginTop="20%">
      <Box m={5} pt={2}></Box>
      <center>
        <Typography variant="h3" color="textPrimary">
          You are already logged in!
        </Typography>
      </center>
    </Container>
  ) : (
    <Container component="main" maxWidth="sm" marginTop="20%">
      <Box m={5} pt={2}></Box>
      <center>
        <Typography variant="h3" color="textPrimary">
          Login
        </Typography>
      </center>
      <div className={classes.paper}>
        <form
          className={classes.form}
          noValidate
          paddingTop={10}
          onSubmit={submitForm}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                error={formUser.username.length === 0}
                onChange={onFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={formUser.password.length === 0}
                onChange={onFormChange}
              />
            </Grid>
          </Grid>
          <Box m={1} pt={2}></Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
