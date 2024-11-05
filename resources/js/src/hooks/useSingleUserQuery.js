import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const useSingleUserQuery = (id) => {
    return useQuery({
        queryKey: ['users', 'single',id],
        queryFn: () => axios.get(`${import.meta.env.VITE_API_URL}/users/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }),
        onError: (error) => {
            console.log("error ", error)
        },
    })
}
export default useSingleUserQuery;
