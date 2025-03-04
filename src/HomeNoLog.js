import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Footer from "./Footer.js";
import background from "./ps.png";
import Posts from "./Posts.js";
import Header from "./Header.js";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto"
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0
  },
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)"
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0
    }
  },
  mainGrid: {
    marginTop: theme.spacing(3),
    backgroundColor: "#000000"
  },
  card: {
    display: "flex"
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 160
  },
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0)
  },
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: "#303030",
    color: "#FFFFFF"
  },
  sidebarSection: {
    marginTop: theme.spacing(3)
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(20)
  }
}));

const darkTheme = createMuiTheme({
  palette: {
    background: {
      default: "#000000"
    },
    text: {
      primary: "#ffffff"
    }
  }
});

export default function HomeNoLog() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="Blog" />
          <main>
            {/* Main featured post */}
            <Paper className={classes.mainFeaturedPost}>
              {/* Increase the priority of the hero background image */}
              <div className={classes.overlay} />
              <Grid container>
                <Grid item md={1}>
                  <div className={classes.mainFeaturedPostContent}>
                    <Typography
                      component="h2"
                      variant="h2"
                      color="inherit"
                      gutterBottom
                      style={{ fontFamily: "Helvetica Neue" }}
                    >
                      Welcome Guest.
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Paper>
            {/* End main featured post */}

            <Grid container spacing={5} className={classes.mainGrid}>
              {/* Main content */}
              <Grid item xs={12} md={8} alignItems="stretch">
                <Typography
                  variant="h4"
                  gutterBottom
                  style={{ fontFamily: "Futura" }}
                >
                  Blog Articles
                </Typography>
                <Divider />
                <Posts />
                <Divider />
              </Grid>
              {/* End main content */}
              {/* Sidebar */}
              <Grid item xs={12} md={4} style={{ marginBottom: "0px" }}>
                <Paper elevation={0} className={classes.sidebarAboutBox}>
                  <Typography variant="h6" gutterBottom>
                    About
                  </Typography>
                  <Typography>
                    This is a blog where registered users can post articles and
                    visitors can comment.
                  </Typography>
                </Paper>
              </Grid>
              {/* End sidebar */}
            </Grid>
          </main>
        </Container>
        <Footer />
      </ThemeProvider>
    </React.Fragment>
  );
}
