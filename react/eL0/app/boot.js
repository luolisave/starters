var React = window.React;
var ReactDOM = window.ReactDOM;

ReactDOM.render((
  <Router>
      <Route path="/" component={App}>
            {/* Show the dashboard at / */}
            <IndexRoute component={Dashboard} />
            <Route path="about" component={About} />
            <Route path="inbox" component={Inbox}>
                <Route path="messages/:id" component={Message} />
            </Route>
      </Route>
  </Router>
), document.getElementById('container'));