import express, {Express, Request, Response} from "express";
import {getLastWeeksMostPopularRepos} from "./lib/github-connector";

const app: Express = express();
const port = 8000;

// const storedRepositoryIDs: Set<number> = new Set<number>();

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.get('/', (req: Request, res: Response) => {
    res.send('GitHub repository explorer')
})

app.get('/repositories/all', async (req: Request, res: Response) => {
    const allPopularRepos = await getLastWeeksMostPopularRepos();
    res.send(allPopularRepos);
});

