import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Login.css';
import { withRouter } from 'react-router-dom';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
            username: "",
            password: "",
            token: "",
        };
    } //end constructor

    componentWillMount() {
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch('http://theapi/api/auth', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
             body: JSON.stringify({
                username: 'myUserName',
                password: 'myPassword',
                Authorization: 'TheReturnedToken',
            })
        }) /*end fetch */
        .then(results => results.json())
        .then(data => this.setState({ data: data })

        )
    }

    //request the token
      requestAccessToken(data) {
        const loginInfo = '${data}&grant_type=password';
        return fetch('${API_URL}Token', {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
          body: loginInfo,
        })
          .then((response) => response.json());
      }

      //authenticate request
      requestUserInfo(token) {
        return fetch('${API_URL}api/participant/userinfo', {
          method: 'GET',
          headers: new Headers({
            Authorization: 'Bearer ${token}',
          }),
        })
          .then((response) => response.json());
      }

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }; //end change

    onSubmit = (e) =>{
        this.fetchData();
        e.preventDefault();
        //console.log(this.state);
        this.setState({
             username: "",
             password: "",
            });

        this.props.history.push('/landing');
        };

    render() {
    console.log(this.state.data);
        return (
           <div>
                <div className="loginContainer">
                <h2>Member Login</h2>
                    <form>
                            <input
                            id="username"
                            name="username"
                            placeholder="User Name"
                            value={this.state.username}
                            onChange={e => this.change(e) }
                            className="form-control"
                            />  <br />

                            <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={e => this.change(e) }
                            className="form-control"
                            />  <br />

                        <button onClick={e => this.onSubmit(e)} className="btn btn-primary">Submit</button>
                        </form>
                    </div>
            </div>
        );
      }
}

export default withRouter(Login);