export interface ContactMessage {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: "new" | "read";
    createdAt: string;
    updatedAt: string;
}

export interface ContactMessageFormValues {
    name: string;
    email: string;
    subject: string;
    message: string;
}
