export class User {
    firstName: string;
    lastName:string;
    profileImg:string;
    id:any;


    constructor(obj?:any){
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.profileImg = obj ? obj.profileImg : '';
        this.id = obj ? obj.id : '';
    }

    public toJSON(){
        return{
            firstName : this.firstName,
            lastName : this.lastName,
            profileImg : this.profileImg,
            id: this.id
        }
    }

}