import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";

const useDeleteUserMutation = (id, type = "soft") => {
    return useMutation({
        mutationFn: () => axios.delete(`${import.meta.env.VITE_API_URL}/users/${type === 'soft' ? 'soft-delete' : 'hard-delete'}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }),
        onError: (error) => {
            console.log("error occ", error)
        },
    })
}
export default useDeleteUserMutation;
