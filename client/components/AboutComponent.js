import React, { Component } from 'react';
// import {
//     Container, Card, CardHeader, CardImg, CardBody, Col, Row, Collapse,
//     } from 'reactstrap';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reactOpen: false,
      backendOpen: false,
      dbOpen: false,
      reduxOpen: false,
      buildOpen: false,
      herokuOpen: false,
    };
    this.toggleCard = this.toggleCard.bind(this);
  }

  toggleCard(card) {
    switch (card) {
      case 'reactOpen':
        this.setState({ reactOpen: !this.state.reactOpen });
        break;
      case 'backendOpen':
        this.setState({ backendOpen: !this.state.backendOpen });
        break;
      case 'dbOpen':
        this.setState({ dbOpen: !this.state.dbOpen });
        break;
      case 'reduxOpen':
        this.setState({ reduxOpen: !this.state.reduxOpen });
        break;
      case 'buildOpen':
        this.setState({ buildOpen: !this.state.buildOpen });
        break;
      case 'herokuOpen':
        this.setState({ herokuOpen: !this.state.herokuOpen });
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <Container>
        <h2>About this site</h2>
        <hr />
        <Row>
          <Col className="col-md-6">
            <p>
              This is a breakdown of the stack, explaining the structure of the
              app and what each component does and why it was chosen.
            </p>
            <br />
            <br />
            The code is available to view{' '}
            <a
              href="https://github.com/gytterberg/ytterblog"
              rel="noreferrer"
              target="_blank"
            >
              on my GitHub repository.
            </a>
          </Col>
          <Card className="col-md-4 card">
            <CardHeader className="">The stack</CardHeader>
            <CardBody>
              <dl>
                <dt>React</dt>
                <dd>Provides the front end UI.</dd>
                <dt>Redux</dt>
                <dd>
                  Provides a persistent data store available to various
                  components. Redux Logger tracks state changes and provides
                  import debugging information.
                </dd>
                <dt>Axios</dt>
                <dd>Communicates with the back end via REST API.</dd>
                <dt>Django</dt>
                <dd>
                  Provides the back end REST API and manages the SQL database,
                  while serving the front end and static files.
                </dd>
              </dl>
            </CardBody>
          </Card>
        </Row>
        <Card>
          <CardHeader onClick={() => this.toggleCard('reactOpen')}>
            {this.state.reactOpen ? (
              <i className="fa fa-chevron-up" />
            ) : (
              <i className="fa fa-chevron-down" />
            )}{' '}
            React components and routing
          </CardHeader>
          <Collapse isOpen={this.state.reactOpen}>
            <CardImg
              className="container-fluid"
              src="/static/Main_w_routing.png"
              style={{ width: '686px' }}
            />
            <CardBody>
              <p>
                The front end of the app is written in ES6 JavaScript using the{' '}
                <strong>React</strong> framework. React is a powerful but simple
                framework for creating user interfaces in a responsive, cross
                platform way. It allows individual components to be encapsulated
                with their own state, and combined to create a complex UI. Pages
                are rendered using <strong>JSX</strong>, an extension to
                JavaScript that allows mixing html and JS expressions. This
                simplifies complex pages by combining the template and logic
                into a single module.
              </p>
              <br />
              <br />
              <p>
                Front end routing is done in Main.js shown here. Each page is
                its own component, along with the header, footer and jumbotron
                image. The jumbotron is separate from the header so that the
                navbar remains sticky at the top, while the jumbotron can be
                scrolled past. <br />
                <br />
                The "/blog/:postId' and "/blog/edit/:postId" routes pass the ID
                number of the post in question to the Blog component, so an
                individual post can be viewed on its own and edited.
                <br />
                <br />
                There is another component, PostModal, which handles the modal
                on the blog page. PostID is passed in through the Blog
                component, along with a prop indicating if the modal should
                render as a create post view or an edit post view.
              </p>
            </CardBody>
          </Collapse>
        </Card>
        <Card>
          <CardHeader onClick={() => this.toggleCard('backendOpen')}>
            {this.state.backendOpen ? (
              <i className="fa fa-chevron-up" />
            ) : (
              <i className="fa fa-chevron-down" />
            )}{' '}
            Back end components and routing
          </CardHeader>
          <Collapse isOpen={this.state.backendOpen}>
            <CardImg
              className="container-fluid"
              src="/static/urlpatterns.png"
              style={{ width: '585px' }}
            />
            <CardBody>
              <p>
                The <strong>Django</strong> back end is set up to serve the
                front end, as well as manage the database and serve static
                files.
                <br />
                <br />
                This is the Django router configuration module, urls.py. The
                first line catches requests for ytterblog.herokuapp.com/ and
                serves up the front end React bundle.
                <br />
                <br />
                The second line is for the Django admin tool, not used in
                production. The third line catches requests to the REST API,
                used here to serve data from the database storing the blog
                posts.
                <br />
                <br />
                The fourth line uses regex matching to route all other requests
                to the front end.
                <br />
                <br />
                The last line serves up static files, located in the
                /staticfiles directory. Files are collected from various
                locations in the project directory in a post-build script.
              </p>
            </CardBody>
          </Collapse>
        </Card>
        <Card>
          <CardHeader onClick={() => this.toggleCard('dbOpen')}>
            {this.state.dbOpen ? (
              <i className="fa fa-chevron-up" />
            ) : (
              <i className="fa fa-chevron-down" />
            )}{' '}
            Database setup and model
          </CardHeader>
          <Collapse isOpen={this.state.dbOpen}>
            <CardImg
              className="container-fluid"
              src="/static/models.png"
              style={{ width: '456px' }}
            />
            <CardBody>
              <p>
                The blog posts are stored in a <strong>PostgreSQL</strong>{' '}
                database, managed by Django. This is where the db model is
                configured, in models.py. The "id" field is the primary key and
                automatically handled by the database. The "protected" field
                allows me to prevent certain posts from being deleted or edited,
                while leaving the blog app open to any user to create update and
                delete unprotected posts.
                <br />
                <br />
                Database entries are serialized into JSON and served by Django
                through the REST API.
              </p>
            </CardBody>
          </Collapse>
        </Card>
        <Card>
          <CardHeader onClick={() => this.toggleCard('reduxOpen')}>
            {this.state.reduxOpen ? (
              <i className="fa fa-chevron-up" />
            ) : (
              <i className="fa fa-chevron-down" />
            )}{' '}
            Redux store
          </CardHeader>
          <Collapse isOpen={this.state.reduxOpen}>
            <CardImg
              className="container-fluid"
              src="/static/reduxsubmit.png"
              style={{ width: '860px' }}
            />
            <CardBody>
              <p>
                The <strong>Redux</strong> package allows the front end to store
                state in a centralized and easily debuggable way. It provides a
                single data store shared across components, while the{' '}
                <strong>redux-logger</strong> package adds helpful information
                about the current and previous state of the store.
                <br />
                <br />
                This is the ActionCreators.js file, where Redux actions are
                defined and dispatched. Redux uses a system of "actions" which
                are methods that access and store state information app-wide.
                Exported actions are available to properly configured components
                in their props. All state changes are handled through Redux
                actions.
                <br />
                <br />
                <strong>Axios</strong> is a package used to simplify making HTTP
                requests to the backend API.
              </p>
            </CardBody>
          </Collapse>
        </Card>
        <Card>
          <CardHeader onClick={() => this.toggleCard('herokuOpen')}>
            {this.state.herokuOpen ? (
              <i className="fa fa-chevron-up" />
            ) : (
              <i className="fa fa-chevron-down" />
            )}{' '}
            Build and deploy to Heroku
          </CardHeader>
          <Collapse isOpen={this.state.herokuOpen}>
            <CardImg
              className="container-fluid"
              src="/static/packagejson.png"
              style={{ width: '673px' }}
            />
            <CardBody>
              <p>
                <strong>Heroku</strong> provides powerful and simple app
                hosting. The build process begins with <strong>git</strong>.
                Changes are committed to the git repository, then pushed to the
                Heroku remote. This triggers Heroku's build process, which
                begins with building the JavaScript portion of the app.
                <br />
                <br />
                React's <strong>package.json</strong> file contains the build
                scripts. The "start" script is for local development. The
                "build" script is run by Heroku, which builds an optimized
                production version of the app and bundles it into a series of
                files in the /build directory. The "postbuild" script is then
                run, which causes Django to run its static file collection
                script, copying the built app into the /staticfiles directory
                for serving, along with any files that have been added to the
                /public directory. The Python back end is then built, and the
                build process will be complete.
              </p>
            </CardBody>
          </Collapse>
        </Card>
      </Container>
    );
  }
}

export default About;
