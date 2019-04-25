import uuid from 'uuid/v4';

export default class ExperienceModel{ 
    id?: string = 'new';
    position:  string ="Developer";
    company: string ="Company";
    bulletPoints: string[] = []; 
    date: string = "XXXX-XXXX";
}