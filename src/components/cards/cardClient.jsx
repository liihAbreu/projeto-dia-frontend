//Css
import "../../assets/styles/components/cards.sass"

//Components
import {BsCalendar3} from "react-icons/bs"

//Bootstrap
import Card from 'react-bootstrap/Card';

const CardClient = ({nome, endereco, telefone, id, data, hora}) => {
    return (
        <>
            <Card id='card-client' key={id}>
                <Card.Header>
                    <h3 className='title-main' >{nome}</h3>
                    {data && 
                        <p>
                            <span><BsCalendar3/></span>
                            {data} - {hora}
                        </p>
                    }
                </Card.Header>
                <Card.Body>
                    <p><span>Endereço:</span> {endereco} </p>
                    <p><span>Telefone:</span> {telefone} </p>
                </Card.Body>
            </Card>
        </>
    )
}

export default CardClient