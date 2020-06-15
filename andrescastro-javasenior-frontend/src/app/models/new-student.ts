export class NewStudent {
    id?: number;
    rut: string;
    name: string;
    lastName: string;
    age: number;
    nameUser: string;
    password: string;
    courses: [];
    constructor(rut: string, name: string, lastName: string , age: number, nameUser: string , password: string) {
        this.rut = rut;
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.nameUser = nameUser;
        this.password = password;
    }
}
