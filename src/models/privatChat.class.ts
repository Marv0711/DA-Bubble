

export class privatChat {
    textAreaInput: string;
    chatTime:any;
    loginName:string;
    member:any[];

    constructor(obj?:any){
        this.textAreaInput = obj ? obj.textAreaInput : '';
        this.chatTime = obj ? obj.chatTime : '';
        this.loginName = obj ? obj.loginName : '';
        this.member = obj ? obj.member : '';
    }

    public toJSON(){
        return{
            textAreaInput : this.textAreaInput,
            chatTime : this.chatTime,
            loginName : this.loginName,
            member : this.member,
        }
    }

}