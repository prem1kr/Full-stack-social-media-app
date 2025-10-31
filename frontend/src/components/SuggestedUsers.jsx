import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Typography,
  Box,
  Button,
  Stack
} from '@mui/material';

const SuggestedUsers = () => {
  const { suggestedUsers } = useSelector(store => store.auth);

  return (
    <Box my={4}>
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="subtitle1" fontWeight="600" color="text.secondary">
          Suggested for you
        </Typography>
        <Typography
          variant="body2"
          fontWeight="500"
          color="primary"
          sx={{ cursor: 'pointer' }}
        >
          See All
        </Typography>
      </Box>

      {/* Suggested Users List */}
      {suggestedUsers.map((user) => (
        <Box
          key={user._id}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Link to={`/profile/${user?._id}`}>
              <Avatar
                src={user?.profilePicture}
                alt={user?.username || 'User'}
                sx={{ width: 40, height: 40 }}
              />
            </Link>
            <Box>
              <Typography
                variant="body2"
                fontWeight="600"
                component={Link}
                to={`/profile/${user?._id}`}
                sx={{
                  textDecoration: 'none',
                  color: 'text.primary',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                {user?.username}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.bio || 'Bio here...'}
              </Typography>
            </Box>
          </Stack>

          <Button
            size="small"
            variant="text"
            sx={{
              color: '#3BADF8',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': { color: '#3495d6' }
            }}
          >
            Follow
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default SuggestedUsers;
