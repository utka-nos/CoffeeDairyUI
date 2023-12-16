import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function AuthorizePage() {

  const [searchParams] = useSearchParams();

  const requestBody = {
    code : "",
    grant_type : "authorization_code",
    redirect_uri : "http://localhost:3000/authorize"
  };

  useEffect(() => {
    requestBody.code = searchParams.get("code")
    fetch("http://localhost:8082/api/v1/oauth2/token", {
      method: "POST",
      headers: {
        "Authorization": "Basic Y2xpZW50OnNlY3JldA==",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "grant_type=authorization_code&code=" + requestBody.code + "&redirect_uri=http://localhost:3000/authorize"
    })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("jwt_token", data.access_token)
        localStorage.setItem("id_token", data.id_token)
        window.location.assign("http://localhost:3000/home")
      })
      .catch(error => console.error(error));
  }, [])


  return (
    <div>
      hello bitch
    </div>
  )
}