var React = window.React;
var ReactRouter = window.ReactRouter;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;

window.App = React.createClass({
  render() {
    return (
      <div>
        <div className="row">
            <div className="col-sm-4">
                <img className="img-responsive" src="assets/img/logo_32.png" />
            </div>
            <div className="col-sm-6">
                
            </div>
            <div className="col-sm-2">
                <span className="pull-right">Li's ReactJS Starter eL0 v0.0.1</span>
            </div>
        </div>

        {this.props.children}
      </div>
    )
  }
})