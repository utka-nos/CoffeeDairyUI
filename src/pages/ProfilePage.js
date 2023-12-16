import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';

import { useEffect, useState } from 'react';

export function ProfilePage({authorities}) {

  const [profileInfo, setProfileInfo] = useState({});

  const getProfileInfo = () => {
    fetch("http://localhost:8082/api/v1/users/user-info", {
          method: "GET",
          headers: {
            "Authorization" : "Bearer " + localStorage.getItem("jwt_token")
          }
    })
      .then(response => {
        if (response.status !== 200) {
          console.error("Some problems, status : ", response.status)
        }
        return response.json();
      })
      .then(userInfo => setProfileInfo(userInfo))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getProfileInfo();
  }, [])

  return (
    <Container className="my-1">
      <h2> Profile page </h2>
      <h3><Spinner animation="border" hidden={!!profileInfo.username}/>{profileInfo.username}</h3>
      <h3>
        Your Authorities are: {authorities.map(auth => (
          <Badge key={auth} className="mx-1">{auth}</Badge>
        ))}
      </h3>
      <h3> Email: {profileInfo.email || "Not set yet"} </h3>

    </Container>
  )
}