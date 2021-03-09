import { Guest } from "./guest.model";

export class User {

    constructor(
        public username: string,
        public id?: number,
        public guest?: Guest
    ) { }
}