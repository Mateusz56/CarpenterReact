import { useEffect, useState } from 'react'

const backendUrl = 'https://localhost:7280/'

export function useFetchData(endpoint, params, onSuccess) {
    const [data, setData] = useState(null)

    useEffect(() => {
        fetchData(endpoint, params, onSuccess);
    },
    [])

    return [data, fetchData, setData];

    async function fetchData(endpoint, params, onSuccess) {
        if (!endpoint)
            return;

        let url = backendUrl + endpoint;
        if (params) {
            url += '?'

            for (const [key, value] of Object.entries(params)) {
                if (value === undefined || value === null || Array.isArray(value) && value.length == 0)
                    continue;

                if (Array.isArray(value) && value.length > 0) {
                    url += value.map(x => `${key}=${x}&`).join('');
                }
                else {
                    url += `${key}=${value}&`
                }
            }
        }

        const response = await fetch(url)

        if (!response.ok) {
            // show error
        }
        else {
            let json = await response.json()

            setData(json)
            if (onSuccess)
                onSuccess();
        }
    }
}

export async function fetchPost(endpoint, body, onSuccess, onError) {
    const response = await fetch(backendUrl + endpoint, {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    if (response.ok)
        onSuccess(await response.json())
    else
        onError(await response.json())
}

export async function fetchPut(endpoint, body, onSuccess, onError) {
    const response = await fetch(backendUrl + endpoint, {
        method: "PUT",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    if (response.ok)
        onSuccess(await response.json())
    else
        onError(await response.json())
}

export async function fetchPatch(endpoint, body, onSuccess, onError) {
    const response = await fetch(backendUrl + endpoint, {
        method: "PATCH",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    if (response.ok)
        onSuccess(await response.json())
    else
        onError(await response.json())
}

export async function fetchDelete(endpoint, body, onSuccess, onError) {
    const response = await fetch(backendUrl + endpoint, {
        method: "DELETE",
        body: JSON.stringify(body),
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok)
        onSuccess(await response.json())
    else
        onError(await response.json())
}

//export default { useFetchData, fetchPost };