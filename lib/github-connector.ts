import axios from "axios";
import "./date-helper";
import {Repository} from "./types";

const githubApiUrl = 'https://api.github.com';

export const getRepoById = async (id: string) => {
    const url = new URL(`/repositories/${id}`, githubApiUrl);

    return await axios.get(url.toString())
        .then((response) => _mapSingleSearchResultItemToRepository(response.data))
        .catch((error) => error);
};

export const getLastWeeksMostPopularRepos = async (count: number, language?: string) => {
    const url = new URL('/search/repositories', githubApiUrl);
    url.searchParams.set('q', _getSearchFilterString(language));
    url.searchParams.set('sort', 'stars');
    url.searchParams.set('order', 'desc');

    return await axios.get(url.toString())
        .then((response) => _getRepositoriesFromSearchResults(response.data, count))
        .catch((error) => error);
};

const _getSearchFilterString = (language?: string) => {
    const now = new Date();
    const createdDateString = now.oneWeekBefore().toStringWithDateOnly();

    const filterByCreationDate = `created:>${createdDateString}`;
    const filterByLanguage = !!language ? `language:${language}` : '';

    const allFilters = [filterByCreationDate];
    if (filterByLanguage) {
        allFilters.push(filterByLanguage);
    }
    return allFilters.join(' ');
}

const _getRepositoriesFromSearchResults = (data: any, count: number) => {
  if (!data.hasOwnProperty('items') || !Array.isArray(data.items)) {
      throw new Error('The response to the API request has an unexpected format.');
  }
  const selectedItems = data.items.slice(0, count);
  return selectedItems.map(
      (item: any) => _mapSingleSearchResultItemToRepository(item)
  ) as Repository[];
};

const _mapSingleSearchResultItemToRepository = (item: any) => {
    return {
        id: item['id'],
        name: item['name'],
        githubUrl: item['html_url'],
        description: item['description'],
        language: item['language'],
        stars: item['stargazers_count'],
    } as Repository;
}