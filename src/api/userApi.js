export async function registerUser(data) {
  try {
    const res = await fetch(
      'https://allocrew.herokuapp.com/register', {
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        firstname: data.firstname,
        lastname: data.lastname
      })
    }
    )
    console.log(res.status)
    
  } catch (error) {
  }
}




export async function getUser(token, userToken, setUserInfo) {
  try {
    const res = await fetch(
      `https://allocrew.herokuapp.com/api/users/${userToken().id}`, {
      method: 'GET',
      headers: {
        Authorization: `bearer ${token()}`,
      },
    }
    )
    const content = await res.json();
    if (res.status === 200){ setUserInfo(content[0]) }
  } catch (error) {
  }
}