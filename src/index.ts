import {httpServer} from './server/http';
import './server/websocket';

httpServer.listen(8000, () => {
    console.info(`HTTP server is running on port 8000`);
})