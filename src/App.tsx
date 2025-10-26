import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Scanner from "./pages/Scanner";
import Process from "./pages/Process";
import Statistics from "./pages/Statistics";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import {createContext, useState} from "react";
import Logout from "@/pages/logout.tsx";
import Fabricant from "./pages/Fabricant";
import Distributeur from "./pages/Distributeur";
import Pharmacien from "./pages/Pharmacien";
import Patient from "./pages/Patient";

const queryClient = new QueryClient();
export const Context = createContext(undefined);

const App = () => {

    const [isConnected, setIsConnected] = useState(
        localStorage.getItem("isConnected") === "true"
    );
    const [userRole, setUserRole] = useState<string | null>(
        localStorage.getItem("userRole")
    );
    const [userName, setUserName] = useState(
        localStorage.getItem("userName") || ""
    );
    const [userEmail, setUserEmail] = useState(
        localStorage.getItem("userEmail") || ""
    );
    const [userOrganization, setUserOrganization] = useState(
        localStorage.getItem("userOrganization") || ""
    );

    return (
        <Context.Provider value={{
            isConnected, 
            setIsConnected, 
            userRole, 
            setUserRole,
            userName,
            setUserName,
            userEmail,
            setUserEmail,
            userOrganization,
            setUserOrganization
        }} >
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                    <Toaster/>
                    <Sonner/>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Index/>}/>
                            <Route path="/dashboard" element={<Dashboard/>}/>
                            <Route path="/scanner" element={<Scanner/>}/>
                            <Route path="/process" element={<Process/>}/>
                            <Route path="/statistics" element={<Statistics/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/contact" element={<Contact/>}/>
                            <Route path="/auth" element={<Auth/>}/>
                            <Route path="/logout" element={<Logout/>}/>
                            <Route path="/fabricant" element={<Fabricant/>}/>
                            <Route path="/distributeur" element={<Distributeur/>}/>
                            <Route path="/pharmacien" element={<Pharmacien/>}/>
                            <Route path="/patient" element={<Patient/>}/>
                            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </BrowserRouter>
                </TooltipProvider>
            </QueryClientProvider>
        </Context.Provider>
    )
};

export default App;
