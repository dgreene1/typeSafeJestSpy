type IPossibleFavoriteColors = "blue" | "green" | "red" | "purple" | "yellow";

export interface IUser {
    id: Readonly<number>,
    userName: string,
    favoriteColor?: IPossibleFavoriteColors,
    age: number
}

export const getUserById = async (userId: number): Promise<IUser> => {
    function makeRandomString(){
        return Math.random().toString(36).substring(7);
    }

    // since this is a silly example, we'll just return whatever
    return {
        id: userId,
        age: Math.random(),
        favoriteColor: "blue",
        userName: makeRandomString()
    }
}