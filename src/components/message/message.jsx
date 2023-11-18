import "../../assets/styles/components/message.sass"

const Message = ({msg, type}) => {
    return (
        <>
            <div className={`message ${type}`} >
                <p> {msg} </p>
            </div>
        </>
    )
}

export default Message