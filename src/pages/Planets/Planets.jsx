import { useState, useEffect } from 'react'
import './Planets.css'
import { DICT } from '../../utils/constans'
import { Link } from 'react-router-dom'
import { useGetDataUrl } from '../../utils/useGetDataUrl'
import Spinner from '../../components/Spinner/Spinner'
import { API } from '../../utils/constans'
import planets__backgroud_img from '../../assets/backgrounds/planets.jpg'

const Planets = (props) => {
    const [searchName, setSearchName] = useState('')

    const [respUrlDataPlanets, isSpinnerPlanets] = useGetDataUrl(API.planets)
    useEffect(() => {
        if (respUrlDataPlanets) {
            const planetsWithId = respUrlDataPlanets.results.map(planet => ({
                ...planet,
                id: respUrlDataPlanets.results.indexOf(planet) + 1
            }))
            props.setPlanets(planetsWithId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [respUrlDataPlanets])

    return (
        <>
            {isSpinnerPlanets
                ?
                <Spinner />
                :
                <div className='planets__cntr'>

                    <figure className='planets__background_figure'>
                        <img src={planets__backgroud_img} alt='star wars wallpaper' className='planets__background_img' />
                    </figure>

                    <div className='planets__wrapper'>
                        <input className='app__search_input'
                            type="text"
                            placeholder={DICT[props.lang].search}
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                        <div className='planets__content_cntr'>
                            {props.planets
                                .filter(item => item.name.toLowerCase().includes(searchName.toLowerCase()))
                                .map((planet, index) =>
                                    <div className='planets__content' key={index}>
                                        <h3>
                                            {DICT[props.lang].planetsName}
                                            <span className='planets__planet_name'>{planet.name}</span>
                                        </h3>
                                        <p>
                                            <span className='planets__planet_item_desc'>{DICT[props.lang].planetsPopulation}</span>
                                            {planet.population}
                                        </p>
                                        <p>
                                            <span className='planets__planet_item_desc'>{DICT[props.lang].planetsDiameter}</span>
                                            {planet.diameter}
                                        </p>
                                        <Link to={`/planets/${planet.id}`} className='planets__more'>
                                            {DICT[props.lang].moreInfoLink}
                                        </Link>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Planets