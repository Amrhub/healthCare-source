import { Box, styled } from '@mui/system';

import MyNavLink from '../../abstracts/NavLink';

export const ContainerBoxNavLink = styled(MyNavLink)`
  font-weight: 700;
  padding-bottom: 4px;
  height: max-content;
`;

const ContainerBoxNav = ({ children }: { children: any }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: { lg: '30px' },
        mb: 3,
        alignItems: 'center',
      }}
      className="boxContainerNav"
    >
      {children}
    </Box>
  );
};

export default ContainerBoxNav;
