import { useEffect, useState } from "react"

export const useGetDataUrl = (url) => {
    const [dataFromUrl, setDataFromUrl] = useState()
    const [isSpinner, setIsSpinner] = useState(false)

    useEffect(() => {
        const getDataAsync = async () => {
            if (Array.isArray(url) === true) {
                setIsSpinner(true)
                try {
                    const dataArrText = await Promise.all(url.map(async singleUrl => {
                        const resp = await fetch(singleUrl);
                        return resp.text();
                    }));
                    setDataFromUrl(dataArrText)
                } catch (err) {
                    console.log(err)
                }
                finally {
                    setIsSpinner(false)
                }
            }
            if (typeof url === 'string') {
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