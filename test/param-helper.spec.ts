import {describe, expect, test} from '@jest/globals';
import {getCountQueryParameter} from "../lib/param-helper";
import {Request} from "express";

describe('param-helper', () => {
    test('getCountQueryParameter should return 7 if the count parameter is 7', () => {
        const mockRequest = _createMockRequest('7');
        expect(getCountQueryParameter(mockRequest)).toEqual(7);
    })

    const _createMockRequest = (count: string) => {
        return {
            query: {
                'count': count
            }
        } as any as Request;
    };
});