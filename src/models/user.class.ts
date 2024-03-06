export class User {
    name:string;
    mail:string;
    profileImg:string;



    constructor(obj?:any){
        this.name = obj ? obj.name : '';
        this.mail = obj ? obj.mail : '';
        this.profileImg = obj ? obj.profileImg : '';
    }

    public toJSON(){
        return{
            name : this.name,
            mail : this.mail,
            profileImg : this.profileImg,
        }
    }

}