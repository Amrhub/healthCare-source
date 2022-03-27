import { Close, DeleteOutline } from '@mui/icons-material';
import BlockIcon from '@mui/icons-material/Block';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Badge,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

interface chattingPersonInterface {
  id: number;
  name: string;
  avatar: string;
  status: string;
}

const InfoSideBar = styled(Box)(({ isInfoOpen }: { isInfoOpen: boolean }) => ({
  width: '100%',
  height: '100%',
  maxWidth: isInfoOpen ? '390px' : '0px',
  backgroundColor: '#fff',
  padding: isInfoOpen ? '20px' : '0px',
  transition: 'all 0.2s ease-in-out',
  transform: isInfoOpen ? 'scaleX(1)' : 'scaleX(0)',
  transformOrigin: 'right',
}));

const BadgeTypography = styled(Typography)`
  position: relative;
  &::after {
    content: ' ';
    position: absolute;
    top: 35%;
    right: 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ theme, status }: { theme: any; status: any }) =>
      status === 'online' ? theme.palette.success.main : theme.palette.info.main};
  }
`;

const AccordionPrivacy = styled(Accordion)({
  '&::before': {
    content: 'none',
  },
});

const DMChatContainer = ({
  chattingPerson,
}: {
  chattingPerson: chattingPersonInterface;
}) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isPrivacyExpanded, setIsPrivacyExpanded] = useState(false);

  const handleOptionsClick = () => {
    setIsPrivacyExpanded((prev) => !prev);
  };

  const toggleIsInfoOpen = () => {
    setIsInfoOpen((prev) => !prev);
  };

  return (
    <>
      <Box
        sx={{
          color: 'common.white',
          flexGrow: '1',
          height: '75px',
          backgroundColor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          px: 3,
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Badge
                  overlap="circular"
                  variant="dot"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  color={chattingPerson.status === 'online' ? 'success' : 'info'}
                >
                  <Avatar
                    src={chattingPerson.avatar}
                    sx={{ width: '40px', height: '40px' }}
                  />
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={chattingPerson.name}
                secondary={chattingPerson.status}
                secondaryTypographyProps={{ color: 'white' }}
              />
            </ListItem>
          </List>
        </Box>
        <IconButton color="inherit" onClick={toggleIsInfoOpen}>
          <InfoOutlinedIcon />
        </IconButton>
      </Box>

      <InfoSideBar isInfoOpen={isInfoOpen}>
        <IconButton sx={{ color: 'grey.900' }} onClick={toggleIsInfoOpen}>
          <Close fontSize="medium" />
        </IconButton>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            src={chattingPerson.avatar}
            sx={{ width: '100px', height: '100px', mb: '18px' }}
          />
          <Typography variant="body1">{chattingPerson.name}</Typography>

          <BadgeTypography
            variant="body2"
            sx={{ color: 'grey.500', pr: 2 }}
            status={chattingPerson.status}
            theme={undefined}
          >
            {chattingPerson.status}
          </BadgeTypography>
        </Box>

        <AccordionPrivacy
          expanded={isPrivacyExpanded}
          onChange={handleOptionsClick}
          elevation={0}
          sx={{ mt: 3, color: 'grey.900' }}
        >
          <AccordionSummary
            sx={{ backgroundColor: 'grey.100', borderRadius: '10px' }}
            expandIcon={<ExpandMoreIcon color="inherit" />}
          >
            Privacy & support
          </AccordionSummary>
          <AccordionDetails
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
          >
            <Button startIcon={<BlockIcon />} color="error">
              Block
            </Button>
            <Button startIcon={<ReportGmailerrorredOutlinedIcon />} color="error">
              Report
            </Button>
            <Button startIcon={<DeleteOutline />} color="error">
              Delete Chat
            </Button>
          </AccordionDetails>
        </AccordionPrivacy>
      </InfoSideBar>
    </>
  );
};

export default DMChatContainer;
