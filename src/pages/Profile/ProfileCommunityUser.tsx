import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import LoadingScreen from '../../Modals/LoadingScreen';
import { apiVersion, baseUrl, useAppSelector } from '../../redux/configureStore';
import { UserGeneralInfo } from '../../redux/users/users';
import { userRoutes } from '../../Routes/Routes';

import Profile, { ProfilePropsFriendRequest } from './Profile';


const ProfileCommunityUser = () => {
  const currentUser = useAppSelector((state) => state.user);
  const [isFriend, setIsFriend] = useState(false);
  const [isFriendRequest, setIsFriendRequest] = useState<ProfilePropsFriendRequest>({ bool: false });
  const [user, setUser] = useState<UserGeneralInfo>();
  const navigate = useNavigate();


  const { userId } = useParams();

  const fetchUser = async () => {
    const response = await fetch(`${baseUrl}${apiVersion}users/${userId}`);
    setUser(await response.json());
  };

  useEffect(() => {
    if (!userId) return;
    if (currentUser.userInfo.id === parseInt(userId)) navigate(userRoutes.profile.main)
    fetchUser();
    const friendship = currentUser.friends.pending.find((friend) => friend.requester_id === parseInt(userId as string)
      || friend.requestee_id === parseInt(userId as string)
    );

    if (friendship) {
      setIsFriendRequest({ requester_id: friendship.requester_id, requestee_id: friendship.requestee_id, bool: true });
    } else {
      setIsFriendRequest({ bool: false });
    }

    if (currentUser.friends.accepted.some((friend) =>
      friend.requestee_id === parseInt(userId as string)
      || friend.requester_id === parseInt(userId as string))
    ) {
      setIsFriend(true);
    } else {
      setIsFriend(false);
    }
  }, [currentUser])

  return (
    userId ? (
      user?.id ? (
        <Profile
          mainUser={false}
          visitedUser={user}
          friend={isFriend}
          friendRequest={isFriendRequest}
        />
      ) : (
        <LoadingScreen />
      )
    ) : (
      <Profile
        mainUser={false}
        friend={isFriend}
        friendRequest={isFriendRequest}
      />
    )
  );
};

export default ProfileCommunityUser;
