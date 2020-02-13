import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import background from "./ps.png";
import Markdown from "react-markdown";
import TextField from "@material-ui/core/TextField";
import * as fire from "firebase";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  },
  paper: {
    backgroundColor: "#303030",
    color: "#FFFFFF",
    marginTop: "15px",
    marginLeft: "15px",
    marginBottom: "15px",
    marginRight: "15px",
    fontSize: "14px",
    font: "Helvetica"
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
    ...theme.typography.body2
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
  },
  input: {
    color: "white"
  },
  textField: {
    width: "50%",
    height: "50&",
    marginLeft: "15px",
    marginRight: "15px",
    marginTop: "15px",
    backgroundColor: "#9e9e9e",
    marginBottom: "20px",
    fontWeight: 500,
    textColor: "#000000"
  },
  floatingLabelFocusStyle: {
    color: "white"
  },
  span: {
    fontSize: "12px",
    fontWeight: "bold"
  },
  typography_text: {
    marginLeft: "auto"
  }
}));

function useBlogs() {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    // todo: we need an unsubscribe callback()

    //sortBy is added to the parenthesis at the end
    //of the useEffect so that everytime sortBy changes
    //we resubscribe and get a sorted list of times
    const unsubscribe1 = fire
      .firestore()
      .collection("blogs")
      .onSnapshot(snapshot => {
        const newBlogs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setBlog(newBlogs);
      });

    return () => unsubscribe1();
  }, []);

  return blog;
}

const PostsLog = () => {
  const classes = useStyles();

  const blog = useBlogs();

  const [currentUser, setCurrentUser] = useState("Guest");
  const [currentArticle, setCurrentArticle] = useState("");
  const [currentComment, setCurrentComment] = useState("");

  useEffect(() => {
    // todo: we need an unsubscribe callback()

    //sortBy is added to the parenthesis at the end
    //of the useEffect so that everytime sortBy changes
    //we resubscribe and get a sorted list of times
    fire
      .firestore()
      .collection("users")
      .doc(fire.auth().currentUser.uid.toString())
      .onSnapshot(snapshot => {
        setCurrentUser(snapshot.data().full_name);
      });
  }, []);

  //prevents refresh of browser everytime button is submitted
  function onSubmit(e) {
    e.preventDefault();

    document.getElementById(currentArticle).value = "";

    fire
      .firestore()
      .collection("blogs")
      .doc(currentArticle)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          let additionArray = doc.data().comments;
          if (currentUser === "Guest") {
            let randomNum = Math.floor(Math.random() * Math.floor(10000));
            let guestAccount = currentUser + randomNum.toString();
            additionArray[guestAccount] = currentComment;
            fire
              .firestore()
              .collection("blogs")
              .doc(currentArticle)
              .update({
                comments: additionArray
              })
              .then(() => {
                setCurrentArticle("");
                setCurrentComment("");
              });
          } else {
            additionArray[currentUser] = currentComment;
            fire
              .firestore()
              .collection("blogs")
              .doc(currentArticle)
              .update({
                comments: additionArray
              })
              .then(() => {
                setCurrentArticle("");
                setCurrentComment("");
              });
          }
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  }

  //Updates both the currentArticle your trying to comment on and the Comment data you're trying to submit
  function twoCalls(e) {
    setCurrentArticle(e.currentTarget.id);
    setCurrentComment(e.currentTarget.value);
  }

  return (
    <Grid item xs={12} md={12}>
      {blog.map(article => (
        <div>
          <Typography variant="h5" gutterBottom>
            {article.title}
          </Typography>

          <Markdown className={classes.markdown}>{article.post}</Markdown>

          <Typography variant="h7" gutterBottom>
            <Box fontWeight="fontWeightBold" fontSize={18}>
              Comments
            </Box>
          </Typography>
          <Paper elevation={0} className={classes.paper} variant="outlined">
            {Object.values(article.comments).map((comment, index) => (
              <div>
                <Typography variant="h6" className={classes.paper}>
                  <Typography>{comment}</Typography>
                  <span className={classes.span}>
                    {" "}
                    - Written by {Object.keys(article.comments)[index]}
                  </span>
                </Typography>
              </div>
            ))}

            <form
              className={classes.root}
              noValidate
              autoComplete="off"
              onSubmit={onSubmit}
            >
              <TextField
                label="Leave a comment"
                onChange={e => twoCalls(e)}
                id={article.id}
                className={classes.textField}
                variant="outlined"
              />
            </form>
          </Paper>
        </div>
      ))}
    </Grid>
  );
};

export default PostsLog;
