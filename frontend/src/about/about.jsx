import '../css/global.css'
import './about.css'
import aboutImage from  './about.png'

function About() {
    return ( <div className="component">
   <h2 style={{textAlign:"center"}}>Our Story</h2>
   <div className='story'>
       Speedworld_helmets was launched in 2022.We are continously growing
       and have been provding helmets and other accessories inside kathmandu 
       valley.
       
   </div>
   <div className='details-about'>
       We promise you to provide best quality helmets with resonable
       prices.We provide we good discounts and offers.We are open to any of
       our queries.We appreciate your feedback regarding our services and your
       suggestion will be considered for or future plans and sevices.  
        </div>
        <div className='image'>
            <img src={aboutImage} alt="us" />
        </div>
        Speedworld_helmets have variety of helmets and other bike acessories and 
        are very obliged to add new products to our store as per you recommedation.
        <div className="follow">
            Follow us on <b><a href="https://www.instagram.com/speedworld_helmets/" target="_blank">Instagram </a></b>  
            and <b><a href="https://www.facebook.com/search/top?q=speedworld_helmets" target="_blank">Facebook</a></b> to keep up to date on our new products and 
            offers.
        </div>
        We are open to you 24hours and feel free to conact on social media .We will
        contact you as soon as possible.
    </div> );
}

export default About;