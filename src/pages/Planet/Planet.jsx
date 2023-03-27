import { useNavigate, useParams } from 'react-router-dom'
import './Planet.css'
import { DICT } from '../../utils/constans'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { getIdFromUrl } from '../../utils/getIdFromUrl'
import { useGetDataUrl } from '../../utils/useGetDataUrl'
import Spinner from '../../components/Spinner/Spinner'
import Loading from '../../components/Loading/Loading'
import { API } from '../../utils/constans'
import planet__backgroud_img from '../../assets/backgrounds/planet.webp'

const Planet = (props) => {
    const [residents, setResidents] = useState([])
    const [films, setFilms] = useState([])

    const { id } = useParams()
    const navigate = useNavigate()

    // GŁOWNY STAN W TYM KOMPONENCIE I JEGO USTALENIE NIEZALEŻNĄ FUNKCJĄ
    const [planet, setPlanet] = useState({})

    const url = `${API.planets}/${id}`
    const [respUrlData, isSpinnerPlanet] = useGetDataUrl(url)

    useEffect(() => {
        if (respUrlData) {
            setPlanet(respUrlData)
        }
    }, [respUrlData])

    // USTALENIE POJEDYNCZEGO ELEMENTU W OSOBNYM STANIE NIEZALEŻNĄ FUNKCJĄ
    const filmsUrlArr = planet.films
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

    // USTALENIE POJEDYNCZEGO ELEMENTU W OSOBNYM STANIE NIEZALEŻNĄ FUNKCJĄ
    const residentsUrlArr = planet.residents
    const [residentsRespDataText, isSpinnerResidents] = useGetDataUrl(residentsUrlArr)
    useEffect(() => {
        if (residentsRespDataText) {
            const residentsArr = residentsRespDataText.map(residentData =>
            ({
                residentId: getIdFromUrl(JSON.parse(residentData).url),
                residentName: JSON.parse(residentData).name,
            }))
            setResidents(residentsArr)
        }
    }, [residentsRespDataText])

    const backHandler = () => {
        navigate(-1)
    }

    return (
        <>
            {isSpinnerPlanet
                ?
                <Spinner />
                :
                <div className='planet__cntr'>

                    <figure className='planet__background_figure'>
                        <img src={planet__backgroud_img} alt='star wars wallpaper' className='planet__background_img' />
                    </figure>

                    <div className='planet__page_wrapper'>
                        <Link className='back_link'
                            onClick={backHandler}>{`< ${DICT[props.lang].backLink}`}</Link>

                        <div className='person__wrapper'>

                            <h1 className='planet__name'>{planet.name}</h1>

                            <div className='planet__details_cntr'>
                                <p>
                                    {DICT[props.lang].planetPopulation}
                                    <span className='planet__details_value'>{planet.population}</span>
                                </p>
                                <p>
                                    {DICT[props.lang].planetDiameter}
                                    <span className='planet__details_value'>{planet.diameter}</span>
                                </p>
                                <p>
                                    {DICT[props.lang].planetRotationPeriod}
                                    <span className='planet__details_value'>{planet.rotation_period}</span>
                                </p>
                                <p>
                                    {DICT[props.lang].planetOrbitalPeriod}
                                    <span className='planet__details_value'>{planet.orbital_period}</span>
                                </p>
                                <p>
                                    {DICT[props.lang].planetClimate}
                                    <span className='planet__details_value'>{planet.climate}</span>
                                </p>
                                <p>
                                    {DICT[props.lang].planetGravity}
                                    <span className='planet__details_value'>{planet.gravity}</span>
                                </p>
                                <p>
                                    {DICT[props.lang].planetTerrain}
                                    <span className='planet__details_value'>{planet.terrain}</span>
                                </p>
                                <p>
                                    {DICT[props.lang].planetSurfaceWater}
                                    <span className='planet__details_value'>{planet.surface_water}</span>
                                </p>
                                <p style={{ margin: "0.5rem 0" }}>
                                    {DICT[props.lang].planetResidents}
                                    {isSpinnerResidents
                                        ?
                                        <Loading />
                                        :
                                        residents.map((resident, index) =>
                                            (index <= residents.length - 2)
                                                ?
                                                <Link to={`/people/${resident.residentId}`} key={index} className='planet__details_link_value'>
                                                    {` ${resident.residentName}, `}
                                                </Link>
                                                :
                                                <Link to={`/people/${resident.residentId}`} key={index} className='planet__details_link_value'>
                                                    {resident.residentName}
                                                </Link>
                                        )
                                    }
                                </p>
                                <p>{DICT[props.lang].planetFilms}
                                    {isSpinnerFilms
                                        ?
                                        <Loading />
                                        :
                                        films.map((film, index) =>
                                            (index <= films.length - 2)
                                                ?
                                                <Link to={`/films/${film.filmId}`} key={index} className='planet__details_link_value'>
                                                    {`${film.filmTitle}, `}
                                                </Link>
                                                :
                                                <Link to={`/films/${film.filmId}`} key={index} className='planet__details_link_value'>
                                                    {film.filmTitle}
                                                </Link>
                                        )
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}


export default Planet