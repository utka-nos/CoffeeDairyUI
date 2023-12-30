import  Container  from "react-bootstrap/Container";

export function UserNotAdminInfoPage(authorities) {

    if (authorities.includes("ADMIN")) 
        return "";
    else 
        return (
            <>
                You have not ADMIN authority to see this page
            </>
        )
}