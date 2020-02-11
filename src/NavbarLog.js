import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import fire from "./firebase.js";

// required for react-router-dom < 6.0.0
// see https://github.com/ReactTraining/react-router/issues/6056#issuecomment-435524678
const AdapterLink = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));

const routes = ["/HomeLog", "/About", "/Projects", "/Resume", "/Contact"];

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
    backgroundImage:
      "url(https://news.virginia.edu/sites/default/files/styles/uva_basic_article/public/article_image/rotunda_summer_ss_header_3-2.jpg?itok=PP8Nw9vX)",
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

const sections = ["Home", "About"];

export default function Navbar() {
  const classes = useStyles();
  return (
    <div>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h2"
          variant="h2"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
          style={{ fontFamily: "Futura" }}
        >
          Perfect Sense
        </Typography>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {sections.map((section, index) => (
          <Link
            color="inherit"
            noWrap
            key={section}
            variant="h7"
            href="#"
            className={classes.toolbarLink}
            component={AdapterLink}
            to={routes[index]}
            style={{ fontFamily: "Futura" }}
          >
            {section}
          </Link>
        ))}
        <Link
          color="inherit"
          noWrap
          key="Contact"
          variant="h7"
          href="#"
          className={classes.toolbarLink}
          component={AdapterLink}
          to="/"
          onClick={() => fire.auth().signOut()}
          style={{ fontFamily: "Futura" }}
        >
          Sign Out
        </Link>
      </Toolbar>
    </div>
  );
}
