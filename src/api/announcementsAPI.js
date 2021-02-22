
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
    if (res.status === 200){ setList(content) }
  } catch (error) {
  }
}


// export const postCreateAnnouncement = () => (dispatch, getState) => {
//   const { user, ...data } = getState().data.create;
//   axios({
//     headers: {
//       Authorization: `bearer ${token()}`,
//     },
//     method: 'post',
//     url: 'https://allocrew.herokuapp.com/api/announcements/',
//     data: {
//       user: getState().login.userId,
//       ...data,
//     },
//   })
//     .then(() => {
//       dispatch(redirect('announcement'));
//     })
//     .catch((err) => console.log(err.response));
// };


// category: 'default',
//     active: true,
//     voluntary: true,
//     date_start: '2020-10-10T00:00:00+00:00',
//     date_end: '2020-10-10T00:00:00+00:00',
//     location: '',
//     title: '',
//     description: '',
//     picture: '',
//     user: { id: 0 }