export class Viaje{
    constructor(
        public id:number,
        public referenci:string,
        public pedido:string,
        public destino:string,
        public origen:string,
        public operador:string,
        public fechasalida:string,
        public fechallegada:string
    ){}
}