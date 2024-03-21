

export class privatChat {
    textAreaInput: string;
    chatTime:any;
    loginName:string;
    member:any[];
    profileImg:string

    constructor(obj?:any){
        this.textAreaInput = obj ? obj.textAreaInput : '';
        this.chatTime = obj ? obj.chatTime : '';
        this.loginName = obj ? obj.loginName : '';
        this.member = obj ? obj.member : '';
        this.profileImg = obj ? obj.profileImg : '';
    }

    public toJSON(){
        return{
            textAreaInput : this.textAreaInput,
            chatTime : this.chatTime,
            loginName : this.loginName,
            member : this.member,
            profileImg : this.profileImg,
        }
    }

}