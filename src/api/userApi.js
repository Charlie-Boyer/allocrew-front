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

export async function loginUser(data, history, storeUser) {
  try {
    const res = await fetch(
      'https://allocrew.herokuapp.com/api/login_check', {
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        username: data.username,
        password: data.password
      })
    }
    )
    const content = await res.json()
    console.log(content)
    if (res.ok) {
      localStorage.setItem('token', content.token)
      storeUser()
      return history.push('/auth')
    }
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