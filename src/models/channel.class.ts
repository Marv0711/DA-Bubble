export class Channel {
    idChannel:string;
    channelName:string;
    channelDescription:string;


    constructor(obj?:any){
        this.idChannel = obj ? obj.id : '';
        this.channelName = obj ? obj.channelName : '';
        this.channelDescription = obj ? obj.channelDescription : '';
    
    }

    public toJSON(){
        return{
            idChannel: this.idChannel,
            channelName: this.channelName
        }
    }
}