import moment from 'moment';

export class User{
    constructor(user){
        this.user = user;
    }

    get uid(){
        return this.user.uid;
    }

    get nickName(){
        return this.user.nickName;
    }

    get gender(){
        return this.user.gender;
    }

    get grade(){
        return this.user.grade;
    }

    get yearsOnJob(){
        return this.user.yearsOnJob;
    }

    get department(){
        return this.user.department;
    }

    get phoneNumber(){
        return this.user.phoneNumber;
    }

    get registrationDate(){
        return moment.unix(this.user.createdAt.seconds).format('YYYY-MM-DD HH:mm');
    }

    get lastLoginTime(){
        return this.user.updatedAt && moment.unix(this.user.updatedAt.seconds).format('YYYY-MM-DD HH:mm');
    }

    get profileImageUrl(){
        return this.user.profileImageUrl;
    }
}