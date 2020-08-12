import { Deserializable } from './Deserializable';

export class Token implements Deserializable {

    token: string;
    expiraEm: Date;

    constructor() {

    }

    deserialize(input: any): this {

        if (input) {
            this.token = input.token;
            this.expiraEm = new Date(input.expiraEm);
        }

        return this;
    }

    convert(input: any): this {

        if (input) {

            this.token = input.access_token;

            let date = new Date();
            date.setSeconds(date.getSeconds() + input.expires_in);

            this.expiraEm = date;
        }

        return this;
    }

}
