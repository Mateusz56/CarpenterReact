import { useEffect, useState } from 'react'
import Notifications from '../Components/Notifications/Notifications';

const backendUrl = 'https://localhost:7280/'

export function useFetchData(endpoint, params, onSuccess) {
    const [data, setData] = useState(null)

    useEffect(() => {
        fetchData(endpoint, params, onSuccess);
    },
    [])

    return [data, fetchData, setData];

    async function fetchData(endpoint, params, onSuccess, onError) {
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

        try {
            const response = await fetch(url)
            const json = await response.json()

            if (!response.ok && onError) {
                onError(response)
            }
            else if (!response.ok && json.errorMessage) {
                Notifications.AddNotification('Error', json.errorMessage)
            }
            else if (!response.ok) {
                throw 'UnhandledException'
            }
            else {
                setData(json)
                if (onSuccess)
                    onSuccess();
            }
        }
        catch {
            Notifications.AddNotification('Error', `Unhandled exception when loading: ${endpoint}`)
        }
    }
}

async function handleResponse(response, onSuccess, onError) {
    let json = await response.json()
    if (!response.ok && onError) {
        onError(json)
    }
    else if (!response.ok && json.errorMessage) {
        Notifications.AddNotification('Error', json.errorMessage)
    }
    else if (!response.ok) {
        throw 'UnhandledException'
    }
    else if (onSuccess) {
        onSuccess(response);
    }
}

export async function fetchPost(endpoint, body, onSuccess, onError) {
    try {
        const response = await fetch(backendUrl + endpoint, {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        handleResponse(response, onSuccess, onError)
    }
    catch {
        Notifications.AddNotification('Error', `Unhandled exception when loading: ${endpoint}`)
    }
}

export async function fetchPut(endpoint, body, onSuccess, onError) {
    try {
        const response = await fetch(backendUrl + endpoint, {
            method: "PUT",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        handleResponse(response, onSuccess, onError)
    }
    catch {
        Notifications.AddNotification('Error', `Unhandled exception when loading: ${endpoint}`)
    }
}

export async function fetchPatch(endpoint, body, onSuccess, onError) {
    try {
        const response = await fetch(backendUrl + endpoint, {
            method: "PATCH",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        handleResponse(response, onSuccess, onError)
    }
    catch {
        Notifications.AddNotification('Error', `Unhandled exception when loading: ${endpoint}`)
    }
}

export async function fetchDelete(endpoint, body, onSuccess, onError) {
    try {
        const response = await fetch(backendUrl + endpoint, {
            method: "DELETE",
            body: JSON.stringify(body),
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        handleResponse(response, onSuccess, onError)
    }
    catch {
        Notifications.AddNotification('Error', `Unhandled exception when loading: ${endpoint}`)
    }
}
