//Css
import "../../assets/styles/components/cards.sass"

//Bootstrap
import Card from 'react-bootstrap/Card';

const CardEmployee = ({name, email, perfil, id}) => {
    return (
        <>
            <Card id='card-func' key={id}>
                <Card.Body>
                    <h3 className='title-main' >{name}</h3>
                    <p><span>E-mail:</span> {email} </p>
                    <p><span>Perfil:</span> {perfil} </p>
                </Card.Body>
            </Card>
        </>
    )
}

export default CardEmployee