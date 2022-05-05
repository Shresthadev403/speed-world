import './footer.css'

import {Link} from 'react-router-dom'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import CopyrightIcon from '@mui/icons-material/Copyright';
function Footer() {
    return ( <footer id='footer'>
       
       <div className='address-info'>
       <div className='social-icons'>
          <a href="https://www.instagram.com/speedworld_helmets/" target="_blank"> <InstagramIcon sx={{color:"#ffc119"}}/></a>
         <a href="https://www.facebook.com/search/top?q=speedworld_helmets" target="_blank"> <FacebookIcon sx={{color:"#ffc119"}}/></a>
          
       </div>
       <div>
       <Link to="/privacypolicy" style={{color:"#ffc119"}}>privacy policy</Link>
       </div>
      
           <Link to="/termsandconditions" style={{color:"#ffc119"}}>terms and condition</Link>
           <div style={{display:"flex",justifyContent:"center",flexDirection:"row"}}>
               <div >
               <CopyrightIcon fontSize='small'  sx={{color:"#ffc119"}}/>
               </div>
  
              
               <div> Speedworld Helmets 2022</div>
               </div>
           
       </div>
    </footer> );
}

export default Footer;