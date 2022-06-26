import {httpServer} from './http_server';

httpServer.listen(8080, () => {
    console.info("========================================");
    console.info(`Static server running on port 8080`);
})