import axios from 'axios';
import {beforeAll, describe, expect, test} from '@jest/globals';
import {getLastWeeksMostPopularRepos, getRepoById} from '../lib/github-connector';
import {exampleRepository1, exampleRepository2, exampleRepository3} from './example-repositories';

jest.mock('axios');

describe('github-connector', () => {
    beforeAll(() => {
        (axios.get as jest.Mock).mockImplementation((url: string) => {
            if (url.startsWith('https://api.github.com/repositories/')) {
                return Promise.resolve({data: exampleRepository1});
            } else if (url.startsWith('https://api.github.com/search/repositories')) {
                if (url.includes('+language%3A')) {
                    const mockPopularReposJavascriptOnly = {
                        data: {
                            "total_count": 2,
                            "incomplete_results": false,
                            "items": [exampleRepository2, exampleRepository3]
                        }
                    };
                    return Promise.resolve(mockPopularReposJavascriptOnly);
                } else {
                    const mockPopularReposWithAllLanguages = {
                        data: {
                            "total_count": 3,
                            "incomplete_results": false,
                            "items": [exampleRepository1, exampleRepository2, exampleRepository3]
                        }
                    };
                    return Promise.resolve(mockPopularReposWithAllLanguages);
                }
            }
        });
    });

    test('getRepoById should return a repository object for a valid repository ID', async () => {
        const repoId = 636787031;
        expect(await getRepoById(repoId.toString())).toEqual(expectedResult1);
    });

    test('getLastWeeksMostPopularRepos should return a list of repository objects', async () => {
        expect(await getLastWeeksMostPopularRepos(10)).toEqual([expectedResult1, expectedResult2, expectedResult3]);
    });

    test('getLastWeeksMostPopularRepos should only return the demanded number of repository objects', async () => {
        expect(await getLastWeeksMostPopularRepos(2)).toEqual([expectedResult1, expectedResult2]);
    });

    test('getLastWeeksMostPopularRepos should only return the JavaScript repositories when filtering by language=js', async () => {
        expect(await getLastWeeksMostPopularRepos(2, 'js')).toEqual([expectedResult2, expectedResult3]);
    });
});

const expectedResult1 = {
    'description': '🤖 A list of open LLMs available for commercial use.',
    'githubUrl': 'https://github.com/eugeneyan/open-llms',
    'id': 636787031,
    'language': null,
    'name': 'open-llms',
    'stars': 3822
};

const expectedResult2 = {
    'description': 'A demo of using RSC and Vercel Postgres, legally',
    'githubUrl': 'https://github.com/rauchg/how-is-this-not-illegal',
    'id': 635368845,
    'language': 'JavaScript',
    'name': 'how-is-this-not-illegal',
    'stars': 387
};

const expectedResult3 = {
    'description': 'Next.js recently became the official React framework as outlined in React docs.',
    'githubUrl': 'https://github.com/adrianhajdin/project_next_13_ai_prompt_sharing',
    'id': 636179770,
    'language': 'JavaScript',
    'name': 'project_next_13_ai_prompt_sharing',
    'stars': 322
};