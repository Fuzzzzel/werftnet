/**
 * Object to hold all information the application can know about a user.
 */
export class User {
    id: Number;
    username: string = null;
    email: string = null;
    roles: string[] = [];

    clearData(): void {
        this.id = null;
        this.username = null;
        this.roles = [];
    }

    hasRole(role: string) {

        return this.roles.indexOf(role) >= 0;
    }
}