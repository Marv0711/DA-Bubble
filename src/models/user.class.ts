export class User {
    name:string;
    mail:string;
    profileImg:string;
    online:boolean;



    constructor(obj?:any){
        this.name = obj ? obj.name : '';
        this.mail = obj ? obj.mail : '';
        this.profileImg = obj ? obj.profileImg : '';
        this.online = obj ? obj.online : false;
    }

    public toJSON(){
        return{
            name : this.name,
            mail : this.mail,
            profileImg : this.profileImg,
            online : this.online,
        }
    }

}