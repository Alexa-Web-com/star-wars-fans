import { useNavigate, useParams } from 'react-router-dom'
import './Film.css'
import { DICT } from '../../utils/constans'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { getIdFromUrl } from '../../utils/getIdFromUrl'
import { useGetDataUrl } from '../../utils/useGetDataUrl'
import Spinner from '../../components/Spinner/Spinner'
import Loading from '../../components/Loading/Loading'
import { API } from '../../utils/constans'
import film__backgroud_img from '../../assets/backgrounds/film.jpg'


const Film = (props) => {
    const [characters, setCharacters] = useState([])
    const [planets, setPlanets] = useState([])
    const [starships, setStarships] = useState([])
    const [vehicles, setVehicles] = useState([])
    const [species, setSpecies] = useState([])

    const { id } = useParams()
    const navigate = useNavigate()

    // GŁOWNY STAN W TYM KOMPONENCIE I JEGO USTALENIE NIEZALEŻNĄ FUNKCJĄ
    const [film, setFilm] = useState({})

    const url = `${API.films}/${id}`
    const [respUrlData, isSpinnerFilm] = useGetDataUrl(url)

    useEffect(() => {
        if (respUrlData) {
            setFilm(respUrlData)
        }
    }, [respUrlData])

    // USTALENIE POJEDYNCZEGO ELEMENTU W OSOBNYM STANIE NIEZALEŻNĄ FUNKCJĄ
    const charactersUrlArr = film.characters
    const [charactersRespDataText, isSpinnerCharacters] = useGetDataUrl(charactersUrlArr)
    useEffect(() => {
        if (charactersRespDataText) {
            const charactersArr = charactersRespDataText.map(characterData =>
            ({
                characterId: getIdFromUrl(JSON.parse(characterData).url),
                characterName: JSON.parse(characterData).name,
            }))
            setCharacters(charactersArr)
        }
    }, [charactersRespDataText])

    // USTALENIE POJEDYNCZEGO ELEMENTU W OSOBNYM STANIE NIEZALEŻNĄ FUNKCJĄ
    const planetsUrlArr = film.planets
    const [planetsRespDataText, isSpinnerPlanets] = useGetDataUrl(planetsUrlArr)
    useEffect(() => {
        if (planetsRespDataText) {
            const planetsArr = planetsRespDataText.map(planetData =>
            ({
                planetId: getIdFromUrl(JSON.parse(planetData).url),
                planetName: JSON.parse(planetData).name,
            }))
            setPlanets(planetsArr)
        }
    }, [planetsRespDataText])

    // USTALENIE POJEDYNCZYCH ELEMENTÓW W OSOBNYCH STANACH NIEZALEŻNĄ FUNKCJĄ
    const starshipsUrlArr = film.starships
    const vehiclesUrlArr = film.vehicles
    const speciesUrlArr = film.species

    const [starshipsRespDataText, isSpinnerStarships] = useGetDataUrl(starshipsUrlArr)
    const [vehiclesRespDataText, isSpinnerVehicles] = useGetDataUrl(vehiclesUrlArr)
    const [speciesRespDataText, isSpinnerSpecies] = useGetDataUrl(speciesUrlArr)

    useEffect(() => {
        if (starshipsRespDataText) {
            const starshipsArr = starshipsRespDataText.map(starshipData => JSON.parse(starshipData).name)
            setStarships(starshipsArr)
        }
    }, [starshipsRespDataText])

    useEffect(() => {
        if (vehiclesRespDataText) {
            const vehiclesArr = vehiclesRespDataText.map(vehicleData => JSON.parse(vehicleData).name)
            setVehicles(vehiclesArr)
        }
    }, [vehiclesRespDataText])

    useEffect(() => {
        if (speciesRespDataText) {
            const speciesArr = speciesRespDataText.map(specieData => JSON.parse(specieData).name)
            setSpecies(speciesArr)
        }
    }, [speciesRespDataText])


    const backHandler = () => {
        navigate(-1)
    }

    return (
        <>
            {isSpinnerFilm
                ?
                <Spinner />
                :
                <div className='film__cntr'>

                    <figure className='person__background_figure'>
                        <img src={film__backgroud_img} alt='star wars wallpaper' className='person__background_img' />
                    </figure>

                    <div className='person__page_wrapper'>
                        <Link className='back_link'
                            onClick={backHandler}>{`< Back`}</Link>

                        <div className='film__wrapper'>

                            <h1 className='film__title'>{film.title}</h1>

                            <div className='film__details_cntr'>
                                <p className='film__details_el'>
                                    {DICT[props.lang].filmEpisode_id}
                                    <span className='film__details_value'>{film.episode_id}</span>
                                </p>
                                <p className='film__details_el' style={{ fontStyle: 'italic' }}>
                                    {DICT[props.lang].filmOpening_crawl}
                                    <span className='film__details_value'>{film.opening_crawl}</span>
                                </p>
                                <p className='film__details_el'>
                                    {DICT[props.lang].filmDirector}
                                    <span className='film__details_value'>{film.director}</span>
                                </p>
                                <p className='film__details_el'>
                                    {DICT[props.lang].filmProducer}
                                    <span className='film__details_value'>{film.producer}</span>
                                </p>
                                <p className='film__details_el'>
                                    {DICT[props.lang].filmRelease_date}
                                    <span className='film__details_value'>{film.release_date}</span>
                                </p>
                                <p className='film__details_el'>
                                    {DICT[props.lang].filmPlanets}
                                    {isSpinnerPlanets
                                        ?
                                        <Loading />
                                        :
                                        planets.map((planet, index) =>
                                            (index <= planets.length - 2)
                                                ?
                                                <Link to={`/planets/${planet.planetId}`} key={index} className='film__details_link_value'>
                                                    {`${planet.planetName}, `}
                                                </Link>
                                                :
                                                <Link to={`/planets/${planet.planetId}`} key={index} className='film__details_link_value'>
                                                    {planet.planetName}
                                                </Link>
                                        )
                                    }
                                </p>
                                <p className='film__details_el'>{DICT[props.lang].filmCharacters}
                                    {isSpinnerCharacters
                                        ?
                                        <Loading />
                                        :
                                        characters.map((character, index) =>
                                            (index <= characters.length - 2)
                                                ?
                                                <Link to={`/people/${character.characterId}`} key={index} className='film__details_link_value'>
                                                    {`${character.characterName}, `}
                                                </Link>
                                                :
                                                <Link to={`/people/${character.characterId}`} key={index} className='film__details_link_value'>
                                                    {character.characterName}
                                                </Link>
                                        )
                                    }
                                </p>
                                <p className='film__details_el'>
                                    {DICT[props.lang].filmStarships}
                                    {isSpinnerStarships
                                        ?
                                        <Loading />
                                        :
                                        <span className='film__details_value'>{starships.join(', ')}</span>
                                    }
                                </p>
                                <p className='film__details_el'>
                                    {DICT[props.lang].filmVehicles}
                                    {isSpinnerVehicles
                                        ?
                                        <Loading />
                                        :
                                        <span className='film__details_value'>{vehicles.join(', ')}</span>
                                    }
                                </p>
                                <p className='film__details_el'>
                                    {DICT[props.lang].filmSpecies}
                                    {isSpinnerSpecies
                                        ?
                                        <Loading />
                                        :
                                        <span className='film__details_value'>{species.join(', ')}</span>
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


// filmStarships: "Starships: ",
// filmVehicles: "Vehicles: ",
// filmSpecies: "Species: ",


export default Film