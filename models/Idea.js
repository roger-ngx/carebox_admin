import { filter, join, map } from 'lodash';
import moment from 'moment';

export class Idea{
    constructor(idea){
        this.idea = idea;
    }

    get id(){
        return this.idea.id;
    }

    get owner(){
        return this.idea.owner;
    }

    get ownerNickname(){
        return this.idea.owner.nickName;
    }

    get category(){
        return this.idea.category;
    }

    get detail(){
        return this.idea.detail;
    }

    get subject(){
        return this.idea.subject;
    }

    get scampers(){
        return join(this.idea.scampers, '   ');
    }

    get registrationDate(){
        return moment.unix(this.idea.createdAt.seconds).format('YYYY-MM-DD HH:mm').toString();
    }

    get pickedUsers(){
        return filter(this.idea.picks, pick => pick.status === 'ACCEPTED_TO_PICK');
    }

    get pickedUsernames(){
        return map(this.pickedUsers, pick => pick.nickName);
    }

    get rating(){
        return this.idea.rating;
    }
}