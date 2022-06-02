import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, Grid, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'

import deviceImg from '../../assets/devices/device_img.svg';

interface IProps {
  name: string
  components: string[]
  price: string
}


const Device = ({ name, components, price }: IProps) => {
  return (
    <Grid item xs={6}>
      <Stack direction='row' sx={{ bgcolor: 'background.paper', borderRadius: 1, height: '100%', boxShadow: 4, py: 4, px: 6 }}>
        <Stack alignItems="flex-start" flexGrow={1}>
          <Typography variant="h4" color="primary">
            {name}
          </Typography>
          <List>
            {
              components.map((component, index) => (
                <ListItem key={index}>
                  <ListItemIcon sx={{ color: 'grey.900', minWidth: '30px' }}>
                    <CheckCircleIcon color='inherit' />
                  </ListItemIcon>
                  <ListItemText>
                    {component}
                  </ListItemText>
                </ListItem>
              ))
            }
          </List>
          {/* TODO: make it link to FAQ how to use this device */}
          <Typography color="secondary" sx={{ mb: 2 }}>
            How to use the device?
          </Typography>
          <Stack columnGap={2} direction="row" sx={{ mt: 'auto' }}>
            <Typography variant="h5" color="initial" sx={{ fontWeight: '700' }}>
              {price}
            </Typography>
            <Button variant="contained" color="primary">
              Buy Now
            </Button>
          </Stack>
        </Stack>
        <img src={deviceImg} alt="device" style={{ height: '250px', aspectRatio: '1/1', marginBlock: 'auto' }} />
      </Stack>
    </Grid>
  )
}

export default Device