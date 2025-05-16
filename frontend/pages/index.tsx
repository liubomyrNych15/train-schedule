import { FC, useContext, useState } from 'react'
import useSWR from 'swr'
import { Typography, CircularProgress, Box } from '@mui/material'
import Layout from '../src/components/Layout'
import SearchBar from '../src/components/SearchBar'
import TrainList from '../src/components/TrainList'
import { AuthContext } from '../src/context/AuthContext'
import api from '../src/services/api'
import { QueryTrainsDto, Train } from '../src/types'

const Home: FC = () => {
  const auth = useContext(AuthContext)!
  const [search, setSearch] = useState<string>('')
  const [params, setParams] = useState<QueryTrainsDto>({})

  const handleSearch = (q: string) => {
    setSearch(q)
    setParams((p) => ({ ...p, search: q }))
  }

  const fetchTrains = () =>
    api.get('/trains', {
      params,
      headers: { Authorization: `Bearer ${auth.token}` },
    }).then((r) => r.data.data)

  const { data: trains, error, mutate } = useSWR<Train[]>(
    auth.token ? ['/trains', params] : null,
    fetchTrains
  )

  const handleDelete = async (id: string) => {
    await api.delete(`/trains/${id}`, {
      headers: { Authorization: `Bearer ${auth.token}` },
    })
    mutate()
  }

  const handleEdit = (id: string) => {
    window.location.href = `/trains/${id}`
  }

  if (!auth.token) {
    return (
      <Layout>
        <Typography variant="h6" align="center" sx={{ mt: 8 }}>
          🔒 Please log in to view trains.
        </Typography>
      </Layout>
    )
  }

  return (
    <Layout>
      <SearchBar value={search} onSearch={handleSearch} />

      {error ? (
        <Typography variant="h6" color="error" align="center">
          Failed to load trains.
        </Typography>
      ) : !trains ? (
        <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TrainList trains={trains} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </Layout>
  )
}

export default Home