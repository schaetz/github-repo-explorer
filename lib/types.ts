export type Repository = {
    id: string;
    name: string;
    githubUrl: string;
    description: string;
    language: string;
    stars: number;
}

export class InvalidUserParameterError extends Error {
    constructor(message: string) {
        super(message);
        this.message = message;
    }
}
InvalidUserParameterError.prototype.name = 'InvalidUserParameterError';