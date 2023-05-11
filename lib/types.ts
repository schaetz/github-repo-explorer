export type Repository = {
    id: number;
    name: string;
    githubUrl: string;
    description: string;
    stars: number;
}

export class InvalidUserParameterError extends Error {
    constructor(message: string) {
        super(message);
        this.message = message;
    }
}
InvalidUserParameterError.prototype.name = 'InvalidUserParameterError';