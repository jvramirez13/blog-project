import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Markdown from "react-markdown";
import AboutMD from "./about.md";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

export default function About() {
  const [terms, setTerms] = useState("");

  const count = terms
    .split(/\s+/)
    .map(s => s.replace(/\W/g, ""))
    .filter(s => s.length).length;

  useEffect(() => {
    fetch(AboutMD)
      .then(response => response.text())
      .then(text => {
        setTerms(text);
      });
  });
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Navbar />
        <Divider />
        <h1 style={{ fontFamily: "Futura", textAlign: "left" }}>About Me</h1>
        <h3
          style={{
            fontFamily: "Futura",
            textAlign: "left",
            fontWeight: "light"
          }}
        >
          (in about {count} words)
        </h3>
        <Divider />
        <Grid container spacing={3}>
          <main
            style={{
              textAlign: "left",
              fontSize: "15px",
              fontFamily: "Helvetica Neue",
              marginLeft: "10px",
              padding: "0px",
              lineHeight: "25px"
            }}
          >
            <Markdown
              source={terms}
              escapeHtml={false}
              skipHtml={false}
              sourcePos={false}
              rawSourcePos={false}
            />
            {/* Main featured post */}
          </main>
        </Grid>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
