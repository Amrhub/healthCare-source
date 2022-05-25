import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import LoadingScreen from '../../Modals/LoadingScreen';
import { apiVersion, baseUrl, useAppSelector } from '../../redux/configureStore';
import { StoryType } from '../../redux/stories/storySlice';

import Profile from './Profile';


const ProfileCommunityUser = () => {
  const currentUser = useAppSelector((state) => state.user);
  const allStories = useAppSelector((state) => state.posts.stories);
  const [stories, setStories] = useState<StoryType[]>([]);
  const [isFriend, setIsFriend] = useState(false);
  const [isFriendRequest, setIsFriendRequest] = useState(false);
  const [user, setUser] = useState<any>();

  const { userId } = useParams();

  const fetchUser = async () => {
    const response = await fetch(`${baseUrl}${apiVersion}users/${userId}`);
    setUser(await response.json());
  };

  useEffect(() => {
    if (!userId) return;
    setStories(allStories.filter((story) => story.user.id === parseInt(userId as string)));
    fetchUser();
    if (currentUser.friends.pending.some((friend) => friend.requester_id === parseInt(userId as string)
      || friend.requestee_id === parseInt(userId as string))) {
      setIsFriendRequest(true);
    }

    if (currentUser.friends.accepted.some((friend) => friend.requestee_id === parseInt(userId as string) || friend.requester_id === parseInt(userId as string))) {
      setIsFriend(true);
    }
  }, [])

  return (
    userId ? (
      user?.id ? (
        <Profile
          mainUser={false}
          visitedUser={user}
          stories={stories}
          friend={isFriend}
          friendRequest={isFriendRequest}
        />
      ) : (
        <LoadingScreen />
      )
    ) : (
      <Profile
        mainUser={false}
        stories={stories}
        friend={isFriend}
        friendRequest={isFriendRequest}
      />
    )
  );
};

export default ProfileCommunityUser;
