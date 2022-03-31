import AddIcon from '@mui/icons-material/Add';
import { Box, Divider, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import ContainerBox from '../../layouts/ContainerBox/ContainerBox';
import ContainerBoxNav, {
  ContainerBoxNavLink,
} from '../../layouts/ContainerBox/ContainerBoxNav';
import { userRoutes } from '../../Routes/Routes';

import AllStories from './AllStories';
import MyStories from './MyStories';

const Stories = () => {
  const [userOne, userTwo] = useSelector((state: any) => state.users.users);
  const location = useLocation();

  const stories = [
    {
      id: 1,
      category: 'covid-19',
      content:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus corporis dolores laudantium quis. Eveniet, molestias? Dolorem, nisi iste! Pariatur, officiis?...',
      user: userOne,
      commentsCounter: 2,
      likesCounter: 3,
    },
    {
      id: 2,
      user: userTwo,
      category: 'cancer',
      content:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus corporis dolores laudantium quis. Eveniet, molestias? Dolorem, nisi iste! Pariatur, officiis?...',
      commentsCounter: 5,
      likesCounter: 9,
    },
  ];

  const renderChildren = () => {
    const { pathname } = location;

    switch (pathname) {
      case userRoutes.stories.index:
        return <AllStories stories={stories} />;
      case userRoutes.stories.myStories:
        return <MyStories stories={stories} />;
      default:
        return null;
    }
  };
  return (
    <ContainerBox>
      <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
        <ContainerBoxNav>
          <ContainerBoxNavLink end to={userRoutes.stories.index}>
            Stories
          </ContainerBoxNavLink>
          <ContainerBoxNavLink to={userRoutes.stories.myStories}>
            My Stories
          </ContainerBoxNavLink>
        </ContainerBoxNav>
        <Divider
          sx={{
            bgcolor: 'grey.900',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            mb: 3,
          }}
        />
        {renderChildren()}
        <IconButton
          children={<AddIcon fontSize="large" />}
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            ':hover': {
              bgcolor: 'primary.main',
            },
            position: 'absolute',
            bottom: '1rem',
            right: '-1rem',
          }}
        />
      </Box>
    </ContainerBox>
  );
};

export default Stories;
