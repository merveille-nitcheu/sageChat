import { Button } from 'flowbite-react';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

import { Socket } from 'socket.io-client';

interface User
{
userName:string,
photo:string
}


type Props = {
  socket: Socket;
};

export default function Login({ socket }: Props) {

  const navigate = useNavigate();

  const [userName, setUserName] = useState<string>('');

 let username = localStorage.getItem('userName')
 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(username!==userName){
      // Récupérer les utilisateurs existants du localStorage
     const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

     // Ajouter le nouvel utilisateur à la liste
     const newUser: User = {
       userName:userName,
       photo: 'photo' 
     };
     const updatedUsers = [...existingUsers, newUser];
 
     // Enregistrer la liste mise à jour des utilisateurs dans le localStorage
     localStorage.setItem('users', JSON.stringify(updatedUsers));
     localStorage.setItem("userName",userName)
     socket.emit('newUser', { userName, socketID: socket.id });
    }
     

    navigate('/chat');
  };
  return (
    <div style={{ backgroundColor: "#eee", minHeight: "100vh" }}>
      <div className="container py-5">

        <div className="row">

          <div className="col-md-3 col-lg-3 col-xl-3 ">

          </div>

          <div className="col-md-6 col-lg-6 col-xl-6">

            <div className="card my-5">

              <div className="card-body">

                <h3 className="font-weight-bold my-4 text-center ">Login to your account</h3>
                <form onSubmit={handleSubmit}>

                  <ul className="list-unstyled my-3 mx-5">
                    <li className="mb-3 " style={{ backgroundColor: "#eee", borderRadius: "7px" }}>
                      <div className="form-outline">
                        <input className="form-control py-2" name="userName" value={userName}
                          onChange={(e) => setUserName(e.target.value)}></input>
                        <label className="form-label" >Username</label>
                      </div>
                    </li>
                    <Button type="submit" className="btn btn-info btn-rounded float-end">Send</Button>

                  </ul>

                </form>



              </div>
            </div>

          </div>

          <div className="col-md-3 col-lg-3 col-xl-3">



          </div>

        </div>





      </div>
    </div>
  )
}
