import {useQuery} from "@tanstack/react-query";
import axios from "axios";

function createQueryString(params) {
    if (typeof params !== 'object' || params === null) {
        return '';
    }

    const pairs = [];
    for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
            const encodedKey = encodeURIComponent(key);
            const encodedValue = encodeURIComponent(params[key]);
            pairs.push(`${encodedKey}=${encodedValue}`);
        }
    }

    return"?"+ pairs.join('&');
}

const useUserListQuery = (filters) => {
    return useQuery({
        queryKey: ['users', createQueryString(filters)],
        queryFn: () => axios.get(`${import.meta.env.VITE_API_URL}/users/all/${createQueryString(filters)}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }),
        onError: (error) => {
            console.log("error ", error)
        },
        staleTime: 20,
    })
}
export default useUserListQuery;
