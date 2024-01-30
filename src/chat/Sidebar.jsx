import {useEffect, useState} from "react";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Avatar, IconButton, TextField} from "@material-ui/core";
import {SearchOutlined} from "@material-ui/icons";
import SidebarChats from "./SidebarChats";
import {makeStyles} from "@material-ui/core/styles";

import db from '../tools/firebase'
import {useStateValue} from "../tools/stateProvider";

const useStyles = makeStyles((theme) => ({
    sidebar: {
        flex: '0.35', display: 'flex', flexDirection: 'column', height: '100vh',
    }, sidebarHeader: {
        display: 'flex', justifyContent: 'space-between', padding: '20px', borderRight: '1px solid lightgray'
    }, sidebarHeaderRight: {
        display: 'flex', textAlign: 'center', justifyContent: 'space-between',
    }, sidebarSearch: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f6f6f6',
        height: '39px',
        padding: '10px',
        border: '1px solid lightgray',
    }, sidebarSearchContainer: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        height: '35px',
    }, sidebarChats: {
        flex: 1, backgroundColor: 'white', overflowY: 'auto',
    }, input: {
        flex: 1, padding: '10px'
    },
}));

const Sidebar = ({setShowChat, setShowSidebar, viewPort, seed}) => {

    const classes = useStyles();
    const [{user}, dispatch] = useStateValue()

    const [rooms, setRooms] = useState([]);
    const [addNewChat, setAddNewChat] = useState(true)



    useEffect(() => {
       db.collection('rooms').onSnapshot((snapshot) =>
        setRooms(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            }))
        )
       );
    }, []);


    return (<div className={classes.sidebar}>
        <div className={classes.sidebarHeader}>
            <Avatar src={user.photoURL}/>
            <div className={classes.sidebarHeaderRight}>
                <IconButton color="primary">
                    <DonutLargeIcon/>
                </IconButton>
                <IconButton color="primary">
                    <ChatIcon/>
                </IconButton>
                <IconButton color="primary">
                    <MoreVertIcon/>
                </IconButton>
            </div>
        </div>
        <div className={classes.sidebarSearch}>
            <div className={classes.sidebarSearchContainer}>
                <IconButton color="primary">
                    <SearchOutlined/>
                </IconButton>
                <TextField className={classes.input} id="search" placeholder={'Buscar o inicar un nuevo chat'}/>
            </div>
        </div>
        <div className={classes.sidebarChats}>
            <SidebarChats addNewChat={addNewChat}/>
            {rooms.map(room => {
                return <SidebarChats key={room.id} id={room.id} name={room.data.name} setShowChat={setShowChat}
                                     setShowSidebar={setShowSidebar} viewPort={viewPort} seed={seed}/>
            })}
        </div>
    </div>);
};

export default Sidebar;
