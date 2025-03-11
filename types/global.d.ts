
interface Categories {
    _id: string,
    name: string,
}

interface Author {
    _id: string,
    name: string,
    email: string,
    image?: string,
}

interface Subunits {
    _id: string,
    name: string,
    brandname?: string,
    modelname?: string,
    serialNumber?: string,
    assetTag?: string,
}

interface Equipment {
        _id: string,
        name: string,
        brandname?: string,
        modelname?: string,
        serialNumber?: string,
        assetTag?: string,
        subunits?: Subunits[],
        labNumber: string,
        labName?: string,
        team: string,
        serviceDate?: Date,
        comment?: string,
        categories: Categories[],
        imgUrl?: string,
        author?: Author,
        views?: string | number,
        createdAt: Date,
    }
    