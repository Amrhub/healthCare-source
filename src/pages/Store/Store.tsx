import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, styled, Tab } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { userRoutes } from '../../Routes/Routes';

import Devices from './Devices';
import Memberships from './Memberships';
import RelatedProducts from './RelatedProducts';

const StyledTab = styled(Tab)`
  font-size: 18px;
`

const StyledTabPanel = styled(TabPanel)`
  height: 100%;
`

const Store = () => {
  const { tab } = useParams();
  const [selectedTab, setSelectedTab] = useState(tab || 'memberships');
  const navigate = useNavigate();

  const handleTabChange = (event: any, value: string) => {
    setSelectedTab(value);
    navigate(`${userRoutes.store}/${value}`);
  }
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <TabContext value={selectedTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <StyledTab label="Memberships" value="memberships" />
            <StyledTab label="Devices" value="devices" />
            <StyledTab label="Related Products" value="related_products" />
          </TabList>
        </Box>
        <StyledTabPanel value="memberships">
          <Memberships />
        </StyledTabPanel>
        <StyledTabPanel value="devices">
          <Devices />
        </StyledTabPanel>
        <StyledTabPanel value="related_products">
          <RelatedProducts />
        </StyledTabPanel>
      </TabContext>
    </Box>
  );
};

export default Store;
