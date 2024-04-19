import { BASE_URL } from "@/constants/base_url";
import type { Methods } from "@/types.js";

const myFetch = async ({ endPoint, method, body }: { endPoint: string, method: Methods, body?: object }) => {
    const token = sessionStorage.getItem('token');

    const get = {
        method: 'GET',
        mode: 'cors' as RequestMode,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    }

    const post = {
        method: 'POST',
        mode: 'cors' as const,
        credentials: 'same-origin' as const,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(body)
    }
    try {
        const applyMethod = method === 'get' ? get : post;
        const response = await fetch(`${BASE_URL}${endPoint}`, applyMethod);

        // console.log(response)
        // if (!response.ok) return { code: 1, description: response.statusText };

        const result = await response.json();
        // console.log(result)
        return result;
    } catch (e: any) {
        return { code: 1, description: e.message }
    }

}

export default myFetch;