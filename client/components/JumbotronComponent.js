import React from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  bgImg: {
    backgroundImage: 'url(/photosquat-cropped.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: 'auto',
    height: '200px',
  },
  textContainer: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 'inherit',
  },
  fgText: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const Photojumbo = (props) => {
  const classes = useStyles(props);
  const theme = useTheme();
  const smAndUp = useMediaQuery(theme.breakpoints.up('sm'));
  console.log('Are we small or larger? ', smAndUp);

  return (
    <Container maxWidth="md">
      <Paper className={classes.bgImg}>
        <Grid container className={classes.textContainer}>
          <Grid item sm={4} xs={6}>
            <Paper className={classes.fgText} align="center" elevation={20}>
              <Box p={3}>
                <Typography variant="h6">Ytterblog</Typography>
                {smAndUp && (
                  <Typography variant="subtitle1">
                    A blog and demonstration app by Gabriel Ytterberg
                  </Typography>
                )}
              </Box>
            </Paper>
          </Grid>
          {smAndUp && <Grid item xs={2}></Grid>}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Photojumbo;
