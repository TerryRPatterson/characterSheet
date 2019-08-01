import {ipcMain} from 'electron';
import serializeError from 'serialize-error';

export default function createEndpoint(channel, listener) {
    ipcMain.on(channel, async ({reply}, ack, ...args) => {
        try {
            const response = await listener(...args);
            reply(`${channel}-${ack}`, null, response);
        } catch (error) {
            const serializedError = serializeError(error);
            reply(`${channel}-${ack}`, serializedError);
        }
    });
}
