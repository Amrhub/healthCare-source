import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/configureStore'
import { createDeviceCategory, fetchDeviceCategories } from '../../redux/device/deviceCategoriesSlice';

interface IForm {
  name: string;
  items: string;
  price: number;
}

const DeviceCategory = () => {
  const { categories } = useAppSelector(state => state.deviceCategories);
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<IForm>({
    name: '',
    items: '',
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }


  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      createDeviceCategory({ device_name: form.name, device_items: form.items, price: form.price })
    );
    setForm({
      name: '',
      items: '',
      price: 0,
    })
  }

  useEffect(() => {
    dispatch(fetchDeviceCategories());
  }, []);
  return (
    <Stack p={6} justifyContent="center" alignItems="center" rowGap={4}>
      <Typography variant="h5">
        Create Device Category
      </Typography>
      <form onSubmit={submitHandler} style={{ maxWidth: '1000px', width: '100%' }}>
        <Stack columnGap={2} direction="row">
          <TextField
            label="Name"
            name='name'
            size="small"
            sx={{ flexGrow: 1 }}
            value={form.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Price"
            name='price'
            size="small"
            sx={{ flexGrow: 1 }}
            type={"number"}
            value={form.price}
            onChange={handleChange}
            required />
          <TextField
            label='Components'
            placeholder='ECG, Blood Pressure, etc.'
            name='items'
            size="small"
            sx={{ flexGrow: 1 }}
            value={form.items}
            onChange={handleChange}
            required />
          <Button type="submit" variant='contained'>Create</Button>
        </Stack>
      </form>
      {
        categories.length > 0 && (
          <>
            <Typography variant="h5">
              Device Categories
            </Typography>
            <TableContainer component={Paper} sx={{ maxWidth: '1000px', mx: 'auto', overflow: 'auto' }}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Device Category Name</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>ID</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Price</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Components</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map(({ id, items, name, price }) => (
                    <TableRow
                      key={id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {name}
                      </TableCell>
                      <TableCell align="right">{id}</TableCell>
                      <TableCell align="right">{price}</TableCell>
                      <TableCell align="right">{items}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )
      }
    </Stack>
  )
}

export default DeviceCategory