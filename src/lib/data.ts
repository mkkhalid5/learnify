import { API_BASE_URL as BASE_URL } from "@/lib/api-base";

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: unknown;
}

async function request<T>(
    path: string,
    options?: RequestInit,
    expectData = true
): Promise<T> {
     console.log(`${BASE_URL}${path}`);
    const response = await fetch(`${BASE_URL}${path}`, {
        
        cache: "no-store",
        ...options,
        headers: {
            ...(options?.headers ?? {}),
            ...(options?.body instanceof FormData
                ? {}
                : {
                      "Content-Type": "application/json",
                  }),
        },
    });
    console.log(response.status);
    const result: ApiResponse<T> = await response.json();

    if (
        !response.ok ||
        result.success === false ||
        (expectData && result.data === undefined)
    ) {
        throw new Error(result.message || "Request Failed");
    }
     
    return result.data as T;
}

export const dataGet = <T>(path: string) =>
    request<T>(path);

export const dataPost = <T>(
    path: string,
    body: unknown
) =>
    request<T>(path, {
        method: "POST",
        body: JSON.stringify(body),
    });

export const dataPatch = <T>(
    path: string,
    body: unknown
) =>
    request<T>(path, {
        method: "PATCH",
        body: JSON.stringify(body),
    });

export const dataDelete = (path: string) =>
    request<void>(
        path,
        {
            method: "DELETE",
        },
        false
    );

export const uploadImage = async (
    path: string,
    file: File
): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    const result = await request<{ secure_url: string }>(
        path,
        {
            method: "POST",
            body: formData,
        }
    );

    return result.secure_url;
};