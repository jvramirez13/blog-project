import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import background from "./ps.png";
import Divider from "@material-ui/core/Divider";
import Markdown from "react-markdown";
import TextField from "@material-ui/core/TextField";
import * as fire from "firebase";

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

function useBlogs() {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    // todo: we need an unsubscribe callback()

    //sortBy is added to the parenthesis at the end
    //of the useEffect so that everytime sortBy changes
    //we resubscribe and get a sorted list of times
    const unsubscribe = fire
      .firestore()
      .collection("blogs")
      .onSnapshot(snapshot => {
        const newBlogs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setBlog(newBlogs);
      });

    return () => unsubscribe();
  }, []);

  return blog;
}

const HomeNoLog = () => {
  const classes = useStyles();

  const blog = useBlogs();

  const [currentUser, setCurrentUser] = useState("Guest");
  const [currentArticle, setCurrentArticle] = useState("");
  const [currentComment, setCurrentComment] = useState("");

  //prevents refresh of browser everytime button is submitted
  function onSubmit(e) {
    e.preventDefault();

    fire
      .firestore()
      .collection("blogs")
      .doc(currentArticle)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data().comments);
          let additionArray = doc.data().comments;
          if (currentUser === "Guest") {
            let randomNum = Math.floor(Math.random() * Math.floor(10000));
            let guestAccount = currentUser + randomNum.toString();
            console.log(guestAccount);
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

    /*
    fire
      .firestore()
      .collection("blogs")
      .doc(currentArticle)
      .update({
        comments: fire.firestore.FieldValue.arrayUnion({ newAddition })
      })
      .then(() => {
        setCurrentArticle("");
        setCurrentComment("");
      });
      */
  }

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
          <Divider />
          <Markdown className={classes.markdown}>{article.post}</Markdown>
          <Typography variant="h6" gutterBottom>
            Comments
          </Typography>
          {Object.values(article.comments).map((comment, index) => (
            <div>
              <Markdown>{comment}</Markdown>
              <span>- written by {Object.keys(article.comments)[index]}</span>
            </div>
          ))}
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
          >
            <TextField
              value={currentComment}
              vid="standard-basic"
              id={article.id}
              label="Leave a comment"
              onChange={e => twoCalls(e)}
            />
            {console.log(currentComment)}
            {console.log(currentArticle)}
          </form>
        </div>
      ))}
    </Grid>
  );
};

export default HomeNoLog;
