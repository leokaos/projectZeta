import { Deserializable } from './Deserializable';

export class User implements Deserializable {

    id: string;
    avatar: string;
    email: string;

    deserialize(input: any): this {

        Object.assign(this, input);

        return this;
    }

}
