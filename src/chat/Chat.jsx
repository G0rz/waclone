import {useEffect, useState} from "react";
import {Avatar, IconButton, TextField} from "@material-ui/core";
import {AttachFile, MoreVert, SearchOutlined} from "@material-ui/icons";
import MicNoneOutlinedIcon from '@material-ui/icons/MicNoneOutlined';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import {Redirect, useParams} from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SendIcon from '@material-ui/icons/Send';
import {makeStyles} from "@material-ui/core/styles";
import db from "../tools/firebase";
import moment from 'moment';
import {useStateValue} from "../tools/stateProvider";
import firebase from 'firebase';

const useStyles = makeStyles((theme) => ({
    chat: {
        flex: '0.65', display: 'flex', flexDirection: 'column', height: '100vh',
    }, chatHeader: {
        padding: '20px', display: 'flex', alignItems: 'center', borderBottom: '1px solid lightgray'
    }, chatHeaderInfo: {
        flex: '1', paddingLeft: '20px', '& h3': {
            marginBottom: '3px', fontWeight: '500'
        }, '& span': {
            color: 'gray'
        },
    }, chatHeaderRight: {
        display: 'flex', justifyContent: 'space-between', minWidth: '100px',
    }, chatBody: {
        flex: '1', backgroundColor: 'lightgray', padding: '30px', overflowY: 'auto',
    }, chatMessage: {
        position: 'relative',
        fontSize: '1em',
        padding: '15px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        width: 'fit-content',
        marginBottom: '20px',
        maxWidth: '90%'
    }, chatName: {
        position: 'absolute', fontWeight: '800', top: '0px', fontSize: 'xx-small',
    }, chatTimestamp: {
        fontSize: 'xx-small',
        color: 'rgba(0, 0, 0, 35)',
        float: 'right',
        cursor: 'default',
        position: 'relative',
        bottom: 0,
        paddingLeft: 5
    }, chatReceiver: {
        marginLeft: 'auto', backgroundColor: '#dcf8c6',
    }, chatFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '62px',
        borderTop: '1px solid lightgray',
    }, input: {
        flex: 1, borderRadius: '30px', border: 'none', padding: '10px',
    },
}));

const Chat = ({setShowChat, showSidebar, setShowSidebar, seed}) => {

    const classes = useStyles();
    const [{user}, dispatch] = useStateValue()
    const [input, setInput] = useState('');
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                setRoomName(snapshot.data().name)
            })
            db.collection('rooms')
                .doc(roomId)
                .collection('messages').orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                )
        }
    }, [roomId]);

    const sendMessage = (event) => {
        event.preventDefault()
        setInput('')
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    const handleBack = () => {
        setShowSidebar(true)
        setShowChat(false)
        return <Redirect to='/'/>
    }

    return (<div className={classes.chat}>
        <div className={classes.chatHeader}>
            {showSidebar === false ? <IconButton onClick={handleBack}>
                <ArrowBackIcon/>
            </IconButton> : <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>}
            <div className={classes.chatHeaderInfo}>
                <h3>{roomName}</h3>
            </div>
            <div className={classes.chatHeaderRight}>
                <IconButton>
                    <SearchOutlined/>
                </IconButton>
                <IconButton>
                    <AttachFile/>
                </IconButton>
                <IconButton>
                    <MoreVert/>
                </IconButton>
            </div>
        </div>
        <div className={classes.chatBody}>
            {messages.length !== 0 ? messages.map((message, index) => {
                return <div key={index}>
                    <p className={`${classes.chatMessage} ${message.name === user.displayName && classes.chatReceiver}`}>
                        <span className={classes.chatName}>{message.name.length > 15 ? message.name.substring(0,15) +'...' : message.name}</span>
                        {message.message}
                        <time className={classes.chatTimestamp}>
                            {moment(new Date(message.timestamp?.toDate())).format('LT')}
                        </time>
                    </p>
                </div>
            }) : null}
        </div>
        <div className={classes.chatFooter}>
            <IconButton aria-label="enviar"
                        color="primary">
                <EmojiEmotionsOutlinedIcon/>
            </IconButton>
            <TextField id="message" placeholder="Escribe un mensaje" value={input}
                       onChange={e => setInput(e.target.value)}
                       className={classes.input}/>
            <IconButton aria-label="enviar"
                        color="primary">
                <MicNoneOutlinedIcon/>
            </IconButton>
            <IconButton aria-label="enviar"
                        color="primary"
                        onClick={sendMessage}>
                <SendIcon/>
            </IconButton>

        </div>
    </div>);
};

export default Chat;
