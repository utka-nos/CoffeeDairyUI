import Container from 'react-bootstrap/Container';
import Button    from 'react-bootstrap/Button';
import Modal     from 'react-bootstrap/Modal';
import Form      from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState, useEffect } from 'react';

export function MyCoffeesPage() {

  const [showAddNewCoffeeModal, setShowAddNewCoffeeModal] = useState(false);
  const [coffeeNameInputValue, setCoffeeNameInputValues] = useState("");
  const [coffees, setCoffees] = useState([]);

  useEffect(() => {
      updateCoffees();
  }, []);

  const updateCoffees = () => {
    fetch("http://localhost:8081/api/v1/coffee/all", {
      method: "GET",
      headers: {
      "Authorization" : "Bearer " + localStorage.getItem("jwt_token")
      }
    })
      .then(response => response.json())
      .then(coffees => setCoffees(coffees));
  }

  const addNewCoffeeBtnClick = () => {
    if(coffeeNameInputValue === "") return;
    fetch("http://localhost:8081/api/v1/coffee", {
      method: "POST",
      headers: {
        "Authorization" : "Bearer " + localStorage.getItem("jwt_token"),
        "Content-Type" : "application/json"
      },
      body: "{ \"name\": \"" + coffeeNameInputValue + "\"}"
    })
      .then(response => {
        if(response.status === 201) {
          setShowAddNewCoffeeModal(false);
          updateCoffees();
        }
      })
  }

  const listOfCoffees = () => (
    <ListGroup className="my-2">
      {coffees.map(coffee => (
        <ListGroup.Item>{coffee.name}</ListGroup.Item>
      ))}
    </ListGroup>
  )

  const addNewCoffeeModal = () => (
    <Modal show={showAddNewCoffeeModal} onHide={() => setShowAddNewCoffeeModal(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new Coffee
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FloatingLabel controlId="coffeeNameInput" label="Coffee name" className="mb-3">
          <Form.Control type="text" placeholder="Brazil" onChange={(e) => setCoffeeNameInputValues(e.target.value)}/>
        </FloatingLabel>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShowAddNewCoffeeModal(false)}>Close</Button>
        <Button onClick={() => addNewCoffeeBtnClick()}>Save</Button>
      </Modal.Footer>
    </Modal>
  )

  return (
    <Container>

      coffees:
      {listOfCoffees()}
      <Button onClick={() => setShowAddNewCoffeeModal(true)}>Add new Coffee</Button>

      {addNewCoffeeModal()}
    </Container>
  )

}