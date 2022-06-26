import {WebSocketServer} from 'ws';
import {message} from './message';

const ws = new WebSocketServer({
    port: 8080,
});

ws.on('connection', message);

ws.on('listening', () => {
    console.info(`Websocket server is running on port 8080`);
});