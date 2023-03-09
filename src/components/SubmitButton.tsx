type Props = {
    isSending: boolean,
};

const SubmitButton = ({isSending}: Props) => {
    return (
        <button type="submit" className="btn-submit">
            {isSending ? 
            <div className="lds-facebook"><div></div><div></div><div></div></div> 
            : "Submit"}
        </button>
    );
};

export default SubmitButton;