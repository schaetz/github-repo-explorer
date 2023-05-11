import express, {Express, Request, Response} from "express";
import {getLastWeeksMostPopularRepos, getRepoById} from "./lib/github-connector";
import {getCountQueryParameter} from "./lib/param-helper";
import {InvalidUserParameterError, Repository} from "./lib/types";
import {AxiosError} from "axios";

const app: Express = express();
const port = 8000;
export const defaultSearchCount = 10;
export const maxSearchCount = 30;
// const storedRepositoryIDs: Set<number> = new Set<number>();

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.get('/', (req: Request, res: Response) => {
    res.send('GitHub repository explorer')
})

app.get('/repos/id/:repoId', async (req: Request, res: Response) => {
    try {
        const result: Repository | AxiosError = await getRepoById(req.params['repoId']);
        _handleRequestResult(result, res);
    } catch (e) {
        _handleErrors(e, res);
    }
});

app.get('/repos/popular', async (req: Request, res: Response) => {
    try {
        const count = getCountQueryParameter(req);
        const result: Repository[] | AxiosError = await getLastWeeksMostPopularRepos(count);
        _handleRequestResult(result, res);
    } catch (e) {
        _handleErrors(e, res);
    }
});

const _handleRequestResult = (result: unknown, response: Response) => {
    if (result instanceof AxiosError) {
        response.sendStatus(404);
    } else {
        response.send(result);
    }
}

const _handleErrors = (e: unknown, response: Response) => {
    if (e instanceof InvalidUserParameterError) {
        response.sendStatus(400);
    } else {
        response.sendStatus(500);
    }
}