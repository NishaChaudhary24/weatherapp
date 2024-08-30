import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';

import image from './Weather4.jpg';
import img from './Weathericon.png';
import profilePic from './Weather8.png';
import axios from "axios";

function Weather2() {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);


  // menu
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e) => {
    let name = e.target.name;
    setData({ ...data, [name]: e.target.value });
  };

  const handleClick = () => {
    // Loding
    setLoading(true);

    const apiKey = '81f1e88f79144fcf9ab70516240808';
    const City = data.City;

    if (City) {
      axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${City}&aqi=no`)
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Error", err);
          setLoading(false);
        });
    } else {
      alert("Please enter a city");
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? ( // loding code
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            color: '#fff',
            padding: '20px',
            position: 'relative',
            zIndex: 1,
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: -1,
            }
          }}
        >
          <Stack spacing={2} direction="row">
            <CircularProgress color="secondary" />
          </Stack>
        </Box>
      ) : (  // page code
        <Box
        // backgraung css
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            color: '#fff',
            padding: '20px',
            position: 'relative',
            zIndex: 1,
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: -1,
            }
          }}
        >
           {/* app bar code  */}
          {/* AppBar that stays fixed at the top  */}
          <AppBar position="fixed" sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
            boxShadow: '0 5px 8px rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(5px)',
            color: '#fff',
            alignItems:'center'
          }}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize:30 ,fontFamily:"" }}>
                Welcome to Weather App 
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {/* Replace AccountCircle with Avatar and profile picture */}
                <Avatar alt="weather8" src={profilePic} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {/* Menu items go here */}
              </Menu>
            </Toolbar>
          </AppBar>

          {/* Spacing added to push content below the AppBar */}
          <Box sx={{ mt: 8 }} />

 {/* TextField css */}
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& .MuiTextField-root': { m: 1, width: '25ch' },
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              color: 'white',
              width:'30ch',
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="filled-multiline-flexible"
              label="City"
              multiline
              maxRows={4}
              type="text"
              variant="filled"
              name="City"
              value={data.City || ''}
              onChange={handleChange}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
              }}
            />
{/* Button */}
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button variant="contained" color="grey" onClick={handleClick}>
                Check Weather
              </Button>
            </Stack>
          </Box>

{/* card code */}
          {data.location && data.current && (
            <Card sx={{ maxWidth: 345, width:'30ch', marginTop: '20px', mt: 4, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '8px', boxShadow: '0 5px 8px rgba(0, 0, 0, 0.3)' }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={img}
                />
                <CardContent>  
                  {/* hook na levo hoy to aa sidho  code data.loc.region jevu*/}
                  <Typography gutterBottom variant="h5" component="div" sx={{ color: 'white' }}>
                    Weather
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ color: 'white' }}>
                    Region: {data.location.region}
                    <br />
                    Country: {data.location.country}
                    <br />
                    Humidity: {data.current.humidity}
                    <br />
                    Temperature (C): {data.current.temp_c}
                    <br />
                    Temperature (F): {data.current.temp_f}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          )}
        </Box>
      )}
    </>
  );
}

export default Weather2;
