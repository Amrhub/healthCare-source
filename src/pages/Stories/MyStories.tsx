import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';

import Story from '../../components/Story/Story';
import { useAppDispatch, useAppSelector } from '../../redux/configureStore';
import { getMyStories, StoryType } from '../../redux/stories/storySlice';

const MyStories = ({
  handleEditStory,
  search
}: {
  handleEditStory: (content: string, category: string, storyId: number) => void;
  search?: string;
  isProfileView?: boolean;
}) => {
  const stories = useAppSelector((state) => state.posts.myStories);
  const currentUserId = useAppSelector((state) => state.user.userInfo.id);
  const dispatch = useAppDispatch();
  const [filteredPosts, setFilteredPosts] = useState<StoryType[]>();

  useEffect(() => {
    dispatch(getMyStories(currentUserId));
  }, [dispatch, getMyStories]);

  useEffect(() => {
    if (!search) return setFilteredPosts(stories);
    if (stories.length > 0) {
      setFilteredPosts(stories.filter(({ category }) => category && category.toLowerCase().includes(search.toLowerCase())));
    }

  }, [search, stories])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {filteredPosts ?
        (
          filteredPosts.map((story) => (
            <Story key={story.id} story={story} handleEditStory={handleEditStory} />
          ))
        ) :
        stories.length > 0 ?
          (
            stories?.map((story: any) => (
              <Story key={story.id} story={story} handleEditStory={handleEditStory} />
            ))
          )
          :
          (
            <Typography variant="body1" align='center'>
              No stories yet.
            </Typography>
          )
      }
    </Box>
  );
};

export default MyStories;
