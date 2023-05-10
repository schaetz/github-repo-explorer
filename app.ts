import express, {Express, Request, Response} from "express";
import axios from 'axios';

const app: Express = express();
const port = 8000;

const githubApiUrl = 'https://api.github.com';

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.get('/repositories', (req: Request, res: Response) => {
    const dateOneWeekAgo = new Date();
    dateOneWeekAgo.setDate(dateOneWeekAgo.getDate() - 7);
    const dateString = dateOneWeekAgo.toISOString().split('T')[0];

    const url = new URL('/search/repositories', githubApiUrl);
    url.searchParams.set('q', `created:>${dateString}`);
    url.searchParams.set('sort', 'stars');
    url.searchParams.set('order', 'desc');

    axios.get(url.toString())
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            // handle error
            res.send(error);
        });

})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});