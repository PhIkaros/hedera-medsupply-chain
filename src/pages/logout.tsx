import {useContext} from "react";
import {Context} from "@/App.tsx";
import {useNavigate} from "react-router-dom";

export default function Logout() {

    const navigate = useNavigate();

    const {setIsConnected, setUserRole} = useContext(Context);
    setIsConnected(false);
    setUserRole(null);
    navigate('/');

    return (<></>)
}