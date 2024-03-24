export class Chat {
    id:string;
    textAreaInput: string;
    Time:any;
    Date:any;
    loginName:string;
    mail:string
    profileImg:string
    


    constructor(obj?:any){
        this.id = obj ? obj.id : '';
        this.textAreaInput = obj ? obj.textAreaInput : '';
        this.Time = obj ? obj.Time : '';
        this.Date = obj ? obj.Date : '';
        this.loginName = obj ? obj.loginName : '';
        this.mail = obj ? obj.mail : '';
        this.profileImg = obj ? obj.profileImg : '';
    }

    public toJSON(){
        return{
            id: this.id,
            textAreaInput : this.textAreaInput,
            Time : this.Time,
            Date : this.Date,
            loginName : this.loginName,
            mail : this.mail,
            profileImg : this.profileImg
        }
    }

}