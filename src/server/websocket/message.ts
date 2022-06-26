import {createWebSocketStream, WebSocket} from 'ws';
import actions from './actions';

export const message = (ws: WebSocket) => {
    const stream = createWebSocketStream(ws, {
        encoding: 'utf8',
        decodeStrings: false,
    });

    stream.on('data', async (data: Buffer) => {
        const [action, ...args] = data.toString().split(' ');

        if (Object.keys(actions).includes(action)) {
            try {
                console.info(`Executing ${action}: ${args}`);

                const result = await actions[action as keyof typeof actions](
                    ...(args as [never, any]).map((arg, _) => parseInt(String(arg))) as [never, number]
                );

                stream.write((result || action) + ' \\0');
            } catch {
                console.info(`Could not execute ${action}: ${args}`);
            }
        } else {
            console.info(`Got unknown action ${action}: ${args}`);
        }
    });

    ws.on('close', () => {
        console.info('Websocket connection closed');
        stream.destroy();
    });
};