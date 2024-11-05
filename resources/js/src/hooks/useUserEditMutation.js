import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const useUserRegistrationMutation = (id) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => axios.put(import.meta.env.VITE_API_URL + `/users/edit/${id}`, data, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
        }),
        onSuccess: () => {
            queryClient.resetQueries({queryKey: ['users'], exact: true});
            queryClient.resetQueries({queryKey: ['users', 'single', id], exact: true});
            navigate("/")
        },
    });
}
export default useUserRegistrationMutation;
