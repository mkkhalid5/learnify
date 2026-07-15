export interface ApiSuccessResponse<T> {
    success: true;
    message: string;
    data: T;
}

export interface ApiErrorResponse {
    success: false;
    message: string;
    error: Record<string, unknown>;
}

export interface PaginationResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}