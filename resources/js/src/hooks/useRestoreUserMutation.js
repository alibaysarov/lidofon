import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

const useRestoreUserMutation = (id) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => axios.get(`${import.meta.env.VITE_API_URL}/users/restore/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }),
        onError: (error) => {
            console.log("error occ", error)
        },
        onSuccess: (data) => {
            queryClient.resetQueries({queryKey: ['users'], exact: true});
            queryClient.resetQueries({queryKey: ['users', 'single', id], exact: true});
        }
    })
}
export default useRestoreUserMutation;
