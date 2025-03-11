
const ROUTES = {
    HOME: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    TEAM: "/team",
    COLLECTION: "/collections",
    ADD_EQUIPMENT: "/add-equipment",
    CATEGORIES: (id: string ) => `categories/${id}`, 
    PROFILE: (id: string) => `profile/${id}`,
    EQUIPMENT: (id: string) => `equipment/${id}`,
}

export default ROUTES;