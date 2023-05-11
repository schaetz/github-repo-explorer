import {describe, expect, test} from '@jest/globals';
import {getCountQueryParameter} from "../lib/param-helper";
import {Request} from "express";
import {InvalidUserParameterError} from "../lib/types";

describe('param-helper', () => {
    test('getCountQueryParameter should return the default search count if no count parameter is given', () => {
        const mockRequest = {query: {}} as any as Request;
        expect(getCountQueryParameter(mockRequest)).toEqual(10);
    });

    test('getCountQueryParameter should return the given count parameter if it is a valid number', () => {
        const mockRequest = _createMockRequest('7');
        expect(getCountQueryParameter(mockRequest)).toEqual(7);
    });

    test('getCountQueryParameter should return the maximum search count if the count parameter is bigger', () => {
        const mockRequest = _createMockRequest('31');
        expect(getCountQueryParameter(mockRequest)).toEqual(30);
    });

    test('getCountQueryParameter should throw an error if the count parameter is not a number', () => {
        const requestWrapper = () => {
            const mockRequest = _createMockRequest('abcdef');
            getCountQueryParameter(mockRequest)
        };
        expect(requestWrapper).toThrow(InvalidUserParameterError);
    });

    test('getCountQueryParameter should throw an error if the count parameter is 0', () => {
        const requestWrapper = () => {
            const mockRequest = _createMockRequest('0');
            getCountQueryParameter(mockRequest)
        };
        expect(requestWrapper).toThrow(InvalidUserParameterError);
    });

    const _createMockRequest = (count: string) => {
        return {
            query: {
                'count': count
            }
        } as any as Request;
    };
});