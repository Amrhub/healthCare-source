import { useAppSelector } from "../../redux/configureStore";

import Profile from "./Profile";

const ProfileMainUser = () => {
  const user = useAppSelector((state) => state.user.userInfo);

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
