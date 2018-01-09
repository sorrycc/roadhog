import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    if (process.env.contextPath) {
      return <div>contextPath: {process.env.contextPath}</div>;
    } else {
      return (
        <div className="full-page-content">
          <div className="landing-blurb">
            <div className="logo">Logo here</div>
            <div className="animation">Something here</div>
            <h1 ref="landingLabel" className="label">
              I'm looking for things to do in
            </h1>
          </div>
        </div>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
