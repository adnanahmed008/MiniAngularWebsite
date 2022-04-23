export class User {
    public name: string = "";
    public username: string = "";
    public city: string = "";
    public state: string = "";
    public country: string = "";
    public profession: string = "";
    public bio: string = "";
    public profilePicture: string = "";
    public lookingFor: string[] = [];
    public university: string = "";
    public base64ProfilePicture: string = "";
    public base64CoverImage: string = "";

    loadFrom(user: User) {
        this.name = user.name;
        this.username = user.username;
        this.city = user.city;
        this.state = user.state;
        this.country = user.country;
        this.profession = user.profession;
        this.bio = user.bio;
        this.profilePicture = user.profilePicture;
        this.lookingFor = user.lookingFor;
        this.university = user.university;
        this.base64ProfilePicture = user.base64ProfilePicture;
        this.base64CoverImage = user.base64CoverImage;

        return this;
    }

    getLocation() {
        return [this.city, this.state, this.country].join(", ");
    }
}
