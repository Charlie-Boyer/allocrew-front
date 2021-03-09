
export async function getAnnouncements(token, setList) {
  try {
    const res = await fetch(
      'https://allocrew.herokuapp.com/api/announcements/', {
      method: 'GET',
      headers: {
        Authorization: `bearer ${token()}`,
      },
    }
    )
    const content = await res.json();
    if (res.status === 200) { setList(content) }
  } catch (error) {
  }
}


export async function postCreateAnnouncement(data, user) {

  console.log(user.userId, data.title)

  const myData = {
    title: data.title,
    location: data.location,
    category: 'rerezrez',
    description: data.description,
    active: true,
    voluntary: data.salary ? true : false,
    date_start: '2020-10-10T00:00:00+00:00',
    date_end: '2020-10-10T00:00:00+00:00',
    picture: data.picture,
    user: user.userId
  }

  try {
    const res = await fetch(
      'https://allocrew.herokuapp.com/api/announcements/', {
      headers: {
        Authorization: `bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        ...myData
      })
    }
    )
    const content = await res.json()
    console.log(content)
    if (res.ok) {
      // todo
    }
  } catch (error) {
  }
};


    // category: 'default',
    // active: true,
    // voluntary: true,
    // date_start: '2020-10-10T00:00:00+00:00',
    // date_end: '2020-10-10T00:00:00+00:00',
    // location: '',
    // title: '',
    // description: '',
    // picture: '',
    // user: { id: 0 }