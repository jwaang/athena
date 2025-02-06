import { UserResponse } from '../types/User';

export const fetchAllUsers = async (): Promise<UserResponse[]> => {
    const requests = Array.from({ length: 10 }, (_, i) => i + 1).map(id =>
        fetch(`${import.meta.env.VITE_API_BASE_URL}${id}`)
            .then(res => {
                if (!res.ok) throw new Error(`Failed to fetch user ${id}`);
                return res.json();
            })
            .catch(error => {
                console.error(`Error fetching user ${id}:`, error);
                return null;
            })
    );

    const results = await Promise.all(requests);
    return results.filter((result): result is UserResponse => result !== null);
};
