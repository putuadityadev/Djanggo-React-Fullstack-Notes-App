import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKENS, REFRESH_TOKENS } from "../constants";
import '../styles/Form.css';
import LoadingIndicator from "./loadingIndicator";


function Form({route, method}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === 'login' ? 'Login' : 'Register';

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault()

        try {
            const res = await api.post(route, {username, password});
            if(method === 'login') {
                localStorage.setItem(ACCESS_TOKENS, res.data.access);
                localStorage.setItem(REFRESH_TOKENS, res.data.refresh);
                navigate('/');
            } else {
                navigate('/login');
            }
        } catch(error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input 
            className="form-input"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Username"
        />

        <input
            className="form-input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
        />
        {loading && <LoadingIndicator />}
        <button className="form-button" type="submit">
            {name}
        </button>
    </form>
}
export default Form;