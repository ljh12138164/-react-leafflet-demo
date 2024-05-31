import styles from "./Button.module.css";
function Button({ onClick, type, children }) {
  return (
    // 要进行动态选择对象的值用obj[type]
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
