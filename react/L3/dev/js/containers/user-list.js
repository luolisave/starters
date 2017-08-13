import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectUser, selectHasChild,selectHasMoreChild, typeInputBox, saveChild, removeChild} from '../actions/index'


class UserList extends Component {
    renderList() {
        return (
            this.props.users.map((user,index) => {
            return (
                    <div
                        key={index}
                        
                    >
                        


                        {
                            (
                                (user,index) => {
                                    if(user && user.saved === "NO"){
                                        return (
                                                <div>
                                                    
                                                    First Name: <input type="text" name="first" defaultValue={this.props.users[index].first} onChange={(event)=>{this.props.typeInputBox(event,"first", index, this.props.users)}} /> 
                                                    Last Name: <input type="text" name="last" defaultValue={this.props.users[index].last} onChange={(event)=>{this.props.typeInputBox(event,"last", index, this.props.users)}} />  
                                                    index: {index}
                                                </div>
                                        );
                                    }else{
                                        return (
                                            <div>
                                                    <a href="javascript:;" onClick={(event)=>{
                                                        this.props.removeChild(event, index, this.props.users);
                                                    }}>Remove</a> 
                                                First Name: {this.props.users[index].first} &nbsp;
                                                Last Name: {this.props.users[index].last}
                                            </div>
                                        );
                                    }
                                }
                            )(user,index)
                        }
                        


                        
                        {
                            (
                                (user,index) => {
                                    console.log("user =============> ",user);
                                    if(user && user.saved === "NO"){
                                        return (
                                                <div>
                                                    <input title="Cancel" type="button" name="Cancel" value="Cancel"  />
                                                    <input title="Save" type="button" name="Save" value="Save" onClick={(event)=>{
                                                        this.props.saveChild(event, index, this.props.users);
                                                        console.log("this.props.users", this.props.users);
                                                        
                                                    }} />

                                                    {this.props.users[index].saved}
                                                </div>
                                        );
                                    }
                                }
                            )(user,index)
                        }


                        {
                            (
                                (user,index) => {
                                    console.log("user =============> ",user);
                                    if(user && user.saved === "YES" && user.moreChild !== "YES"){
                                        return (
                                                <div>
                                                    <label>Do you have another children:</label>
                                                    <input type="radio" name="hasMoreChild" 
                                                            checked={user.hasMoreChild === 'YES'}  
                                                            onChange={() => this.props.selectHasMoreChild(user, "YES")} />Yes
                                                    <input type="radio" name="hasMoreChild"
                                                            checked={true}                
                                                            onChange={() => {
                                                                //this.props.selectHasMoreChild(user, "NO")
                                                            }} />No
                                                </div>
                                        );
                                    }
                                }
                            )(user,index)
                        }
                        
                    </div>
                );
            })
        );
    }

    render() {
        console.log("this.props.hasChild = ", this.props.hasChild);
        return (
            <div>
            <form>
                <label>Do you have a child:</label>
                <input type="radio" name="hasChild" value="YES"  
                        checked={this.props.hasChild.hasChild === 'YES'}  
                        onChange={() => this.props.selectHasChild("YES")} />Yes
                <input type="radio" name="hasChild" value="NO" 
                        checked={this.props.hasChild.hasChild === 'NO'}                
                        onChange={() => this.props.selectHasChild("NO")} />No
            </form>
                {
                    (
                        () => {
                            switch (this.props.hasChild.hasChild) {
                                case "YES":   return (
                                        <div>
                                            {this.renderList()}

                                        </div>);
                                default:      
                                    return (
                                        <div>
                                            
                                        </div>
                                    );
                            }
                        }
                    )()
                }

                
            
            
            </div>
        );
    }

}

// Get apps state and pass it as props to UserList
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
    return {
        hasChild: state.hasChild,
        users: state.users
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    return bindActionCreators({selectUser: selectUser, selectHasChild: selectHasChild,selectHasMoreChild:selectHasMoreChild, typeInputBox: typeInputBox, saveChild: saveChild, removeChild:removeChild}, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(UserList);
