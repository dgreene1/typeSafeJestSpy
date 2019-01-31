type IPossibleFavoriteColors = "blue" | "green" | "red" | "purple" | "yellow";

export interface IUser {
    id: Readonly<number>,
    userName: string,
    favoriteColor?: IPossibleFavoriteColors,
    age: number
}

export const getUserById = async (userId: number): Promise<IUser> => {
    function makeRandomString(){
        const radix = 35;
        const stringLength = 7;
        return Math.random().toString(radix).substring(stringLength);
    }

    // since this is a silly example, we'll just return whatever
    return {
        id: userId,
        age: Math.random(),
        favoriteColor: "blue",
        userName: makeRandomString()
    }
}

export const aNonAsyncFunction = (userId: number): IUser => {
    // The internals do not matter since we will be mocking the response in the test
    return {
        id: userId,
        age: Math.random(),
        favoriteColor: "blue",
        userName: "BobSmith"
    }
}