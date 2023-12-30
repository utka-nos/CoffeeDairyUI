import Dropdown  from 'react-bootstrap/Dropdown';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal     from 'react-bootstrap/Modal';
import Form      from 'react-bootstrap/Form';
import Button    from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';


export function AddNewCoffeeModal(showAddNewCoffeeModal, setShowAddNewCoffeeModal) {

    const [activePerformances, setActivePerformances]       = useState([]);
    const [coffeeDescriptions, setCoffeeDescriptions]       = useState([]);
    const [coffeeNameInputValue, setCoffeeNameInputValues]  = useState("");
    const [performances, setPerformances]                   = useState([]);

    useEffect(() => {
        fetch("http://localhost:8081/api/v1/description/performances", {
            method: "GET",
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("jwt_token"),
                "Content-Type" : "application/json"
            }
        })
            .then(response => response.json())
            .then(perfs => {
                setPerformances(perfs);
            })
            .catch(err => console.log(err));
    }, [])

    const addNewCoffeeBtnClick = () => {
        if(coffeeNameInputValue === "") return;
        fetch("http://localhost:8081/api/v1/coffee", {
          method: "POST",
          headers: {
            "Authorization" : "Bearer " + localStorage.getItem("jwt_token"),
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(
            { 
              "name": coffeeNameInputValue, 
              "coffeeDescriptions" : coffeeDescriptions
            }
          )
        })
          .then(response => {
            if(response.status === 201) {
              setShowAddNewCoffeeModal(false);
            }
          })
    }
    
    const getActiveDescriptions = () => {
        return (<div>
          {activePerformances.map((perf, index) => {
            if (perf === "TEXT") return (
              <FloatingLabel controlId={index} label="description" className="mb-3" key={index}>
                <Form.Control type="text" placeholder="description" onChange={(e) => setCoffeeDescriptionInputValue(e.target.value, index)}/>
              </FloatingLabel>
            )
            else if (perf === "DATE") return (
              <div>
                ***datepicker***
              </div>
            )
            else return (<div>no value</div>)
          })}
        </div>)
    }

    const setCoffeeDescriptionInputValue = (value, index) => {
        const tmp = coffeeDescriptions;
        tmp[index] = {"value": value, "name": "description"};
        setCoffeeDescriptions(tmp);
      }

    const addActivePerformance = (perf) => {
        setActivePerformances([...activePerformances, perf]);
    }

    const performancesBtn = () => {
        return (
          <Dropdown.Menu>
            {performances.map(perf => (
              <Dropdown.Item key={perf} onClick={() => addActivePerformance(perf)}>{perf}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        )
    }

    return (
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
            
            {getActiveDescriptions()}
            
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                add description
                </Dropdown.Toggle>

                {performancesBtn()}
            </Dropdown>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={() => setShowAddNewCoffeeModal(false)}>Close</Button>
            <Button onClick={() => addNewCoffeeBtnClick()}>Save</Button>
            </Modal.Footer>
        </Modal>
    )
}