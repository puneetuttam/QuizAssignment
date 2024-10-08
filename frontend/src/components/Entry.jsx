import React from "react";
import { useNavigate } from "react-router-dom";

const Entry = () => {
    const navigate = useNavigate();
    
    return (
        <div>
            <h1>Select who You are</h1>
            <button onClick={() => navigate("/login")}>Admin</button>
            <button onClick={()=>navigate("/studentlogin")}>Student</button>
        </div>
    );
};

export default Entry;
