import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';

import Story from '../../components/Story/Story';
import { useAppSelector } from '../../redux/configureStore';
import { StoryType } from '../../redux/stories/storySlice';

const AllStories = ({ posts, search = '' }: { posts?: StoryType[], search?: string }) => {
  const { stories } = useAppSelector((state) => state.posts);
  const [filteredPosts, setFilteredPosts] = useState<StoryType[]>();

  useEffect(() => {
    if (!search) return setFilteredPosts(stories || posts);

    if (stories.length > 0) {
      setFilteredPosts(stories.filter(({ category }) => category && category.toLowerCase().includes(search.toLowerCase())));
    }
    if (posts) {
      setFilteredPosts(posts.filter(({ category }) => category && category.toLowerCase().includes(search.toLowerCase())));
    }
  }, [search])
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {
        posts !== undefined ? (
          posts.length > 0 ? (posts?.map((story: any) => (
            <Story key={story.id} story={story} />
          ))) : (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1">
                No stories yet.
              </Typography>
            </Box>
          )) : filteredPosts ? (
            filteredPosts.map((story) => (
              <Story key={story.id} story={story} />
            ))
          ) : (
          stories.length > 0 ? (stories?.map((story) => (
            <Story key={story.id} story={story} />
          ))) : (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1">
                No stories yet.
              </Typography>
            </Box>
          )
        )

      }
    </Box>
  );
};

export default AllStories;
