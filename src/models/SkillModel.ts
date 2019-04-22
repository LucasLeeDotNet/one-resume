export default interface SkillModel{ 
    name:  string;
    level: number;
    interest: 'Low'|'Moderate'|'High'|'Highest'; 
    lastUsed: 'Before This Year'|'This Year'|'Last Month'|'This Month'|'Current';
    icon: string;
}