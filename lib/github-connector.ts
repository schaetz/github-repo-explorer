import axios from "axios";
import "./date-helper";

const githubApiUrl = 'https://api.github.com';

export const getLastWeeksMostPopularRepos: () => Promise<any> = () => {
    const now = new Date();
    const createdDateString = now.oneWeekBefore().toStringWithDateOnly();

    const url = new URL('/search/repositories', githubApiUrl);
    url.searchParams.set('q', `created:>${createdDateString}`);
    url.searchParams.set('sort', 'stars');
    url.searchParams.set('order', 'desc');

    return axios.get(url.toString())
        .then((response) => response.data)
        .catch((error) => error);
};