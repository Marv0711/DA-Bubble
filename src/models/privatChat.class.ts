

export class privatChat {
    id: string;
    textAreaInput: string;
    chatTime: any;
    loginName: string;
    mail: string;
    member: any[];
    profileImg: string
    chatImage: string

    constructor(obj?: any) {
        this.textAreaInput = obj ? obj.textAreaInput : '';
        this.id = obj ? obj.id : '';
        this.mail = obj ? obj.mail : '';
        this.chatTime = obj ? obj.chatTime : '';
        this.loginName = obj ? obj.loginName : '';
        this.member = obj ? obj.member : '';
        this.profileImg = obj ? obj.profileImg : '';
        this.chatImage = obj ? obj.chatImage : '';
    }

    public toJSON() {
        return {
            id: this.id,
            textAreaInput: this.textAreaInput,
            mail: this.mail,
            chatTime: this.chatTime,
            loginName: this.loginName,
            member: this.member,
            profileImg: this.profileImg,
            chatImage: this.chatImage
        }
    }
}