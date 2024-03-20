export class Chat {
    id:string;
    textAreaInput: string;
    chatTime:any;
    chatDate:any;
    loginName:string;
    mail:string
    profileImg:string
    


    constructor(obj?:any){
        this.id = obj ? obj.id : '';
        this.textAreaInput = obj ? obj.textAreaInput : '';
        this.chatTime = obj ? obj.chatTime : '';
        this.chatDate = obj ? obj.chatDate : '';
        this.loginName = obj ? obj.loginName : '';
        this.mail = obj ? obj.mail : '';
        this.profileImg = obj ? obj.profileImg : '';
    }

    public toJSON(){
        return{
            id: this.id,
            textAreaInput : this.textAreaInput,
            chatTime : this.chatTime,
            chatDate : this.chatDate,
            loginName : this.loginName,
            mail : this.mail,
            profileImg : this.profileImg
        }
    }

}