'use client';
import { Card, CardContent, CardHeader, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import { Truck } from "lucide-react";

export default function CrewsPage() {
  const crews = [
    { id: "C-001", name: "Alpha Team", status: "Available", currentTask: "None" },
    { id: "C-002", name: "Bravo Team", status: "Dispatched", currentTask: "Power Outage - Main St" },
    { id: "C-003", name: "Charlie Team", status: "Busy", currentTask: "Gas Leak - Elm Ave" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'success';
      case 'Dispatched': return 'info';
      case 'Busy': return 'warning';
      default: return 'default';
    }
  };

  const getStatusVariant = (status: string): 'filled' | 'outlined' => {
    switch (status) {
      case 'Available': return 'filled';
      case 'Dispatched': return 'outlined';
      case 'Busy': return 'filled';
      default: return 'outlined';
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 4 }}>
        Crew Management
      </Typography>
      
      <Card
        sx={{
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: 6,
          },
        }}
      >
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Truck size={24} />
              <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                Current Crews
              </Typography>
            </Box>
          }
          sx={{ pb: 2 }}
        />
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          <TableContainer component={Paper} elevation={0}>
            <Table sx={{ minWidth: 650 }} aria-label="crews table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, backgroundColor: 'action.hover' }}>Crew ID</TableCell>
                  <TableCell sx={{ fontWeight: 600, backgroundColor: 'action.hover' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600, backgroundColor: 'action.hover' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600, backgroundColor: 'action.hover' }}>Current Task</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {crews.map((crew) => (
                  <TableRow
                    key={crew.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      transition: 'background-color 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                      {crew.id}
                    </TableCell>
                    <TableCell>{crew.name}</TableCell>
                    <TableCell>
                      <Chip
                        label={crew.status}
                        color={getStatusColor(crew.status)}
                        variant={getStatusVariant(crew.status)}
                        size="small"
                        sx={{
                          fontWeight: 500,
                          minWidth: 80,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          color: crew.currentTask === 'None' ? 'text.secondary' : 'text.primary',
                          fontStyle: crew.currentTask === 'None' ? 'italic' : 'normal'
                        }}
                      >
                        {crew.currentTask}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}