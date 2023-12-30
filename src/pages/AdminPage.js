import { useEffect, useState, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import Overlay from 'react-bootstrap/Overlay';
import Stack from 'react-bootstrap/Stack';
import Toast from 'react-bootstrap/Toast';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';

export function AdminPage() {
  const [showToast, setShowToast] = useState(false);
  const [users, setUsers]         = useState([]);
  const [showToken, setShowToken] = useState(false);
  const targetButtonToken = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("jwt_token") !== "") {
      fetch("http://localhost:8082/api/v1/users/all", {
            method: "GET",
            headers: {
              "Authorization" : "Bearer " + localStorage.getItem("jwt_token")
            }
      })
      .then(response => {
        if(response.status !== 200) {
          window.location.assign("http://localhost:3000/home")
        }
        return response.json()
      })
      .then(data => {
        setUsers(data)
      })
      .catch(error => console.error(error))
    }
    else {
      window.location.assign("http://localhost:3000/home")
    }
  }, []);

  const onClickBtnCopyToken = async () => {
    try {
      await navigator.clipboard.writeText(localStorage.getItem("jwt_token"));
      setShowToast(true)
    } catch (err) {
      console.error("failed to copy: ", err)
    }
  }

  const usersTable = (
    <Table className="my-2" striped bordered hover responsive>
      <thead style={{"textAlign": "center"}}>
        <tr>
          <th>id</th>
          <th>username</th>
          <th>roles</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody >
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <th>{user.authorities.map((authority) => (<Badge bg="primary" className="mx-1 my-auto" key={authority}>{authority}</Badge>))}</th>
            <td><Button size="sm" variant="link" className="my-0 py-0">click!</Button></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const tokenPopover = (
    <Popover id="popover-basic" show={false}>
      <Popover.Header as="h3">
        <Stack direction="horizontal" gap={2}>
          <div className="me-auto">Access token</div>
          <Button variant="outline-primary" onClick={onClickBtnCopyToken}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-copy my-auto" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
            </svg>
          </Button>
          <Button variant="outline-primary" onClick={() => setShowToken(false)}>
            X
          </Button>
        </Stack>
        <Toast className="mt-2" onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Body>Copied!</Toast.Body>
        </Toast>
      </Popover.Header>
      <Popover.Body>
        {localStorage.getItem("jwt_token")}
      </Popover.Body>
    </Popover>
  );

  return (
    <Container className="mt-2">
      <Button onClick={() => setShowToken(!showToken)} ref={targetButtonToken}>See token</Button>
      <Overlay show={showToken} placement='right' target={targetButtonToken.current}>
        {tokenPopover}
      </Overlay>
      {usersTable}
    </Container>
  )

}