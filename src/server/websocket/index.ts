import {WebSocketServer} from 'ws';
import {message} from './message';

export const wsServer = async (port: number) => {
    const ws = new WebSocketServer({
        port: port,
    });

    ws.on('connection', message);

    ws.on('listening', () => {
        console.info(`Websocket server is running on port ${port}`);
    });
}