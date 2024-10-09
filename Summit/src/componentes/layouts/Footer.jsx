import { FaFacebook,FaInstagram,FaLinkedin } from 'react-icons/fa';
import styles from './Footer.module.css'
import { Link } from 'react-router-dom';
function Footer() {
    return (
        
            <footer className={styles.footer}>
              <ul className={styles.social_list}>
                 <li classname={styles.social_list}>
                  <FaFacebook />  

                 </li >
                 <li classname={styles.social_list}>
                  <FaInstagram/>
                 </li>
                 <li classname={styles.social_list}>

                  <FaLinkedin/>
                 </li>
                
              </ul>  
                <p class={styles.copy_right}><span  >Costs</span> &copy; 2024</p>
            </footer>
        
    )
}

export default Footer;