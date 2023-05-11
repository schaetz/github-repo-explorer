import express, {Express, Request, Response} from "express";
import {getLastWeeksMostPopularRepos} from "./lib/github-connector";
import {getCountQueryParameter} from "./lib/param-helper";
import {InvalidUserParameterError} from "./lib/types";

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

app.get('/repositories/popular', async (req: Request, res: Response) => {
    try {
        const count = getCountQueryParameter(req);
        const result = await getLastWeeksMostPopularRepos(count);
        res.send(result);
    } catch (e) {
        if (e instanceof InvalidUserParameterError) {
            res.sendStatus(400);
        } else {
            res.sendStatus(404);
        }
    }
});

