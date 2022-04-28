import Profile from "./Profile";

const userData = {
  name: 'Mohamed Adel',
  image: 'https://i.pravatar.cc/300?img=11',
  description:
    'UI/UX Designer. In my year on the Customer Experience team at this strategic digital agency I was able to grow my design leadership and experience skills exponentially.',
  email: 'mohamedadelyousry@gmail.com',
  phone: '01155299730',
  address: '3rd Settlement, New Cairo City',
  birthdate: '28 - Aug - 1999',
  gender: 'Male',
  mainUser: true,
  friend: false,
  friendRequest: false,

  stories: [
    {
      id: 1,
      category: 'covid-19',
      content:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus corporis dolores laudantium quis. Eveniet, molestias? Dolorem, nisi iste! Pariatur, officiis?...',
      commentsCounter: 2,
      likesCounter: 3,
      avatar: 'https://i.pravatar.cc/300?img=11',
    },
    {
      id: 2,
      category: 'cancer',
      content:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus corporis dolores laudantium quis. Eveniet, molestias? Dolorem, nisi iste! Pariatur, officiis?...',
      commentsCounter: 5,
      likesCounter: 9,
      avatar: 'https://i.pravatar.cc/300?img=11',
    },
  ],
};

const ProfileMainUser = () => {
  return (
    <Profile
        name={userData.name}
        image={userData.image}
        description={userData.description}
        email={userData.email}
        phone={userData.phone}
        address={userData.address}
        birthdate={userData.birthdate}
        gender={userData.gender}
        mainUser={userData.mainUser}
        stories={userData.stories}
        friend={userData.friend}
        friendRequest={userData.friendRequest}
    />
  )
}

export default ProfileMainUser;
