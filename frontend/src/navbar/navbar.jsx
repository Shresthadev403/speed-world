import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { logout } from '../controllers/userController';
import { Link } from 'react-router-dom';

const pages = ['Products', 'About','Contact'];
const settings = ['Profile', 'MyOrders', 'Logout'];


function Navbar  (props) {
  const {isLoggedIn,changeLoginStatus,isAdmin}=props;
  const [user,setUser]=React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  //const[isLogin,SetIsLogin]=React.useState(false);
  const navigate=useNavigate();


  const handleOpenNavMenu = (event) => {
    
    setAnchorElNav(event.currentTarget);
    
  };
  const handleOpenUserMenu = (event) => {
    if(!isLoggedIn){
      navigate('/login');
    }else{
      setAnchorElUser(event.currentTarget);
    }
   
  };

  const handleCloseNavMenu = (event) => {
    setAnchorElNav(null);
   console.log(event.currentTarget.getAttribute("name"));
  const name=event.currentTarget.getAttribute("name");
  if(name){
    navigate(`/${name}`);
  }
  };

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
   console.log(event.currentTarget.getAttribute("name"));
    const name=event.currentTarget.getAttribute("name");
    if(name=='Logout'){
      logout().then(data=>{
      //  console.log(data,"logut");
        changeLoginStatus(false);
        localStorage.clear("user");
        navigate('/Login');
      });
    }
    if(name){
      navigate(`/${name}`);
    }
    
  };

  React.useEffect(()=>{
   
  
    setUser(JSON.parse(localStorage.getItem('user')));
   
   
  },[isLoggedIn]);


console.log(isLoggedIn,"mmmmmmmmmmmmm");


  return (
    <AppBar position="static" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Link to='/' style={{textDecoration:"none",color:"wheat"}}>Logo</Link>
            
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              { pages.map((page) => (
                <MenuItem key={page} name={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <Link to='/' style={{textDecoration:"none",color:"wheat"}}>Logo</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                name={page}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='avatar' src={user?user.avatar.image_url:""} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >  
            {
              isAdmin &&  <MenuItem key={'Dashboard'} name={'Dashboard'} onClick={handleCloseUserMenu}>Dashboard</MenuItem>
            }
              {isLoggedIn && settings.map((setting) => (
                <MenuItem key={setting} name={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
