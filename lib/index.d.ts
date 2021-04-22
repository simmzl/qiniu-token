interface Options {
    bucket: string;
    accessKey: string;
    secretKey: string;
    expire: number;
}
interface OptionalOptions extends Pick<Options, 'bucket' | 'accessKey' | 'secretKey'> {
    expire?: Partial<Options['expire']>;
}
export default class QUploadToken {
    private option;
    constructor(option: OptionalOptions);
    private utf16to8;
    private base64encode;
    private safe64;
    getToken(): string;
}
export {};
