var React = window.React;

(function (app) {
  app.com = app.com || { };

  app.com.welcome = class Welcome extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  }

})(window.ReactApp || (window.ReactApp = { }))