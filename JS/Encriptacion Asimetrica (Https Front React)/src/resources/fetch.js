'use strict'

import MyUrl from "./url";

const myFetch = async ({ url, method, body }) => {
    try {
        const configPost = {
            method: "POST",
            credentials: "include",
            cors: "no-cors",
            rejectUnauthorized: 'false',
            body: body,
        };

        const configGet = {
            method: "GET",
            credentials: "include",
            cors: "cors",
        };

        const config = method.toLowerCase() === "post" ? configPost : configGet;

        const response = await fetch(`${MyUrl}${url}`, config);
        // console.log(response);
        const data = await response.json();

        if (data.error) {
            console.log('Hubo un error al hacer fetch en myFetch', data.error);
            return false;
        }

        return data;
    } catch (error) {
        console.error(`Ocurrio un error realizando un fetch ${error.message}`)
        return false;
    }
};

export default myFetch;