import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { Train } from '../types'

export default function TrainForm({
  initial,
  onSubmit,
}: {
  initial?: Train
  onSubmit: (data: Partial<Train>) => Promise<void>
}) {
  const [form, setForm] = useState<Partial<Train>>(initial || {})

  useEffect(() => {
    if (initial) setForm(initial)
  }, [initial])

  const handleChange =
    (key: keyof Train) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))

  return (
    <Stack spacing={2} component="form" onSubmit={(e) => {
      e.preventDefault()
      onSubmit(form)
    }}>
      <TextField
        label="Name"
        value={form.name || ''}
        onChange={handleChange('name')}
        required
      />
      <TextField
        label="From"
        value={form.from || ''}
        onChange={handleChange('from')}
        required
      />
      <TextField
        label="To"
        value={form.to || ''}
        onChange={handleChange('to')}
        required
      />
      <TextField
        label="Departure"
        type="datetime-local"
        value={form.departure?.slice(0, 16) || ''}
        onChange={handleChange('departure')}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="Arrival"
        type="datetime-local"
        value={form.arrival?.slice(0, 16) || ''}
        onChange={handleChange('arrival')}
        InputLabelProps={{ shrink: true }}
        required
      />
      <Button variant="contained" type="submit">
        Save
      </Button>
    </Stack>
  )
}