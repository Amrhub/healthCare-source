import { Grid } from '@mui/material';

import Device from '../../components/Device/Device';

const devices = [
  {
    id: 1,
    name: 'Device 1',
    components: [
      'Lorem ipsum dolor sit amet.',
    ],
    price: '300 L.E'
  },
  {
    id: 2,
    name: 'Device 2',
    components: [
      'Lorem ipsum dolor sit amet.',
      'Lorem ipsum dolor sit amet.',
    ],
    price: '400 L.E'
  },
  {
    id: 3,
    name: 'Device 3',
    components: [
      'Lorem ipsum dolor sit amet.',
      'Lorem ipsum dolor sit amet.',
      'Lorem ipsum dolor sit amet.',
    ],
    price: '600 L.E'
  },
  {
    id: 4,
    name: 'Device 4',
    components: [
      'Lorem ipsum dolor sit amet.',
      'Lorem ipsum dolor sit amet.',
      'Lorem ipsum dolor sit amet.',
      'Lorem ipsum dolor sit amet.',
      'Lorem ipsum dolor sit amet.',
    ],
    price: '950 L.E'
  },
];

const Devices = () => {
  return (
    <Grid container spacing={3}>
      {
        devices.map(device => (
          <Device
            name={device.name}
            components={device.components}
            price={device.price}
          />
        ))
      }
    </Grid>
  )
}

export default Devices;