import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { StyledProvider, Footer } from 'components-extra';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/landingPage/Logo.png';

import myTheme, { CustomBackToTop } from './extraComponentsTheme';

const FooterLayout = () => {
  
  const FooterItem = styled(Typography)`
    color: ${({ theme }) => theme.palette.text.primary};
    font-weight: 700;
  `; 

  return (
    <StyledProvider theme={myTheme}>
      <Footer>
        <Footer.Column isInline>
          <Footer.Item>
            <Box
              component="img"
              sx={{
                height: '61px',
                width: '317px',
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt="logo"
              src={logo}
            />
          </Footer.Item>
          <Footer.Item href="#">
            <NavLink to="/about/about-us" style={{ textDecoration: 'none' }}>
              <FooterItem variant="h6">About Us</FooterItem>
            </NavLink>
          </Footer.Item>
          <Footer.Item href="#">
            <NavLink to="/about/our-team" style={{ textDecoration: 'none' }}>
              <FooterItem variant="h6">Our Team</FooterItem>
            </NavLink>
          </Footer.Item>
          <Footer.Item href="#">
            <FooterItem variant="h6">Membership</FooterItem>
          </Footer.Item>
          <Footer.Item href="#">
            <FooterItem variant="h6">Specialties</FooterItem>
          </Footer.Item>
          <Footer.Item href="#">
            <FooterItem variant="h6">Help</FooterItem>
          </Footer.Item>
        </Footer.Column>
      </Footer>
      <CustomBackToTop color="secondary" />
    </StyledProvider>
  );
};

export default FooterLayout;
