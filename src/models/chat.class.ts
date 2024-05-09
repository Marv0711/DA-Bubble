export class Chat {
    id: string;
    textAreaInput: string;
    time: any;
    date: any;
    loginName: string;
    mail: string
    profileImg: string
    chatImage: string
    channelName:string
    static showEmojiPicker: any;

    constructor(obj?: any) {
        this.id = obj ? obj.id : '';
        this.textAreaInput = obj ? obj.textAreaInput : '';
        this.time = obj ? obj.time : '';
        this.date = obj ? obj.date : '';
        this.loginName = obj ? obj.loginName : '';
        this.mail = obj ? obj.mail : '';
        this.profileImg = obj ? obj.profileImg : '';
        this.chatImage = obj ? obj.chatImage : ''
        this.channelName = obj ? obj.channelName : ''
    }

    public toJSON() {
        return {
            id: this.id,
            textAreaInput: this.textAreaInput,
            time: this.time,
            date: this.date,
            loginName: this.loginName,
            mail: this.mail,
            profileImg: this.profileImg,
            chatImage: this.chatImage,
            channelName: this.channelName,
        }
    }

}