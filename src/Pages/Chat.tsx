import React, { useState } from 'react'
import UserList from '../Components/UserList'
import CardChat from '../Components/CardChat'
import { Button, Modal } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';

type Props = {
    socket: Socket;
};

export default function Chat({ socket }: Props) {
    const navigate = useNavigate();

    const handleLeaveChat = () => {

        navigate("/");

    };

    const [openModal, setOpenModal] = useState(false);
    return (
        <div>
            <div className="flex flex-wrap gap-4">

                <Button onClick={() => setOpenModal(true)}>Launch Modal</Button>
            </div>
            <Modal show={openModal} size="md" position="center-right" onClose={() => setOpenModal(false)} style={{ backgroundColor: "white" }}>
                <Modal.Header style={{ height: "8px" }} onClick={handleLeaveChat}>Online Chat</Modal.Header>
                <Modal.Body style={{ backgroundColor: "#eee" }}>
                    <div className="">
                        <UserList socket={socket} />
                        <div className="">

                            <CardChat socket={socket} />

                        </div>
                    </div>
                </Modal.Body>

            </Modal>
        </div>


    )
}
