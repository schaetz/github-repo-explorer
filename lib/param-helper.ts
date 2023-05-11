import {Request} from "express";
import {defaultSearchCount, maxSearchCount} from "../app";
import {InvalidUserParameterError} from "./types";

export const getCountQueryParameter = (req: Request) => {
    if (!req.query.hasOwnProperty('count') || typeof req.query.count !== 'string') {
        return defaultSearchCount;
    }

    const count = parseInt(req.query.count);
    if (isNaN(count)) {
        throw new InvalidUserParameterError('The argument passed for search result count is not a number.');
    } else if (count <= 0) {
        throw new InvalidUserParameterError('Invalid number passed for search result count.');
    }
    return Math.min(count, maxSearchCount);
}

export const getLanguageParameter = (req: Request) => {
    if (!req.query.hasOwnProperty('lang') || typeof req.query.lang !== 'string') {
        return undefined;
    }
    return req.query.lang;
}