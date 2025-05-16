import { FC } from 'react'
import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface SearchBarProps {
  value: string
  onSearch: (q: string) => void
}

const SearchBar: FC<SearchBarProps> = ({ value, onSearch }) => (
  <TextField
    fullWidth              
    value={value}
    onChange={(e) => onSearch(e.target.value)}
    placeholder="Search trains..."
    variant="outlined"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
    sx={{ mt: 2, mb: 3 }}   
  />
)

export default SearchBar
