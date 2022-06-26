import AddIcon from '@mui/icons-material/Add';
import { Box, Divider, IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import StoryModal from '../../components/StoryModal/StoryModal';
import ContainerBox from '../../layouts/ContainerBox/ContainerBox';
import ContainerBoxNav, {
  ContainerBoxNavLink,
} from '../../layouts/ContainerBox/ContainerBoxNav';
import { userRoutes } from '../../Routes/Routes';

import AllStories from './AllStories';
import MyStories from './MyStories';

const Stories = () => {
  const [openModal, setOpenModal] = useState(false);
  const [storyContent, setStoryContent] = useState('');
  const [storyCategory, setStoryCategory] = useState('');
  const [storyId, setStoryId] = useState<number>();
  const [categorySearch, setCategorySearch] = useState('');
  const location = useLocation();

  const handleEditStory = (content: string, category: string, storyId: number) => {
    setStoryContent(content);
    setStoryCategory(category);
    setStoryId(storyId);
    setOpenModal(true);
  };

  const addStoryClickHandler = () => {
    setStoryContent('');
    setStoryCategory('');
    setOpenModal(true);
  };

  const renderChildren = () => {
    const { pathname } = location;

    switch (pathname) {
      case userRoutes.stories.index:
        return <AllStories search={categorySearch} />;
      case userRoutes.stories.myStories:
        return <MyStories handleEditStory={handleEditStory} search={categorySearch} />;
      default:
        return null;
    }
  };

  return (
    <ContainerBox>
      <Box sx={{ height: '100%', width: '100%' }}>
        <ContainerBoxNav>
          <ContainerBoxNavLink end to={userRoutes.stories.index}>
            Stories
          </ContainerBoxNavLink>
          <ContainerBoxNavLink to={userRoutes.stories.myStories}>
            My Stories
          </ContainerBoxNavLink>
          <TextField sx={{ marginInlineStart: 'auto' }} placeholder="covid-19" label="story category" size="small" onChange={e => setCategorySearch(e.target.value)} value={categorySearch} />
        </ContainerBoxNav>
        <Divider
          sx={{
            bgcolor: 'grey.900',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          }}
        />
        <Box sx={{ py: 3 }}>
          {renderChildren()}
        </Box>
        <StoryModal
          open={openModal}
          setOpen={setOpenModal}
          content={storyContent}
          category={storyCategory}
          storyId={storyId}
        />
      </Box>

      <IconButton
        children={<AddIcon fontSize="large" />}
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          ':hover': {
            bgcolor: 'primary.main',
          },
          position: 'fixed',
          bottom: '5rem',
          right: '27rem',
        }}
        onClick={() => {
          addStoryClickHandler();
        }}
      />
    </ContainerBox>
  );
};

export default Stories;
