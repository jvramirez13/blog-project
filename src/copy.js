import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import background from "./ps.png";
import Divider from "@material-ui/core/Divider";
import Markdown from "react-markdown";
import TextField from "@material-ui/core/TextField";
import Sidebar from './Sidebar';

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
    marginTop: theme.spacing(3)
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
    backgroundColor: theme.palette.grey[200]
  },
  sidebarSection: {
    marginTop: theme.spacing(3)
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0)
  }
}));

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ]
};

const featuredPosts = [
  {
    title: "Pomodoro Project",
    description:
      "This application start a 25-minute timer and allowslog the tasks that complete during that time interval."
  },
  {
    title: "Star Wars Characters Project",
    description:
      "This application allows users to get and display a random Star Wars character from an API with the click of a button."
  },
  {
    title: "Personal Website",
    description:
      "This is a personal website created using the React JS framework along with Google's Material UI framework."
  },
  {
    title: "Charlottesville Restaurant Project",
    description:
      "This application displays the open restaurants in Charlottesville using Google Places API."
  }
];

const links = [
  "https://github.com/jvramirez13/pomodoro-project",
  "https://github.com/jvramirez13/star-wars-project",
  "https://github.com/jvramirez13/personal-website",
  "https://github.com/jvramirez13/charlottesville-restaurant-project"
];

export default function HomeNoLog() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Navbar />
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

          <Grid container spacing={5} xs={12} className={classes.mainGrid}>
            {/* Main content */}
            <Grid item xs={12} md={8} alignItems="stretch">
              <Typography
                variant="h4"
                gutterBottom
                style={{ fontFamily: "Futura" }}
              >
                Blog Articles
              </Typography>
              <Grid item xs={12} md={8}>
                <Typography variant="h5" gutterBottom>
                  Hello
                </Typography>
                <Divider />
                <Markdown className={classes.markdown}>
                  This blog post shows a few different types of content that are
                  supported and styled with Material styles. Basic typography,
                  images, and code are all supported. You can extend these by
                  modifying Markdown.js. Cum sociis natoque penatibus et magnis
                  dis parturient montes, nascetur ridiculus mus. Aenean eu leo
                  quam. Pellentesque ornare sem lacinia quam venenatis
                  vestibulum. Sed posuere consectetur est at lobortis. Cras
                  mattis consectetur purus sit amet fermentum. Curabitur blandit
                  tempus porttitor. Nullam quis risus eget urna mollis ornare
                  vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id
                  elit. Etiam porta sem malesuada magna mollis euismod. Cras
                  mattis consectetur purus sit amet fermentum. Aenean lacinia
                  bibendum nulla sed consectetur.
                </Markdown>
                <Typography variant="h6" gutterBottom>
                  Comments
                </Typography>
                <form className={classes.root} noValidate autoComplete="off">
                  <TextField id="standard-basic" label="Leave a comment" />
                </form>
                <Typography variant="h5" gutterBottom>
                  Hello
                </Typography>
                <Divider />
                <Markdown className={classes.markdown}>
                  This blog post shows a few different types of content that are
                  supported and styled with Material styles. Basic typography,
                  images, and code are all supported. You can extend these by
                  modifying Markdown.js. Cum sociis natoque penatibus et magnis
                  dis parturient montes, nascetur ridiculus mus. Aenean eu leo
                  quam. Pellentesque ornare sem lacinia quam venenatis
                  vestibulum. Sed posuere consectetur est at lobortis. Cras
                  mattis consectetur purus sit amet fermentum. Curabitur blandit
                  tempus porttitor. Nullam quis risus eget urna mollis ornare
                  vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id
                  elit. Etiam porta sem malesuada magna mollis euismod. Cras
                  mattis consectetur purus sit amet fermentum. Aenean lacinia
                  bibendum nulla sed consectetur.
                </Markdown>
                <Typography variant="h6" gutterBottom>
                  Comments
                </Typography>
                <form className={classes.root} noValidate autoComplete="off">
                  <TextField id="standard-basic" label="Leave a comment" />
                </form>
                <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
            />
              </Grid>
            </Grid>
            {/* End main content */}
          </Grid>
        </main>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
