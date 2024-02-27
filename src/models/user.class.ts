export class User {
    name:string;
    profileImg:string;
    id:any;


    constructor(obj?:any){
        this.name= obj ? obj.name : '';
        this.profileImg = obj ? obj.profileImg : '';
        this.id = obj ? obj.id : '';
    }

    public toJSON(){
        return{
            name : this.name,
            profileImg : this.profileImg,
            id: this.id
        }
    }

}