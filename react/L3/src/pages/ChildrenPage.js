import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import {initChildren, addNewChild} from '../actions/children'
import Child from '../pages/Child'

//Component
class ChildrenPage extends React.Component {
  myState = {}
  constructor(){
    super();
    console.log("ChildrenPage constructor.");
    this.myState = {
      hasChildFlag: false,
      hasMoreChildFlag: false
    };
    this.state = this.myState;
  }

  renderList() {
      return (
          this.props.children.map((child,index) => {
          return (
                  <div
                      key={child._id}

                  >
                      <Child child={child} myindex={index} resetHasMoreChildRadio={this.resetHasMoreChildRadio.bind(this)} />
                  </div>
              );
          })
      );
  }

  flagHasChild = false
  hasChild(flag){
    if(flag === "YES" || flag === true){
      this.myState.hasChildFlag = true;
    }else{
      this.myState.hasChildFlag = false;
    }
    console.log(this.myState);
    this.setState(this.myState);

    this.props.initChildren(
      [
        {
          "_id": uuidv4(),
          "first": "",
          "last": "",
          "saved": false
        }
      ]
    );
  }

  hasMoreChild(flag){
    if(flag === "YES" || flag === true){
      this.myState.hasMoreChildFlag = true;
    }else{
      this.myState.hasMoreChildFlag = false;
    }
    this.setState(this.myState);

    this.props.addNewChild(
        {
          "_id": uuidv4(),
          "first": "",
          "last": "",
          "saved": false
        }
    );
  }

  resetHasMoreChildRadio(){
    console.log("!!! !!! !!! === !!! !!! !!! resetHasMoreChildRadio");
    this.myState.hasMoreChildFlag = false;
    this.setState(this.myState);
  }


  render() {
    let self = this;
    console.log("this.props.children",this.props.children);
    return (
      <div>
        <h1>Children:</h1>

        <div className="radio">
            <h4>Do you have any other children? &nbsp;&nbsp;&nbsp;&nbsp;
                <label>
                  <input type="radio" name="hasChild" value="YES"
                          checked={this.state.hasChildFlag}
                          onClick={() => self.hasChild("YES")}
                          onChange={() => {}} />Yes &nbsp;&nbsp;&nbsp;&nbsp;
                </label>
                <label>
                  <input type="radio" name="hasChild" value="NO"
                          checked={!this.state.hasChildFlag}
                          onClick={() => self.hasChild("NO")}
                          onChange={() => {}} />No &nbsp;&nbsp;&nbsp;&nbsp;
                </label>
            </h4>
        </div>



          {(() => {
                    if (this.state.hasChildFlag) {
                    return (
                          <div>
                              {this.renderList()}
                          </div>
                        );
                  }
          })()}

          {(() => {
                    if (this.props.children && this.props.children.length > 0 && this.props.children[this.props.children.length-1].saved === true) { //
                    return (
                            <div className="radio">
                                <h4>Do you have more children: &nbsp;&nbsp;&nbsp;&nbsp;
                                    <label>
                                      <input type="radio" name="hasMoreChild" value="YES"
                                              checked={this.state.hasMoreChildFlag}
                                              onClick={() => self.hasMoreChild("YES")}
                                              onChange={() => {}} />Yes &nbsp;&nbsp;&nbsp;&nbsp;
                                    </label>
                                    <label>
                                      <input type="radio" name="hasMoreChild" value="NO"
                                              checked={!this.state.hasMoreChildFlag}
                                              onClick={() => self.hasMoreChild("NO")}
                                              onChange={() => {}} />No &nbsp;&nbsp;&nbsp;&nbsp;
                                    </label>
                                </h4>
                            </div>
                        );
                  }
          })()}

      </div>
    );
  }
}

// ChildrenPage.propTypes = {
//   children: PropTypes.array.isRequired
// }


function mapStateToProps(state) {
  return {
    children: state.children
  }
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    return bindActionCreators(
      {
        initChildren:initChildren,
        addNewChild:addNewChild
      },
      dispatch
    );
}

export default connect(mapStateToProps, matchDispatchToProps)(ChildrenPage);
//export default GamesPage;
