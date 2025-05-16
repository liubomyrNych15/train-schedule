import { FC } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { Box, CircularProgress, Typography } from '@mui/material'
import Layout from '../../src/components/Layout'
import TrainForm from '../../src/components/TrainForm'
import api from '../../src/services/api'
import { Train } from '../../src/types'

const TrainDetail: FC = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, error } = useSWR<Train>(
    () => (id ? `/trains/${id}` : null),
    () => api.get(`/trains/${id}`).then((r) => r.data.data)
  )

  if (error) {
    return (
      <Layout>
        <Typography variant="h6" color="error" align="center" sx={{ mt: 8 }}>
          Error loading train.
        </Typography>
      </Layout>
    )
  }
  if (!data) {
    return (
      <Layout>
        <Box display="flex" justifyContent="center" sx={{ mt: 8 }}>
          <CircularProgress />
        </Box>
      </Layout>
    )
  }

  const handleSave = async (update: Partial<Train>) => {
    await api.patch(`/trains/${id}`, update)
    router.push('/')
  }

  return (
    <Layout>
      <TrainForm initial={data} onSubmit={handleSave} />
    </Layout>
  )
}

export default TrainDetail