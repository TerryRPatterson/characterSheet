export function write(stream, ...data) {
    // eslint-disable-next-line promise/avoid-new
    return new Promise((resolve, reject) => {
        stream.write(data, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
        stream.on('error', (error) => reject(error));
    });
}
