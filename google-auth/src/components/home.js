import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
import authApi from './../_services/authApi'
import AuthContext from './../_services/authContext'
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loginMessage:''
        }
    }
    responseGoogle = async (response) => {
        console.log(response);
        var data = {
            token: response.tokenId
        }
        let res = await authApi.login(data);
        if (res === true) {
            this.context.login();  //this function is passed here though context feature of the react.js. defined in _services/authContext.js
            this.setState({
                loginMessage:"Loged-In Successfully"
            })
            //reditect if needed
        }else{
            // console.log(this.context);
            this.setState({
                loginMessage:"Loged-In Failed"
            })
            this.context.logout();
        }
    }
    render() {
        return (
            <>
            <div style={{display:'flex',justifyContent:'center',marginTop:'5rem'}}>
                <GoogleLogin
                    clientId="450857265760-h4n07vma47ofqrna2ktclm5rvgg3f24l.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
            <div style={{textAlign:'center',marginTop:'5rem',fontSize:'2rem'}} >{this.state.loginMessage}</div>
            </>
        )
    }
}

Home.contextType=AuthContext;
export default Home
