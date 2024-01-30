import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import db from '../tools/firebase'
import {Avatar} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    '@global': {
        a: {
            color: 'black !important', textDecoration: 'inherit !important'
        }
    }, chatRoom: {
        display: 'flex', padding: '20px', cursor: 'pointer', borderBottom: '1px solid #f6f6f6', '&:hover': {
            backgroundColor: '#ebebeb'
        }
    }, chatInfo: {
        marginLeft: '15px', '& h2': {
            fontSize: '16px', marginBottom: '8px'
        },
    }
}));

const SidebarChats = ({addNewChat, setShowSidebar, setShowChat, id, name, viewPort, seed}) => {

    const classes = useStyles();
    const [lastMessage, setLastMessage] = useState([]);

    useEffect(() => {
        if (id) {
            db.collection('rooms')
                .doc(id)
                .collection('messages').orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => setLastMessage(snapshot.docs.map((doc) => doc.data())))
        }
    }, [id]);


    const createChat = () => {
        const roomName = prompt('Ingrese el nombre del chat')
        if (roomName) {
            db.collection('rooms').add({name: roomName})
        }
    }

    const handleShow = () => {
        if (viewPort <= 768) {
            setShowChat(true)
            setShowSidebar(false)
        } else {
            return
        }
    }

    return !addNewChat ? (<Link to={`/rooms/${id}`} onClick={handleShow}>
        <div className={classes.chatRoom}>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className={classes.chatInfo}>
                <h2>{name}</h2>
                <p>{lastMessage.length !== 0 ? (lastMessage[lastMessage.length - 1].message.length > 50 ? lastMessage[lastMessage.length - 1].message.substring(0, 50) + '...' : lastMessage[lastMessage.length - 1].message) : null}</p>
            </div>
        </div>
    </Link>) : (<div onClick={createChat} className={classes.chatRoom}>
        <h2>Add new Chat</h2>
    </div>);
};

export default SidebarChats;
