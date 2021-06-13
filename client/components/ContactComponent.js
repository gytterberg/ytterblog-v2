import React, { Component } from 'react';
// import { Container, } from 'reactstrap';

class About extends Component {
  render() {
    return (
      <Container>
        <h2>Contact me</h2>
        <hr />

        <p>
          The best way to reach me by my email in the footer below. Resume and
          references available upon request.
        </p>
        <br />
        <p>
          You can also view my{' '}
          <a
            href="https://www.linkedin.com/in/gabriel-ytterberg-8ab87a14/"
            rel="noreferrer"
            target="_blank"
          >
            LinkedIn profile here.
          </a>
        </p>
        <br />
        <p>
          See what I've been working on{' '}
          <a
            href="https://github.com/gytterberg"
            rel="noreferrer"
            target="_blank"
          >
            at GitHub.
          </a>
        </p>
        <br />
        <p>
          I document a lot of my other projects on{' '}
          <a
            href="https://www.instagram.com/gytterberg/"
            rel="noreferrer"
            target="_blank"
          >
            Instagram.
          </a>
        </p>
      </Container>
    );
  }
}

export default About;
