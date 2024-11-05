import {useMutation} from "@tanstack/react-query";
import axios from "axios";

const userUserRegistrationMutation = () => {
    return useMutation({
        mutationFn: (data) => axios.post(import.meta.env.VITE_API_URL + "/auth/login", data, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        }),
        onSuccess: ({data}) => {
            localStorage.setItem("token", data.token);
        }
    });
}
export default userUserRegistrationMutation;
