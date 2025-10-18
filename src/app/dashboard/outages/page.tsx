'use client';
import { Card, CardContent, CardHeader, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import { TriangleAlert } from "lucide-react";

export default function OutagesPage() {
  const outages = [
    { id: "O-001", type: "Power", location: "Main Street", status: "Active", priority: "High" },
    { id: "O-002", type: "Gas", location: "Elm Avenue", status: "Active", priority: "Medium" },
    { id: "O-003", type: "Internet", location: "Oak Lane", status: "Resolved", priority: "Low" },
  ];

  const getStatusColor = (status: string) => {
    return status === "Active" ? "error" : "success";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'info';
      default: return 'default';
    }
  };

  const getPriorityVariant = (priority: string): 'filled' | 'outlined' => {
    return priority === 'High' ? 'filled' : 'outlined';
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 4 }}>
        Outage Management
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
              <TriangleAlert size={24} />
              <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                Current Outages
              </Typography>
            </Box>
          }
          sx={{ pb: 2 }}
        />
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          <TableContainer component={Paper} elevation={0}>
            <Table sx={{ minWidth: 650 }} aria-label="outages table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, backgroundColor: 'action.hover' }}>Outage ID</TableCell>
                  <TableCell sx={{ fontWeight: 600, backgroundColor: 'action.hover' }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600, backgroundColor: 'action.hover' }}>Location</TableCell>
                  <TableCell sx={{ fontWeight: 600, backgroundColor: 'action.hover' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600, backgroundColor: 'action.hover' }}>Priority</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {outages.map((outage) => (
                  <TableRow
                    key={outage.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      transition: 'background-color 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                      {outage.id}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={outage.type}
                        size="small"
                        variant="outlined"
                        sx={{
                          fontWeight: 500,
                          minWidth: 80,
                        }}
                      />
                    </TableCell>
                    <TableCell>{outage.location}</TableCell>
                    <TableCell>
                      <Chip
                        label={outage.status}
                        color={getStatusColor(outage.status)}
                        variant={outage.status === "Active" ? "filled" : "outlined"}
                        size="small"
                        sx={{
                          fontWeight: 500,
                          minWidth: 80,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={outage.priority}
                        color={getPriorityColor(outage.priority)}
                        variant={getPriorityVariant(outage.priority)}
                        size="small"
                        sx={{
                          fontWeight: 500,
                          minWidth: 80,
                        }}
                      />
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