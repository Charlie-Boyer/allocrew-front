export async function postMsg (roomId, userId, msg) {

  try {
    const res = await fetch(
      'https://allocrew.herokuapp.com/api/messages/', {
      headers: {
        Authorization: `bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        discussion: roomId,
        user: userId,
        content: msg,
      })
    }
    )
    console.log(res)
    if (await res.ok) {
      return true
      // todo
    }
  } catch (error) {
  }
};



export async function postRoom ( postId, fromId, toId ) {

  try {
    const res = await fetch(
      'https://allocrew.herokuapp.com/api/discussions/', {
      headers: {
        Authorization: `bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        announcement: postId,
        receiver: toId,
        creator: fromId,
      })
    }
    )
    console.log(await res);
    if (await res.ok) {
      return true
      // todo
    }
  } catch (error) {
  }
};




export async function getRoomList (userId, setRoomList) {
  try {
    const res = await fetch(
      `https://allocrew.herokuapp.com/api/discussions/${userId}`, {
      headers: {
        Authorization: `bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
      },
      method: 'GET',
    }
    )
    const content = await res.json();
    if (await res.ok) {
      setRoomList([...content.by_creator, ...content.by_receiver])
      return true
      // todo
    }
  } catch (error) {
  }
};