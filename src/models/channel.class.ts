export class Channel {
    users:any;
    name:string;
    description:string;


    constructor(obj?:any){
        this.users = obj ? obj.id : ['gast@gast.de'];
        this.name = obj ? obj.channelName : '';
        this.description = obj ? obj.channelDescription : '';
    
    }

    public toJSON(){
        return{
            name: this.name,
            description: this.description,
            users: this.users
        }
    }
}