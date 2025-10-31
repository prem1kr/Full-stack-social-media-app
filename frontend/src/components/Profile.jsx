import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Chip,
  Tabs,
  Tab,
  Card,
  CardMedia,
  CardActionArea,
  Stack,
  IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useGetUserProfile from '@/hooks/useGetUserProfile';

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState('posts');

  const { userProfile, user } = useSelector((store) => store.auth);
  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isFollowing = false;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const displayedPost =
    activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <Container maxWidth="md" sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
      <Box width="100%">
        {/* --- Top Section --- */}
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4} textAlign="center">
            <Avatar
              src={userProfile?.profilePicture}
              alt={userProfile?.username}
              sx={{ width: 120, height: 120, margin: 'auto' }}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <Stack spacing={2}>
              {/* Username & Buttons */}
              <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
                <Typography variant="h6">{userProfile?.username}</Typography>
                {isLoggedInUserProfile ? (
                  <>
                    <Button component={Link} to="/account/edit" variant="outlined" size="small">
                      Edit profile
                    </Button>
                    <Button variant="outlined" size="small">
                      View archive
                    </Button>
                    <Button variant="outlined" size="small">
                      Ad tools
                    </Button>
                  </>
                ) : isFollowing ? (
                  <>
                    <Button variant="outlined" size="small">
                      Unfollow
                    </Button>
                    <Button variant="outlined" size="small">
                      Message
                    </Button>
                  </>
                ) : (
                  <Button variant="contained" size="small">
                    Follow
                  </Button>
                )}
              </Box>

              {/* Stats */}
              <Box display="flex" alignItems="center" gap={3}>
                <Typography variant="body2">
                  <strong>{userProfile?.posts?.length || 0}</strong> posts
                </Typography>
                <Typography variant="body2">
                  <strong>{userProfile?.followers?.length || 0}</strong> followers
                </Typography>
                <Typography variant="body2">
                  <strong>{userProfile?.following?.length || 0}</strong> following
                </Typography>
              </Box>

              {/* Bio */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {userProfile?.bio || 'Bio here...'}
                </Typography>
                <Chip
                  icon={<AlternateEmailIcon fontSize="small" />}
                  label={userProfile?.username}
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  🤯 Learn code with PK (MERN stack style)
                  <br />
                  🤯 Turning code into fun
                  <br />
                  🤯 DM for collaboration
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {/* --- Tabs --- */}
        <Box sx={{ borderTop: 1, borderColor: 'divider', mt: 5 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="POSTS" value="posts" />
            <Tab label="SAVED" value="saved" />
            <Tab label="REELS" value="reels" disabled />
            <Tab label="TAGS" value="tags" disabled />
          </Tabs>

          {/* --- Post Grid --- */}
          <Grid container spacing={1} sx={{ mt: 2 }}>
            {displayedPost?.map((post) => (
              <Grid item xs={12} sm={4} key={post?._id}>
                <Card
                  sx={{
                    position: 'relative',
                    '&:hover .overlay': { opacity: 1 },
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={post.image}
                      alt="postimage"
                      sx={{ aspectRatio: '1/1', objectFit: 'cover' }}
                    />
                    {/* Hover Overlay */}
                    <Box
                      className="overlay"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        bgcolor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 3,
                        opacity: 0,
                        transition: 'opacity 0.3s',
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={1} color="white">
                        <IconButton color="inherit" size="small">
                          <FavoriteIcon />
                        </IconButton>
                        <Typography>{post?.likes?.length}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1} color="white">
                        <IconButton color="inherit" size="small">
                          <ChatBubbleOutlineIcon />
                        </IconButton>
                        <Typography>{post?.comments?.length}</Typography>
                      </Box>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
