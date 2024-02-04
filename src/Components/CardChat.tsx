import { Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client';
import icone from "../Assets/icone.png"

type Props = {
    socket: Socket;
};
interface Message {
    text: string,
    name: string,
    id: string,
    socketID: string
}

export default function CardChat({ socket }: Props) {

    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);

    const username = localStorage.getItem('userName')

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.trim() && localStorage.getItem('userName')) {
            socket.emit('message', {
                text: message,
                name: localStorage.getItem('userName'),
                id: `${socket.id}${Math.random()}`,
                socketID: socket.id,
            });
        }
        console.log()
        setMessage('');
    };



    useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
    }, [socket, messages]);

    return (
        <div>
            <ul className="list-unstyled">
                {messages.map((message) =>
                    message.name === username ? (
                        <li className="d-flex justify-content-between mb-4">
                            <div className="card w-100" key={message.id}>
                                <div className="card-header d-flex justify-content-between p-3">
                                    <p className="fw-bold mb-0">{username}</p>
                                    <p className="text-muted small mb-0"><i className="far fa-clock"></i> 13 mins ago</p>
                                </div>
                                <div className="card-body">
                                    <p className="mb-0">
                                        {message.text}
                                    </p>
                                </div>
                            </div>
                            <img src={icone} alt="avatar"
                                className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong" width="60" />
                        </li>) : (
                        <li className="d-flex justify-content-between mb-4">
                            <img src={icone} alt="avatar"
                                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60" />
                            <div className="card" key={message.id}>
                                <div className="card-header d-flex justify-content-between p-3">
                                    <p className="fw-bold mb-0">key={message.name}</p>
                                    <p className="text-muted small mb-0"><i className="far fa-clock"></i> 12 mins ago</p>
                                </div>
                                <div className="card-body">
                                    <p className="mb-0">
                                        {message.text}
                                    </p>
                                </div>
                            </div>
                        </li>))}


                <form onSubmit={handleSendMessage}>
                    <li className="bg-white mb-3">
                        <div className="form-outline">
                            <textarea className="form-control" id="textAreaExample2" rows={4} placeholder='Enter votre message' value={message} onChange={(e) => setMessage(e.target.value)}></textarea>

                        </div>
                    </li>
                    <Button type="submit" className="btn btn-info btn-rounded float-end">Send</Button>
                </form>
            </ul>
        </div>
    );
}
