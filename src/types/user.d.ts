interface User {
    id: string;
    name: string;
    phone: string;
    document: string;
    email: string;
    email2: string;
    optins: string[];
    origin: string;
    createdAt: any;
}

interface Activation {
    name: string;
    createdAt: any;
}

interface UserFilter {
    name?: string;
    phone?: string;
    email?: string;
}

interface ActivationItem {
    key: string;
    name: string;
}

interface OptInItem {
    value: string;
    label: string;
}