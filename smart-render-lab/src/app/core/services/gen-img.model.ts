interface IGenImg { 
    img: ArrayBuffer
}

export class GenImage implements IGenImg {
    constructor(public img: ArrayBuffer) { }
}