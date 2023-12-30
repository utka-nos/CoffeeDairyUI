import Container from 'react-bootstrap/Container';
import Button    from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState, useEffect } from 'react';
import { AddNewCoffeeModal } from './AddNewCoffeeModal.js';

export function MyCoffeesPage() {

  const [showAddNewCoffeeModal, setShowAddNewCoffeeModal] = useState(false);
  const [coffees, setCoffees]                             = useState([]);

  useEffect(() => {
      updateCoffees();
  }, []);

  useEffect(() => {
    if(showAddNewCoffeeModal === false) {
      updateCoffees();
    }
  }, [showAddNewCoffeeModal])

  const updateCoffees = () => {
    fetch("http://localhost:8081/api/v1/coffee/my-coffees", {
      method: "GET",
      headers: {
      "Authorization" : "Bearer " + localStorage.getItem("jwt_token")
      }
    })
      .then(response => {
        if (response.status === 200) {
          response.json().then(coffees => setCoffees(coffees));
        }   
      })
      .catch(err => console.log(err));
  }

  const openAddNewCoffeeModal = () => {
    setShowAddNewCoffeeModal(true);
  }

  const listOfCoffees = () => (
    <ListGroup className="my-2">
      {coffees.map(coffee => (
        <ListGroup.Item key={coffee.id}>{coffee.name}</ListGroup.Item>
      ))}
    </ListGroup>
  )

  return (
    <Container>

      coffees:
      {listOfCoffees()}
      <Button onClick={() => openAddNewCoffeeModal()}>Add new Coffee</Button>

      {AddNewCoffeeModal(showAddNewCoffeeModal, setShowAddNewCoffeeModal)}
    </Container>
  )

}