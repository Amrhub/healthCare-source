import { useAppSelector } from "../../redux/configureStore";

import Profile from "./Profile";

const ProfileMainUser = () => {
  const user = useAppSelector((state) => state.user.userInfo);

  const stories = [
    {
      id: 1,
      category: 'covid-19',
      content:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus corporis dolores laudantium quis. Eveniet, molestias? Dolorem, nisi iste! Pariatur, officiis?...',
      user,
      commentsCounter: 2,
      likesCounter: 3,
    },
    {
      id: 2,
      user,
      category: 'cancer',
      content:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus corporis dolores laudantium quis. Eveniet, molestias? Dolorem, nisi iste! Pariatur, officiis?...',
      commentsCounter: 5,
      likesCounter: 9,
    },
  ];

  return (
    <Profile
      mainUser={true}
      stories={stories}
      friend={false}
      friendRequest={false}
    />
  )
}

export default ProfileMainUser;
