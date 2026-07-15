const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export const dataGet = async <T>(path: string): Promise<T> => {
    const res = await fetch(`${BASE_URL}${path}`, {
        cache: "no-store",
    });
    return res.json();
};
export const dataPost = async (
    path: string,
    body: unknown
) => {
    const res = await fetch(`${BASE_URL}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    return res.json();
};

export const dataPatch = async (
    path: string,
    body: unknown
) => {
    const res = await fetch(`${BASE_URL}${path}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    return res.json();
};

export const dataDelete = async (
    path: string
) => {
    const res = await fetch(`${BASE_URL}${path}`, {
        method: "DELETE",
    });

    return res.json();
};