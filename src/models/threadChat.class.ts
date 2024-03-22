export class ThreadChat {
    id:string;
    threadAreaInput: string;
    threadTime:any;
    threadDate:any;
    loginName:string;
    mail:string
    profileImg:string


    constructor(obj?:any){
        this.id = obj ? obj.id : '';
        this.threadAreaInput = obj ? obj.textAreaInput : '';
        this.threadTime = obj ? obj.threadTime : '';
        this.threadDate = obj ? obj.threadDate : '';
        this.loginName = obj ? obj.loginName : '';
        this.mail = obj ? obj.mail : '';
        this.profileImg = obj ? obj.profileImg : '';
    }

    public toJSON(){
        return{
            id: this.id,
            threadAreaInput : this.threadAreaInput,
            threadTime : this.threadTime,
            threadDate : this.threadDate,
            loginName : this.loginName,
            mail : this.mail,
            profileImg : this.profileImg
        }
    }

}