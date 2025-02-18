
const ROUTES = {
    HOME: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    TEAM: "/team",
    COLLECTION: "/collections",
    CATEGORIES: (id: string ) => `categories/${id}`, 
    PROFILE: (id: string) => `profile/${id}`,
}

export default ROUTES;