import React, { Component } from "react";

class UserListComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            meaaage: null
        }
    }

    componentDidMount() {
        this.reloadUserList();
    }

    reloadUserList = () => {
        ApiService.fetchUsers()
            .then ( rea => {
                this.setState({
                    users: res.data
                })
            })
            .catch ( err => {
                console.log('reloadUserList() Error!', err);
            })
    }

    deleteUser = ( userID ) => {
        ApiService.deleteUser ( userID )
            .then( res => {
                this.setState({
                    message: 'User Deleted Successfully.'
                });
                this.setState({
                    users: this.state.users.filter( user =>
                    user.id !== userID)
                });
            })
            .catch( err => {
                console.log('deleteUser() Error!', err);
            })
    }

    editUser = (ID) => {
        window.localStorage.setItem("userID", ID);
        this.props.history.push('/dit-user');
    }

    addUser = () => {
        window.localStorage.removeItem("userID");
        this.props.history.push('/add-user');
    }

    render () {

        return(
            <div>
                <h2>User List</h2>
                <button onClick={this.addUser}> Add User </button>
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>FistName</td>
                            <td>LastName</td>
                            <td>UserName</td>
                            <td>Age</td>
                            <td>Salary</td>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.users.map ( user =>
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.LastName}</td>
                            <td>{user.username}</td>
                            <td>{user.age}</td>
                            <td>{user.salary}</td>
                            <td>
                                <button onClick={ () => this.editUser(user.id)}> Edit </button>
                                <button onClick={ () => this.deleteUser(user.id)}> Delete </button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default UserListComponent;
