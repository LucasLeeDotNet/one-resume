export default interface SkillModel{ 
    name:  string;
    level: number;
    interest: 'Low'|'Moderate'|'High'|'Highest'| string; 
    lastUsed: 'Before This Year'|'This Year'|'Last Month'|'This Month'|'Current' | string;
    icon: string;
    id?: string;
}