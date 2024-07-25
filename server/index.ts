import { createServer } from 'http';
import express from 'express';
import { Server } from 'socket.io';
import next, { type NextApiHandler } from 'next';

import type { ClientToServerEvents, ServerToClientEvents } from '@/types';

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';

const nextApp = next({ dev });

const nextHandler: NextApiHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
    const app = express();

    const server = createServer(app);

    const io = new Server<ClientToServerEvents, ServerToClientEvents>(server);

    app.get('/health', (req, res) => {
        res.send('Healthy');
    })

    io.on('connection', (socket) => {
        console.log('%c [ socket ]-27', 'font-size:13px; background:pink; color:#bf2c9f;connection')
        socket.on('draw', (moves, options) => {
            console.log('%c [ drawing ]-28', 'font-size:13px; background:pink; color:#bf2c9f;')
        })

        socket.on('disconnect', () => {
            console.log('client disconnected');
        })
    })


    app.all("*", (req: any, res: any) => {
        return nextHandler(req, res);
    })

    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
})
