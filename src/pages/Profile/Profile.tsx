import { Box } from '@mui/material';

import BioProfile from '../../components/Profile/BioProfile';
import StoriesProfile from '../../components/Profile/StoriesProfile';

interface IProps {  
  name: string;
  image: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  birthdate: string;
  gender: string;
  mainUser: boolean;
  stories: any;
  friend: boolean;
  friendRequest: boolean;
};


const Profile = ({
  name,
  image,
  description,
  email,
  phone,
  address,
  birthdate,
  gender,
  mainUser,
  stories,
  friend,
  friendRequest,
}: IProps) => {
  return (
    <Box sx={{ display: 'flex', gap: '50px' }}>
      <BioProfile
        name={name}
        image={image}
        description={description}
        email={email}
        phone={phone}
        address={address}
        birthdate={birthdate}
        gender={gender}
        mainUser={mainUser}
        friend={friend}
        friendRequest={friendRequest}
      />  
      <StoriesProfile mainUser={mainUser} stories={stories} />
 
    </Box>
  );
};

export default Profile;
