import {makeStyles} from "@material-ui/core/styles"
import {useEffect, useState} from "react"
import {Grid} from "@material-ui/core"
import Sidebar from './Sidebar'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Chat from "./Chat"
import Login from "./Login";
import {useStateValue} from "../tools/stateProvider";

const useStyles = makeStyles((theme) => ({
    '@global': {
        '*': {
            margin: 0
        }, body: {
            margin: 0,
        }
    }, container: {
        backgroundColor: "#F2F2F2", width: '100%', boxShadow: '-1px 4px 20px 6px rgb(0,0,0, 0.2)'
    }, app: {
        display: 'grid', placeItems: 'center', backgroundColor: '#dadbd3', height: '100vh',
    }, appBody: {
        display: 'flex',
        backgroundColor: '#ededed',
        height: '100vh',
        width: '100vw',
        boxShadow: '-1px 4px 20px -6px rgba(0, 0, 0, 0.75)',
    }
}));

const ChatIndex = () => {

    const classes = useStyles();
    const [seed, setSeed] = useState('')
    const [{user}, dispatch] = useStateValue()
    const [showSidebar, setShowSidebar] = useState(true);
    const [showChat, setShowChat] = useState(true);
    const [viewPort, setViewPort] = useState(window.innerWidth);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, []);

    useEffect(() => {
        setViewPort(window.innerWidth)
        if (viewPort <= 768) {
            setShowChat(false)
        }
    }, [setShowSidebar, setShowChat]);

    return (<div className={classes.app}>
        {!user ? <Login/> : <div className={classes.appBody}>
            <Router>
                <Switch>
                    <Route path="/">
                        <Grid container className={classes.container}>
                            {showSidebar ? <Grid item xs={12} sm={12} md={4}>
                                <Sidebar setShowChat={setShowChat} setShowSidebar={setShowSidebar} viewPort={viewPort}
                                         user={user} seed={seed}/>
                            </Grid> : null}
                            {showChat ? <Grid item xs={12} sm={12} md={8}>
                                <Route path="/rooms/:roomId">
                                    <Chat setShowChat={setShowChat} showSidebar={showSidebar} seed={seed}
                                          setShowSidebar={setShowSidebar}/>
                                </Route>
                            </Grid> : null}
                        </Grid>
                    </Route>
                </Switch>
            </Router>
        </div>}
    </div>);
};

export default ChatIndex;
