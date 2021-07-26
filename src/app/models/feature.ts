export interface Feature {
    id?: String;
    displayName?: String;    
    technicalName: String;
    expiresOn?: Date;
    description?: String;
    inverted: boolean;
    customerIds: String[];
    archived: boolean;
}