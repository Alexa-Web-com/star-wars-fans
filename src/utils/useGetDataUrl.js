import { useEffect, useState } from "react"

export const useGetDataUrl = (url) => {
    const [dataFromUrl, setDataFromUrl] = useState()
    const [isSpinner, setIsSpinner] = useState(false)
    // const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getDataAsync = async () => {
            // if (typeof url === "object") {
            if (Array.isArray(url) === true) {
                setIsSpinner(true)
                const dataArrText = await Promise.all(url.map(async singleUrl => {
                    const resp = await fetch(singleUrl);
                    return resp.text();
                }));
                setDataFromUrl(dataArrText)
                setIsSpinner(false)
            }
            else if (typeof url === "string") {
                setIsSpinner(true)
                try {
                    const res = await fetch(url)
                    const data = await res.json()
                    setDataFromUrl(data)
                } catch (err) {
                    console.log(err)
                }
                finally {
                    setIsSpinner(false)
                }
            }
        }

        if (url) {
            getDataAsync()
        }
    }, [url])

    return [dataFromUrl, isSpinner]
}