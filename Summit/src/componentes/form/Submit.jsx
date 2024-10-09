import styles from './Submit.module.css'

function Submit({ text, name,BtnText}){
    return(
        <div classname={styles.form_control}>
            <label htmlFor={name}></label>
            <button className={styles.btn}>{text}</button>
            
        </div>
    )

}export default Submit;