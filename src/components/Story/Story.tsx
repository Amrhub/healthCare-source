import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Avatar, Menu, MenuItem, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/system';
import { useState } from 'react';
const Story = ({ story }: { story: any }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const user = story.user;

  const handleClick = (e: any) => {
    setOpen((prev) => !prev);
    setAnchorEl(e.currentTarget);
  };
  return (
    <Box sx={{ boxShadow: 4, borderRadius: '16px' }}>
      <Avatar alt="profile pic" src={user.avatar} />
      <Typography variant="body1" sx={{ fontWeight: 700 }}>
        {user.name}
      </Typography>
      <Typography variant="body2" sx={{ color: 'grey.500' }}>
        {story.category}
      </Typography>
      <IconButton>
        <ExpandMoreIcon onClick={handleClick} />
      </IconButton>
      <Menu open={open} onClose={handleClick} anchorEl={anchorEl}>
        <MenuItem onClick={handleClick}>
          <ModeEditIcon sx={{ mr: 1 }} />
          Edit Story
        </MenuItem>
        <MenuItem onClick={handleClick}>
          <DeleteOutlinedIcon sx={{ mr: 1 }} />
          Remove Story
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Story;
