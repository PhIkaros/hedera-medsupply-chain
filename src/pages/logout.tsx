import {useContext} from "react";
import {Context} from "@/App.tsx";
import {useNavigate} from "react-router-dom";

export default function Logout() {

    const navigate = useNavigate();

    const {setIsConnected, setUserRole, setUserName, setUserEmail, setUserOrganization} = useContext(Context);
    
    // Nettoyer toutes les données
    localStorage.removeItem("isConnected");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userOrganization");
    
    setIsConnected(false);
    setUserRole(null);
    setUserName("");
    setUserEmail("");
    setUserOrganization("");
    
    navigate('/');

    return (<></>)
}