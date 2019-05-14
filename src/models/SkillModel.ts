export default class SkillModel {
    public name: string = "";
    public level: number = 5;
    public interest: "Low"|"Moderate"|"High"|"Highest"| string = "High";
    public lastUsed: "Before This Year"|"This Year"|"Last Month"|"This Month"|"Current" | string = "Current";
    public icon: string = "Js";
    public id?: string = "new";
}
