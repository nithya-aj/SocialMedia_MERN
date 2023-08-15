import { Grid } from '@mui/material'
import FriendsCard from 'components/widget/FriendsCard'
import React from 'react'

const Suggestions = () => {
  const suggestions = [
    { name: 'Suggestion 1', buttons: ['Follow', 'Ignore'] },
    { name: 'Suggestion 2', buttons: ['Follow', 'Ignore'] },
    { name: 'Suggestion 2', buttons: ['Follow', 'Ignore'] },
    { name: 'Suggestion 2', buttons: ['Follow', 'Ignore'] },
    { name: 'Suggestion 2', buttons: ['Follow', 'Ignore'] },
    { name: 'Suggestion 2', buttons: ['Follow', 'Ignore'] },
  ]
  return (
    <Grid container spacing={3}>
      {suggestions.map((friend, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <FriendsCard friend={friend} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Suggestions