import uuid from 'uuid/v4';

export class BulletModel { 
    point: string = 'point';
    skills: string[] = [];
}

export default class ExperienceModel{ 
    id?: string = 'new';
    position:  string ="Developer";
    company: string ="Company";
    bulletPoints: BulletModel[] = []; 
    date: string = "XXXX-XXXX";
}