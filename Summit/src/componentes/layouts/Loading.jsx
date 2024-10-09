import styles from './loading.module.css'
import loading from '../../imgs/loading.svg'

function Loading() {
    return (
        <div className={styles.loader_container}>
            <img className={styles.loader} src={loading} alt="Loading..." />
        </div>
    )
} export default Loading;