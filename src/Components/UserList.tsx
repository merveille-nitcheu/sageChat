import React, { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client';
import icone from "../Assets/icone.png"

type Props = {
    socket: Socket;
};

interface User {
    userName: string,
    photo: string
}
export default function UserList({ socket }: Props) {
    const [users, setUsers] = useState<User[]>([])
    const [username, setUsername] = useState<string>('');


    //useEffect(() => {
    //let savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    //setUsers(savedUsers)
    //setUsername(localStorage.getItem('userName') || '')


    //}, [username])

    //const filteredUsers = users.reduce((uniqueUsers: User[], user: User) => {
    //if (!uniqueUsers.some((u) => u.userName === user.userName)) {
    //uniqueUsers.push(user);
    // }
    // return uniqueUsers;
    // }, []);
    //const userFinal = filteredUsers.filter((user) => user.userName !== username)
    //console.log(userFinal)
    useEffect(() => {
        socket.on('newUserResponse', (data) => setUsers(data));
    }, [socket, users]);


    return (
        <>

            {users.length > 0 &&
                <>
                    <h3 className="font-bold text-2xl mb-3 text-center">Online Users</h3>
                    <div className="my-6">
                        <div className="card">
                            <div className="card-body">

                                <ul className="list-unstyled mb-0">

                                    {users.map((user, index) =>
                                        <li className="p-2 border-bottom" style={{ backgroundColor: "#eee" }}>
                                            <a href="#!" className="d-flex justify-content-between" key={index}>
                                                <div className="d-flex flex-row">
                                                    <img src={icone} alt="avatar"
                                                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="50" />
                                                    <div className="pt-1">
                                                        <p className="fw-bold mb-0">{user.userName}</p>
                                                        <p className="small text-muted">Hello, Are you there?</p>
                                                    </div>
                                                </div>
                                                <div className="pt-1">
                                                    <p className="small text-muted mb-1">Just now</p>
                                                    <span className="badge bg-danger float-end">1</span>
                                                </div>
                                            </a>
                                        </li>)}

                                </ul>

                            </div>
                        </div>
                    </div>
                </>}
        </>
    )
}
