import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        dispatch(login());
        navigate("/");
        toast.success("User logged in successfully!")
    }

    return (
        <div className="login-container">
            <div className="">
                <h1>Login</h1>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}

export default Login