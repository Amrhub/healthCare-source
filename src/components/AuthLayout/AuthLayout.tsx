import { AutoStories, ExpandMore, HistoryToggleOff } from '@mui/icons-material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GroupsIcon from '@mui/icons-material/Groups';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import StoreIcon from '@mui/icons-material/Store';
import { Avatar, Container, IconButton, ListItem, List, Menu } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { BRAND_NAME } from '../../abstracts/common';
import MyNavLink from '../../abstracts/NavLink';
// import { logoutUser } from '../../redux/users/users';
import { userRoutes } from '../../Routes/Routes';

const drawerWidth = 240;
const drawerWidthClosedDesktop = 100 / 8;
const drawerWidthClosedMobile = 60 / 8;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(drawerWidthClosedMobile)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(drawerWidthClosedDesktop)} + 1px)`,
  },
});

const DrawerHeader = styled('div')<any>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state: any) => state.users.authUserInfo);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(
    null,
  );

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogOut = () => {
    // logoutUser();
    navigate('/');
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleLogOut}>Log out</MenuItem>
    </Menu>
  );

  const userSideBar = [
    { text: 'Home', component: <HomeSharpIcon />, path: userRoutes.home },
    { text: 'Profile', component: <PersonIcon />, path: userRoutes.profile.main },
    { text: 'History', component: <HistoryToggleOff />, path: userRoutes.reportHistory },
    { text: 'Community', component: <GroupsIcon />, path: userRoutes.community.index },
    { text: 'Stories', component: <AutoStories />, path: userRoutes.stories.index },
    {
      text: 'Membership',
      component: <StoreIcon />,
      path: userRoutes.membership,
    },
  ];

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      id={mobileMenuId}
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <MyNavLink to={userRoutes.chat}>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            sx={{ color: 'grey.900' }}
          >
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
        </MyNavLink>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          sx={{ color: 'grey.900' }}
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <CssBaseline />
      <AppBar
        elevation={0}
        position="fixed"
        open={open}
        sx={{ backgroundColor: 'white' }}
        color="default"
      >
        <Toolbar sx={{ pl: { xs: '4px', md: '24px' } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={handleDrawerOpen}
            aria-label="open drawer"
            sx={{
              marginRight: '36px',
              ml: '0px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ display: 'block' }}>
            {BRAND_NAME}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <MyNavLink to={userRoutes.chat} sx={{ height: '24px' }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                sx={{ color: 'grey.900' }}
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
            </MyNavLink>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              sx={{ color: 'grey.900' }}
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Container sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Avatar src={user.avatar} alt="avatar" />
              <Typography>{user.name}</Typography>
            </Container>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              sx={{ color: 'grey.900' }}
            >
              <ExpandMore />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              sx={{ color: 'grey.900' }}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ backgroundColor: 'white' }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>

        <List sx={{ backgroundColor: 'white', height: '100%' }}>
          {userSideBar.map(({ text, component, path }, index) => (
            <MyNavLink to={path} key={text} end={index == 0 ? true : false}>
              {({ isActive }) => (
                <ListItem
                  button
                  sx={{
                    display: 'flex',
                    paddingInline: `calc((${theme.spacing(
                      drawerWidthClosedMobile,
                    )} + +1px - 50px) / 2)`,
                    [theme.breakpoints.up('sm')]: {
                      paddingInline: `calc((${theme.spacing(
                        drawerWidthClosedDesktop,
                      )} + +1px - 70px) / 2)`,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      borderRadius: '10px',
                      backgroundColor: isActive ? 'primary.main' : 'grey.100',
                      color: !isActive ? 'grey.500' : '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '50px',
                      aspectRatio: '1/1',
                      boxShadow: isActive ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : 'none',
                      [theme.breakpoints.up('sm')]: {
                        width: '70px',
                      },
                    }}
                  >
                    {component}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={{
                      color: isActive ? 'primary.dark' : 'grey.900',
                      ml: 1,
                      [theme.breakpoints.up('sm')]: {
                        ml: 2,
                      },
                    }}
                  />
                </ListItem>
              )}
            </MyNavLink>
          ))}
        </List>
      </Drawer>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%' }}
      >
        <DrawerHeader />
        <Box
          component="main"
          sx={{ flexGrow: 1, height: '100%', backgroundColor: 'grey.100' }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
