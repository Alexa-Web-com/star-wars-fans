import { useNavigate, useParams } from 'react-router-dom'
import './Person.css'
import { DICT } from '../../utils/constans'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { getIdFromUrl } from '../../utils/getIdFromUrl'
import { useGetDataUrl } from '../../utils/useGetDataUrl'
import Spinner from '../../components/Spinner/Spinner'
import Loading from '../../components/Loading/Loading'
import { API } from '../../utils/constans'
import person__backgroud_img from '../../assets/backgrounds/person.jpg'

const Person = (props) => {
    const [homeworld, setHomeworld] = useState([])
    const [films, setFilms] = useState([])
    const [starships, setStarships] = useState([])
    const [vehicles, setVehicles] = useState([])

    const { id } = useParams()
    const navigate = useNavigate()

    // GŁOWNY STAN W TYM KOMPONENCIE I JEGO USTALENIE NIEZALEŻNĄ FUNKCJĄ
    const [person, setPerson] = useState({})

    const url = `${API.characters}/${id}`
    const [respUrlData, isSpinnerPerson] = useGetDataUrl(url)
    useEffect(() => {
        if (respUrlData) {
            setPerson(respUrlData)
        }
    }, [respUrlData])

    // USTALENIE POJEDYNCZEGO ELEMENTU W OSOBNYM STANIE NIEZALEŻNĄ FUNKCJĄ
    const homeworldUrl = person.homeworld
    const [homeworldRespData, isSpinnerHomeworld] = useGetDataUrl(homeworldUrl)
    useEffect(() => {
        if (homeworldRespData) {
            const urlArrWithId = homeworldRespData.url.split('/')
            const idFromUrl = urlArrWithId[urlArrWithId.length - 2]
            const homewordData = {
                homeworldId: idFromUrl,
                homeworldName: homeworldRespData.name,
            }
            setHomeworld(homewordData)
        }
    }, [homeworldRespData])

    // USTALENIE POJEDYNCZEGO ELEMENTU W OSOBNYM STANIE NIEZALEŻNĄ FUNKCJĄ
    const filmsUrlArr = person.films
    const [filmsRespDataText, isSpinnerFilms] = useGetDataUrl(filmsUrlArr)
    useEffect(() => {
        if (filmsRespDataText) {
            const filmsArr = filmsRespDataText.map(filmData =>
            ({
                filmId: getIdFromUrl(JSON.parse(filmData).url),
                filmTitle: JSON.parse(filmData).title,
            }))
            setFilms(filmsArr)
        }
    }, [filmsRespDataText])

    // USTALENIE POJEDYNCZYCH ELEMENTÓW W OSOBNYCH STANACH NIEZALEŻNĄ FUNKCJĄ
    const starshipsUrlArr = person.starships
    const vehiclesUrlArr = person.vehicles
    const [starshipsRespDataText, isSpinnerStarships] = useGetDataUrl(starshipsUrlArr)
    const [vehiclesRespDataText, isSpinnerVehicles] = useGetDataUrl(vehiclesUrlArr)

    useEffect(() => {
        if (starshipsRespDataText) {
            const starshipsArr = starshipsRespDataText.map(starshipData => JSON.parse(starshipData).name)
            setStarships(starshipsArr)
        }
        if (vehiclesRespDataText) {
            const vehiclesArr = vehiclesRespDataText.map(vehicleData => JSON.parse(vehicleData).name)
            setVehicles(vehiclesArr)
        }
    }, [starshipsRespDataText, vehiclesRespDataText])

    const backHandler = () => {
        navigate(-1)
    }


    return (
        <>
            {isSpinnerPerson
                ?
                <Spinner />
                :
                <div className='person__cntr'>

                    <figure className='person__background_figure'>
                        <img src={person__backgroud_img} alt='star wars wallpaper' className='person__background_img' />
                    </figure>

                    <div className='person__page_wrapper'>
                        <Link className='back_link'
                            onClick={backHandler}>{`< ${DICT[props.lang].backLink}`}</Link>

                        <div className='person__wrapper'>

                            <h1 className='person__name'>{person.name}</h1>

                            <div className='person__details_cntr'>
                                <p>
                                    {DICT[props.lang].personGender}
                                    <span className='person__details_value'>{person.gender}</span>
                                </p>
                                <p>
                                    {DICT[props.lang].personBirthYeear}
                                    <span className='person__details_value'>{person.birth_year}</span>
                                </p>
                                <p>
                                    {DICT[props.lang].personEyeColor}
                                    <span className='person__details_value'>{person.eye_color}</span>
                                </p>
                                <p>
                                    {DICT[props.lang].personHairColor}
                                    <span className='person__details_value'>{person.hair_color}</span>
                                </p>
                                <p>
                                    {DICT[props.lang].personHeight}
                                    <span className='person__details_value'>{person.height} cm</span>
                                </p>
                                <p>
                                    {DICT[props.lang].personMass}
                                    <span className='person__details_value'>{person.mass} {DICT[props.lang].personMassUnit}</span>
                                </p>
                                <p>
                                    {DICT[props.lang].personHomeworld}
                                    {isSpinnerHomeworld
                                        ?
                                        <Loading />
                                        :
                                        <Link to={`/planets/${homeworld.homeworldId}`} className='person__details_link_value'>
                                            {homeworld.homeworldName}
                                        </Link>
                                    }
                                </p>
                                <p>
                                    {DICT[props.lang].personFilms}
                                    {isSpinnerFilms
                                        ?
                                        <Loading />
                                        :
                                        films.map((film, index) =>
                                            (index <= films.length - 2)
                                                ?
                                                <Link to={`/films/${film.filmId}`} key={index} className='person__details_link_value'>
                                                    {`${film.filmTitle}, `}
                                                </Link>
                                                :
                                                <Link to={`/films/${film.filmId}`} key={index} className='person__details_link_value'>
                                                    {film.filmTitle}
                                                </Link>
                                        )
                                    }
                                </p>
                                <p>
                                    {DICT[props.lang].personStarships}
                                    {isSpinnerStarships
                                        ?
                                        <Loading />
                                        :
                                        <span className='person__details_value'>{starships.join(', ')}</span>
                                    }
                                </p>
                                <p>
                                    {DICT[props.lang].personVehicles}
                                    {isSpinnerVehicles
                                        ?
                                        <Loading />
                                        :
                                        <span className='person__details_value'>{vehicles.join(', ')}</span>
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            }</>
    )
}


export default Person