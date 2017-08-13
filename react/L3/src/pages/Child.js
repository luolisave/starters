import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';

// functions, should put to seperate file later.
function clone(obj) {
    if (null === obj || "object" !== typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
//Functions, should put to seperate file later.
var special = ['zeroth','first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
var deca = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];

function stringifyNumber(n) {
  if (n < 20) return special[n];
  if (n%10 === 0) return deca[Math.floor(n/10)-2] + 'ieth';
  return deca[Math.floor(n/10)-2] + 'y-' + special[n%10];
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


//component
class Child extends React.Component {
  child = {};

  componentDidMount(){
      this.child = clone(this.props.child);
      console.log("this.child = ", this.child);
  }

  render() {
    if(this.props.child.saved){
      return (
          <div className="childRow">
              <div className="row">
                <div className="col col-sm-2">
                    <h4>{capitalizeFirstLetter(stringifyNumber(this.props.myindex+1))} Child</h4>
                    <p><a className="removeBtn" onClick={()=>{
                      this.props.removeChild(this.props.child);
                    }} >Remove</a></p>

                </div>
                <div className="col col-sm-2">
                    First Name:  <input type="text" name="first" defaultValue={this.props.child.first} disabled />
                </div>
                <div className="col col-sm-2">
                    Last Name:  <input type="text" name="last" defaultValue={this.props.child.last} disabled />
                </div>
                <div className="col col-sm-2">

                </div>
              </div>
          </div>
      );
    }else{
      return (
        <div className="childRow">
            <div className="row">
                <div className="col col-sm-2">
                    <h4>{capitalizeFirstLetter(stringifyNumber(this.props.myindex+1))} Child</h4>
                    <p><a
                      className="removeBtn"
                      onClick={
                      ()=>{
                          this.props.removeChild(this.props.child);
                          this.props.resetHasMoreChildRadio();
                        }
                    } >Remove</a></p>

                </div>
                <div className="col col-sm-2">
                    First Name:  <input type="text" name="first" defaultValue={this.props.child.first} onChange={(event)=>{
                        this.child.first = event.target.value;
                        console.log("child = ",this.child, " ||| event.target.value = ", event.target.value, " ||| uuidv4 = ", uuidv4());
                    }} />
                </div>
                <div className="col col-sm-2">
                    Last Name: <input type="text" name="last" defaultValue={this.props.child.last} onChange={(event)=>{
                        this.child.last = event.target.value;
                        console.log("child = ",this.child, " ||| event.target.value = ", event.target.value, " ||| uuidv4 = ", uuidv4());
                    }} />
                </div>
            </div>
            <div className="row">
                <div className="col col-sm-2"></div>
                <div className="col col-sm-2"></div>
                <div className="col col-sm-2">
                      <p>&nbsp; &nbsp;</p>

                      <button title="Cancel" className="btn btn-primary">Cancel</button> &nbsp; &nbsp;
                      <button title="Save" className="btn btn-primary" onClick={
                            (event)=>{
                                console.log("!!! this.props.children", this.props.children);
                                //let myChildren = clone(this.props.children);
                                //myChildren.push(this.child);
                                //console.log("!!! myChildren", myChildren);
                                this.props.saveChild(this.child);

                                this.props.resetHasMoreChildRadio();
                            }
                          }>Save</button></div>
            </div>
        </div>
      );
    }
  }
}


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
        saveChild: function(payload) {
              console.log("action: Should Save Child to Children Reducer.");
              return {
                  type: 'SAVE_CHILD',
                  payload: payload
            }
          },
          removeChild: function(payload) {
                console.log("action: Should Save Child to Children Reducer.");
                return {
                    type: 'REMOVE_CHILD',
                    payload: payload
              }
            }
      },
      dispatch
    );
}

export default connect(mapStateToProps, matchDispatchToProps)(Child);
//export default Child;
