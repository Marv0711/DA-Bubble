export class ThreadChat {
    id: string;
    threadAreaInput: string;
    Time: any;
    Date: any;
    loginName: string;
    mail: string
    profileImg: string
    threadImage: string
    channelName:string

    constructor(obj?: any) {
        this.id = obj ? obj.id : '';
        this.threadAreaInput = obj ? obj.textAreaInput : '';
        this.Time = obj ? obj.Time : '';
        this.Date = obj ? obj.Date : '';
        this.loginName = obj ? obj.loginName : '';
        this.mail = obj ? obj.mail : '';
        this.profileImg = obj ? obj.profileImg : '';
        this.threadImage = obj ? obj.threadImage : ''
        this.channelName = obj ? obj.channelName : ''
    }

    public toJSON() {
        return {
            id: this.id,
            threadAreaInput: this.threadAreaInput,
            Time: this.Time,
            Date: this.Date,
            loginName: this.loginName,
            mail: this.mail,
            profileImg: this.profileImg,
            threadImage: this.threadImage,
            channelName: this.channelName,
        }
    }

}