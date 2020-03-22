

export interface IUser {
    sys_id: string;
    user_id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    dob: Date;
    department: string;
}

export interface IUserAttendance {
    first_name: string;
    middle_name: string;
    last_name: string;
}
