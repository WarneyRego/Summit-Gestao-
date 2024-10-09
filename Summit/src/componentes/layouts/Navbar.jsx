import { Link } from 'react-router-dom';
import Container from '../pages/Container';
import styles from './Navbar.module.css';
import logo from '../../imgs/LOGOFIM.png'


function Navbar() {
    return (
        <nav class={styles.navbar} classname={styles.list}>
            <Container>
            <Link to='/'><img src={logo} alt='Summit' /></Link>
                <ul class={styles.list}>

                    
                <li class={styles.item}> <Link to='/Projects'>Projetos</Link></li>
                    <li class={styles.item}> <Link to='/Contact'>Contato</Link></li>

                    <li class={styles.item}><Link to='/Company'>Companhia</Link></li>

                    <li class={styles.item}><Link to='/NewProject'>Novo Projeto</Link></li>
                </ul>
            </Container>
        </nav>
    )
} export default Navbar