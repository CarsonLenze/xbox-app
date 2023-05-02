import axl from "app-xbox-live";

export async function login(auth) {
    if (!auth) return null;
    console.log(auth)

    try {
        const xl = new axl.Account(auth);
        return xl
    } catch (error) {
        console.log(error)
        return null;
    }
}