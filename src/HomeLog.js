import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Footer from "./Footer.js";
import background from "./ps.png";
import fire from "./firebase.js";
import HeaderLog from "./HeaderLog.js";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Divider from "@material-ui/core/Divider";
import PostsLog from "./PostsLog.js";

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
    backgroundColor: "#000000",
    marginBotton: "2px"
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
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0)
  }
}));

const sections = [
  { title: "Home", url: "#" },
  { title: "Log In", url: "/loginex" },
  { title: "Sign Up", url: "#" }
];

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

function useBlogs() {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    // todo: we need an unsubscribe callback()

    //sortBy is added to the parenthesis at the end
    //of the useEffect so that everytime sortBy changes
    //we resubscribe and get a sorted list of times
    const unsubscribe = fire
      .firestore()
      .collection("users")
      .doc(fire.auth().currentUser.uid.toString())
      .onSnapshot(snapshot => {
        setBlog(snapshot.data());
      });

    return () => unsubscribe();
  }, []);

  return blog;
}

const HomeNoLog = () => {
  const classes = useStyles();

  const [currentSubmission, setSubmission] = useState("");
  const [articleTitle, setArticleTitle] = useState("");

  const info = useBlogs();

  function onSubmit(e) {
    e.preventDefault();

    fire
      .firestore()
      .collection("blogs")
      .doc(articleTitle)
      .set({
        title: articleTitle,
        post: currentSubmission,
        author: info.full_name,
        comments: {}
      })
      .then(function() {
        console.log("Document successfully written!");
        setArticleTitle("");
        setSubmission("");
        document.getElementById(articleTitle).value = "";

        document.getElementById(currentSubmission).value = "";
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <HeaderLog title="Blog" sections={sections} />
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
                      Welcome {info.full_name}.
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
                <PostsLog />
                <Divider />
                <Paper elevation={0} className={classes.sidebarAboutBox}>
                  <Typography variant="h6" gutterBottom marginBottom="2px">
                    Write your own Article!
                    <form noValidate autoComplete="off" onSubmit={onSubmit}>
                      <div>
                        <Typography>Title: </Typography>
                        <input
                          type="text"
                          value={articleTitle}
                          onChange={e => setArticleTitle(e.currentTarget.value)}
                          size="42"
                        />
                      </div>
                      <textarea
                        id="w3mission"
                        rows="20"
                        cols="140"
                        value={currentSubmission}
                        onChange={e => setSubmission(e.currentTarget.value)}
                      >
                        At w3schools.com you will learn how to make a website.
                        We offer free tutorials in all web development
                        technologies.
                      </textarea>
                      <button>Submit Article</button>
                    </form>
                  </Typography>
                </Paper>
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
};

export default HomeNoLog;
