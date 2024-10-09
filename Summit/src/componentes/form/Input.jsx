import styles from './Input.module.css'
function Input({ type, text, name, placeholder, handleOnChange, value }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input
                onChange={handleOnChange}
                type={type}
                name={name}
                id={name}
                value={value}
                placeholder={placeholder} />
        </div>
    )
} export default Input;