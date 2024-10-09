import styles from './Home.module.css'
import savings from '../../imgs/savings.svg'
import Projectform from '../projects/Projectform';
import { Link } from 'react-router-dom';
import LinkButton from '../layouts/LinkButton';

function Home(){
    return (
        <section className={styles.home_container}>
              <h1 className={styles.h1}>Bem-vindo ao < spans className={styles.span}>Summit</spans></h1>
              <p>comece a gerenciar os seus projetos!</p>
              <br />
             <LinkButton to='./NewProject' text='Criar projeto'/>
              <img src={savings} alt="Costs" />
        </section>
    )
}export default Home;