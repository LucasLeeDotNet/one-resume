export default class SkillModel{ 
    name:  string ='';
    level: number = 5;
    interest: 'Low'|'Moderate'|'High'|'Highest'| string = 'High'; 
    lastUsed: 'Before This Year'|'This Year'|'Last Month'|'This Month'|'Current' | string = 'Current';
    icon: string = '';
    id?: string = "new";
}