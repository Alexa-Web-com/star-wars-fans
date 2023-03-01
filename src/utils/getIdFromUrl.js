export const getIdFromUrl = (urlString) => {
    const urlArrWithId = urlString.split('/')
    const idFromUrl = urlArrWithId[urlArrWithId.length - 2]
    return idFromUrl
}