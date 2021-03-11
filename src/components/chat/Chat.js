import React, { useState, useEffect, useRef } from 'react';
import './style.scss';
import socket from '../../socket';
import { getRoomList, postMsg } from '../../api/chatAPI';
import { useAuth } from '../../contexts/authContext';
import { Formik, Field, Form } from 'formik';
import { v4 as uuidv4 } from 'uuid';

function Chat() {

  const { user } = useAuth();

  const [roomList, setRoomList] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);

  const messageArea = useRef(null);

  useEffect(() => {
    if (messageArea.current) {
      messageArea.current.scrollTo(0, messageArea.current.scrollHeight);
    }
  }, [roomList, currentRoom]);


  useEffect(() => {
    socket.on('display-message', (data) => {
      const newState = [...roomList]; 
      const old = newState.find(el => el.id === currentRoom)
      old.messages = [...old.messages, data]; 
      setRoomList(newState)
    });
    return () => socket.off('display-message');
  });


  useEffect(() => {
    if('userId' in user){
      getRoomList(user.userId, setRoomList);
    }
  }, [user]);

  function findCurrent() {
    return roomList.find(el => el.id === currentRoom)
  }


  return (
    <div>
      {console.log('roomList', roomList)}
      {console.log('currentRoom', currentRoom)}
      <h1 className="tchatRoom__title">Messagerie</h1>
      <div className="tchatRoom__container">
        <div className="discussion__container">
          <p className="sticky">Conversations en cours</p>
          {
            roomList.map((room) => (
              <div
                key={uuidv4()}
                className={room.id === currentRoom ? 'discussion active' : 'discussion'}
              >
                <div
                  className="discussion__name"
                  onClick={() => {
                    setCurrentRoom(room.id);
                    socket.emit('change-room', room.id);
                    console.log('currentRoom', currentRoom)
                  }}
                >
                  <p className="contactName">
                    {room.creator.id !== user.userId
                      ? `${room.creator.firstname} ${room.creator.lastname}`
                      : `${room.receiver.firstname} ${room.receiver.lastname}`}
                  </p>
                  <p>Annonce: {room.announcement.title.substr(0, 20)}...</p>
                </div>
                <div
                  className="deleteChat"
                // onClick={() => {
                //   setChatId(''); deleteD(chat.id);
                // }}
                >
                  Supprimer
                </div>
              </div>
            ))
          }
        </div>
        <div
          ref={messageArea} className={currentRoom ? 'message openedChat' : 'message'}
        >
          {!currentRoom && (
            <div className="emptyChat">
              <h2>Bienvenue dans votre messagerie</h2>
              {!roomList.length && <p>Vous n'avez pas de conversation en cours.</p>}
              {roomList.length === 1 && <p>Vous avez 1 conversation en cours.</p>}
              {roomList.length > 1 && <p>{`Vous avez ${roomList.length} conversations en cours.`}</p>}
              <p>Sélectionnez ou ajoutez une conversation pour commencer à discuter</p>
            </div>
          )}

          {
          
          roomList.find(el => el.id === currentRoom)?.messages.map((message) => {

              if (message.user.id === user.userId) {
                return (
                  <div key={uuidv4()} className="userMessage__container">
                    <p className="you">Vous</p>
                    <p className="userMessage">{message.content}</p>
                  </div>
                );
              }

              return (
                <div key={uuidv4()} className="contactMessage__container">
                  <p className="other">{message.user.firstname}</p>
                  <p className="contactMessage">{message.content}</p>
                </div>
              );
            })
          }
         
        </div>
        <Formik
          initialValues={{ message: "" }}
          onSubmit={(data) => {
            socket.emit(
              'send-message',
              {
                roomId: currentRoom,
                content: data.message,
                user: {
                  id: user.userId,
                  firstname: 'fdsfds',
                }
              });
            postMsg(currentRoom, user.userId, data.message);
            data.message = "";
          }}
        >
          <Form className="message__input">
            <Field
              name="message"
              type="text"
              placeholder="Envoyez un message" />
            <button hidden className="input" type="submit" />
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Chat;
