export type Human = {
    /** @format uuid */
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    city: string;
    country: string;
    email: string;
};

export type HumanPatch = {
    firstName?: string;
    lastName?: string;
    age?: number;
    city?: string;
    country?: string;
    email?: string;
};