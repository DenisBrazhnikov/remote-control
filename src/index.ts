import {httpServer} from './server/http';
import {wsServer} from './server/websocket';
import {config} from 'dotenv';
import {join} from 'path';

const env = config({path: join(__dirname, '..', '.env')});

const wsPort = parseInt(String(env.parsed?.WEBSOCKET_PORT)) || 8080;
const httpPort = parseInt(String(env.parsed?.HTTP_PORT)) || 8000;

wsServer(wsPort).then(_ => {
});

httpServer.listen(httpPort, () => {
    console.info(`HTTP server is running on port ${httpPort}`);
})