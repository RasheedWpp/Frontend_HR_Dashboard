import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Alert, Button, FormGroup, Label, InputGroup, InputGroupAddon, Input, InputGroupText } from 'reactstrap';
import Widget from '../../components/Widget';
import { loginUser,getOtp } from '../../actions/user';
import microsoft from '../../assets/microsoft.png';
import { setData } from '../../actions/user';
import { useDispatch, useSelector } from 'react-redux';





class Login extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
        setData: PropTypes.func.isRequired,
        sessionToken: PropTypes.string.isRequired,
    };

    static isAuthenticated(token) {
        if (token) return true;
    }

    constructor(props) {
        
        super(props);
        this.state = {
            email: '',
            password: '',
            open:true,
            file: null,
            fileName: '',
        };

        this.doLogin = this.doLogin.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.signUp = this.signUp.bind(this);
        this.checking = this.checking.bind(this);
        this.handleClose = this.handleClose.bind(this);
        
    }
    handleClose() {
        this.props.dispatchgetOtp(this.state.email)
        .then((value)=>{
            if(value==1){
                this.setState({ open: !this.state.open });
            }  
        })  
    }
    changeEmail(event) {
        this.setState({ email: event.target.value });
    }

    changePassword(event) {
        this.setState({ password: event.target.value });
    }

    doLogin(e) {
        e.preventDefault();
        this.props.dispatchloginUser({ email: this.state.email, otp: this.state.password });
    }

    signUp() {
        this.props.history.push('/register');
    }
    
    checking (){
        window.location.href = 'https://www.google.com'; 
    }
    handleClick = () => {
        this.props.dispatchSetData('new value');
    }   
    
    
     

    render() {
        const { value, sessionToken } = this.props;
        // console.log("value",value)
        // console.log("sessionToken",sessionToken.value)
        const  from  =   '/app/main/dashboard'  ; // eslint-disable-line
        // cant access login page while logged in
        if (Login.isAuthenticated(JSON.parse(localStorage.getItem('authenticated')))) {
            return (
                <Redirect to={from} />
            );
        }
        
        return (
            <div className="auth-page">
                <Container>
                    <Widget className="widget-auth mx-auto" title={<h1 className="mt-0">DASHBOARD</h1>}>
                        <p className="widget-auth-info">
                            Use your email to sign in.
                        </p>
                        <div className="text-center">
                        <img className="mx-auto" src="data:image/png;base64,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"></img>
                        </div>
                        <form>
                            {
                                this.props.errorMessage && (
                                    <Alert className="alert-sm widget-middle-overflow rounded-0" color="danger">
                                        {this.props.errorMessage}
                                    </Alert>
                                )
                            }
                            <FormGroup className="mt">
                                <Label for="email">Email</Label>
                                <InputGroup className="input-group-no-border">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="la la-user text-white"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="email" className="input-transparent pl-3" onChange={this.changeEmail} type="email"
                                           required name="email" placeholder="Email"/>
                                </InputGroup>
                            </FormGroup>
                            {this.state.open ? (<>
                            <FormGroup>
                                <Label for="password">Enter the OTP sent to your email ID</Label>
                                <InputGroup className="input-group-no-border">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="la la-lock text-white"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="password" className="input-transparent pl-3" 
                                           onChange={this.changePassword}  type="password"
                                           required name="password" placeholder="otp" maxLength={6}/>
                                </InputGroup>
                            </FormGroup>
                            <div className="bg-widget auth-widget-footer" style={{padding: '20px 20px'}}>
                                <Button onClick={this.doLogin} color="danger" className="auth-btn"
                                        size="sm" style={{color: '#fff'}}>
                                  <span className="auth-btn-circle" style={{marginRight: 8}}>
                                    <i className="la la-caret-right"/>
                                  </span>login
                                  
                                </Button>
                            </div></>) : (<div className="bg-widget auth-widget-footer" style={{padding: '20px 20px'}}>
                                <Button onClick={this.handleClose} color="danger" className="auth-btn"
                                        size="sm" style={{color: '#fff'}}>
                                  <span className="auth-btn-circle" style={{marginRight: 8}}>
                                    <i className="la la-caret-right"/>
                                  </span>Get OTP
                                  
                                </Button>
                            </div>) }
                        </form>
                    </Widget>
                </Container>
                <footer className="auth-footer">
                {new Date().getFullYear()} &copy; Admin Dashboard Made by <a href="https://www.wundermanthompson.com/india#:~:text=8th%20Floor%2C%20Tower%20B%2C%20DLF,Contact%20Us" rel="noopener noreferrer" target="_blank">Wunderman Thompson Studios</a>.
                </footer>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
      dispatchSetData: (value) => dispatch(setData(value)),
      dispatchgetOtp: (value) => dispatch(getOtp(value)),
      dispatchloginUser: (value) => dispatch(loginUser(value))
    };
  };

function mapStateToProps(state) {
    return {
        isFetching: state.auth.isFetching,
        isAuthenticated: state.auth.isAuthenticated,
        errorMessage: state.auth.errorMessage,
        value: state.value,
        sessionToken: state.sessionToken,
        
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login));

