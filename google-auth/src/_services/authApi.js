import axios from 'axios';
import urlApi from './urlApi';

class authApi {
    async login(data) {
        var login_status = false;
        await axios.post(urlApi.backendDomain() + '/googlelogin',
            {
                token: data.token
            })
            .then(async(res) => {
                if (res.status === 200) {
                    // console.log(res.data);
                    localStorage.setItem('token', data.token)  // store the token to use for next time.
                    localStorage.setItem('user_email',res.data) //also store the email in case you neet it.you can bring some more data from server..if you need
                    login_status = true;
                    console.log("Logged In Successfully For Next 1 Hour"); // token time is 1 hr
                }
            })
            .catch((error) => {
                localStorage.removeItem('token'); // remove token if any stored.
                localStorage.removeItem('user_email')
                if ( error.response!==undefined && (error.response.status === 401 ||  error.response.status === 403)) { //if invalid token or expired
                    console.log("Invalid Login Credentials");
                } // if token is valid but not a club member
                else {
                    console.log("Oops Something Went Wrong"); //if backend is not running or not reachable....
                }
            })
        return login_status;
    }
    async validateToken(){ //return true false only
        let login=false;
        let token = await localStorage.getItem('token');
        if(token===null || token === undefined){
            return false;
        }
        await axios.post(urlApi.backendDomain()+'/googlelogin',{token:token})
        .then((res)=>{
            if(res.status===200){
                login=true
                localStorage.setItem('user_email',res.data)
            }
        })
        .catch(()=>{
            // console.log("User not logedIn");
        })
        return login;
    }
}
var instance = new authApi()
export default instance;