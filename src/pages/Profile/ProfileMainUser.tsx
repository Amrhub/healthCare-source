import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from "../../redux/configureStore";
import { getMyStories } from '../../redux/stories/storySlice';

import Profile from "./Profile";

const ProfileMainUser = () => {
  const user = useAppSelector((state) => state.user.userInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMyStories(user.id));
  }, [])

  return (
    <Profile
      mainUser={true}
      mainUserInfo={user}
      friend={false}
      friendRequest={{ bool: false }}
    />
  )
}

export default ProfileMainUser;
