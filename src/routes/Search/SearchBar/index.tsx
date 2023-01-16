import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const SearchBar = () => {
  return (
    <Paper component='form' sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
      <FormControl>
        <InputLabel id='demo-simple-select-label'>Filter</InputLabel>
        <Select labelId='demo-simple-select-label' id='demo-simple-select' label='Age'>
          <MenuItem value='movie'>Movie</MenuItem>
          <MenuItem value='tv'>TV</MenuItem>
          <MenuItem value='people'>People</MenuItem>
        </Select>
      </FormControl>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder='Search Google Maps'
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type='button' sx={{ p: '10px' }} aria-label='search'>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
