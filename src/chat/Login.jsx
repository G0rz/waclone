import {Button, Grid} from "@material-ui/core";
import logo from '../logo.png'
import {auth, provider} from "../tools/firebase";
import {useStateValue} from "../tools/stateProvider";
import {actionTypes} from "../tools/reducer";

const Login = () => {

    const [{}, dispatch] = useStateValue()

    const signIn = () => {
        auth.signInWithPopup(provider).then(result => {
            dispatch({
                type: actionTypes.SET_USER, user: result.user
            })
        }).catch((error) => alert(error.message))
    }

    return (<Grid container alignItems={'center'} justifyContent={'center'}
                  style={{textAlign: 'center'}}>
        <Grid item xs={12}>
            <img src={logo} alt={'Logo'} width={'100vw'}/>
        </Grid>
        <Grid item xs={12}>
            <Button variant={'contained'} color={'secondary'} onClick={signIn}>Sing in with
                Google</Button>
        </Grid>
    </Grid>);
};

export default Login;
