import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginPage() {

  const onClickLoginButton = () => {
    window.location.assign('http://localhost:8082/api/v1/oauth2/authorize?response_type=code&client_id=client&state=state&scope=profile%20openid%20ADMIN%3Aread%20ADMIN%3Awrite&redirect_uri=http://localhost:3000/authorize&continue')
  }

  return (
    <Container >
      <Row>
        <Col md>
          <Button onClick={onClickLoginButton}>Sign in</Button>
        </Col>
        <Col md>
          Or create new account!
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Login</Form.Label>
              <Form.Control type="text" placeholder="Enter login" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}