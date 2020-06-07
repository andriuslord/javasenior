export class NewStudent {
    rut: string;
    name: string;
    lastName: string;
    age: number;
    nameUser: string;
    password: string;
    constructor(rut: string, name: string, lastName: string , age: number, nameUser: string , password: string) {
        this.rut = rut;
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.nameUser = nameUser;
        this.password = password;
    }
}
