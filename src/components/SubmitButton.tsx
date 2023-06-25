import styles from "../styles/submit_button.module.css";


type Props = {
    isSending: boolean,
};

const SubmitButton = ({isSending}: Props) => {
    return (
        <button type="submit" className={styles.btn_submit}>
            {isSending ? 
            <div className={styles.lds_facebook}><div></div><div></div><div></div></div> 
            : "Submit"}
        </button>
    );
};

export default SubmitButton;