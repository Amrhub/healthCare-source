import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

import Story from '../../components/Story/Story';
import ContainerBox from '../../layouts/ContainerBox';

const Stories = () => {
  const [userOne, userTwo] = useSelector((state: any) => state.users.users);

  const stories = [
    {
      id: 1,
      category: 'covid-19',
      content:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus corporis dolores laudantium quis. Eveniet, molestias? Dolorem, nisi iste! Pariatur, officiis?',
      user: userOne,
    },
    {
      id: 2,
      user: userTwo,
      category: 'cancer',
      content:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus corporis dolores laudantium quis. Eveniet, molestias? Dolorem, nisi iste! Pariatur, officiis?',
    },
  ];
  return (
    <ContainerBox>
      <h1>Hello World</h1>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {stories?.map((story: any) => (
          <Story key={story.id} story={story} />
        ))}
      </Box>
    </ContainerBox>
  );
};

export default Stories;
