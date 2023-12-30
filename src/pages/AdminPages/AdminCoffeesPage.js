import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { UserNotAdminInfoPage } from './UserNotAdminInfoPage';


export function AdminCoffeesPage(props) {

    const coffeesTable = (
        <>
            coffees table
        </>
    )

    const showCoffeeTable = () => {
        if (props.authorities.includes("ADMIN")) {
            return coffeesTable;
        }
        else return "";
    }

    return (
        <Container>
            {UserNotAdminInfoPage(props.authorities)}
            {showCoffeeTable()}
        </Container>
    )
}