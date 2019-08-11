import {write} from 'common/Promisified';

export async function error(error) {
    await write(process.stderr, error);
    // eslint-disable-next-line no-debugger
    debugger;
}
