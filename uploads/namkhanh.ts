interface IUser { 
    name: string,
    age: number,
    address?: string
}
var a: IUser[] = [{
    name: 'Nguyen Nam Khanh',
    age: 21,
    address:'Nam Dinh'
}]

interface IFullName {
    fullName: IUser[],
    phoneNumber:number,
    list: () => void,
    last:() => number,
    all?: boolean
}
var list = () => {console.log('Hello Typescript')}
var last = () => 2002

var b: IFullName = {
    fullName: a,
    phoneNumber: 345712222,
    list: list,
    last : last,
    all: true
}

enum Color {Red = 1, Green, Blue};
let colorName: string = Color[2];

alert(colorName);

