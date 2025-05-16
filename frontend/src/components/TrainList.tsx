import { FC } from 'react'
import Link from 'next/link'
import { Box, Paper, CardActionArea, CardContent, Typography, Stack, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Train } from '../types'

interface TrainListProps {
  trains: Train[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

const TrainList: FC<TrainListProps> = ({ trains, onEdit, onDelete }) => {
  if (!trains.length) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        No trains found.
      </Typography>
    )
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        p: 2,
      }}
    >
      {trains.map((train) => (
        <Paper
          key={train.id}
          elevation={3}
          sx={{
            position: 'relative',
            borderRadius: 2,
            overflow: 'hidden',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
            display: 'flex',
            flexDirection: 'column',
            minHeight: 200,
          }}
        >
          {/* Action buttons at top-right */}
          <Stack
            direction="row"
            spacing={1}
            sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
          >
            <IconButton
              size="small"
              onClick={() => onEdit(train.id)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onDelete(train.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>

          <CardActionArea
            component={Link}
            href={`/trains/${train.id}`}
            sx={{ flexGrow: 1, pt: 2 }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {train.name}
              </Typography>
              <Typography color="text.secondary">
                {train.from} → {train.to}
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mt: 2 }}
              >
                <Typography variant="caption" color="text.secondary">
                  Departs{' '}
                  {new Date(train.departure).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Arrives{' '}
                  {new Date(train.arrival).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Typography>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Paper>
      ))}
    </Box>
  )
}

export default TrainList