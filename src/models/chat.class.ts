export class Chat {
    id:string;
    textAreaInput: string;


    constructor(obj?:any){
        this.id = obj ? obj.id : '';
        this.textAreaInput = obj ? obj.textAreaInput : '';
    }

    public toJSON(){
        return{
            id: this.id,
            textAreaInput : this.textAreaInput
        }
    }

}