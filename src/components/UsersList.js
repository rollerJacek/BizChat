import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Skeleton,
  Alert
} from '@mui/material';

const UsersList = ({ users, loading, error, sx }) => {
  return (
    <Box sx={{
      ...sx,
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      <Typography variant="h6" sx={{
        p: 2,
        fontWeight: 'bold',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        Czaty
      </Typography>

      {error && (
        <Alert severity="error" sx={{ m: 2 }}>
          {error}
        </Alert>
      )}

      <List sx={{ 
        flex: 1, 
        overflowY: 'auto',
        '&::-webkit-scrollbar': { width: '8px' },
        '&::-webkit-scrollbar-thumb': { bgcolor: 'divider' }
      }}>
        {loading ? (
          Array(5).fill().map((_, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Skeleton variant="circular" width={40} height={40} />
              </ListItemAvatar>
              <ListItemText
                primary={<Skeleton variant="text" width={120} />}
              />
            </ListItem>
          ))
        ) : (
          users.map(user => (
            <ListItem 
              key={user.id}
              sx={{
                '&:hover': { bgcolor: 'action.hover' },
                transition: 'background-color 0.2s'
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ 
                  bgcolor: 'primary.main'
                }}>
                  {user.username[0].toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user.username}
                primaryTypographyProps={{
                  fontWeight: 'medium',
                  noWrap: true
                }}
                secondary={user.isOnline ? 'Online' : 'Offline'}
                secondaryTypographyProps={{
                  color: user.isOnline ? 'success.main' : 'text.secondary',
                  fontSize: '0.75rem'
                }}
              />
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
};

export default UsersList;