import { useState, useEffect } from 'react'
import './Films.css'
import { DICT } from '../../utils/constans'
import { Link } from 'react-router-dom'
import Spinner from '../../components/Spinner/Spinner'
import { useGetDataUrl } from '../../utils/useGetDataUrl'
import { API } from '../../utils/constans'
import films__backgroud_img from '../../assets/backgrounds/films.jpg'

const Films = (props) => {
    const [searchName, setSearchName] = useState('')

    // USTALENIE STANU W App NIEZALEŻNĄ FUNKCJĄ
    const [respUrlDataFilms, isSpinnerFilms] = useGetDataUrl(API.films)
    useEffect(() => {
        if (respUrlDataFilms) {
            const filmssWithId = respUrlDataFilms.results.map(film => ({
                ...film,
                id: respUrlDataFilms.results.indexOf(film) + 1
            }))
            props.setFilms(filmssWithId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [respUrlDataFilms])

    return (
        <>
            {isSpinnerFilms
                ?
                <Spinner />
                :
                <div className='films__cntr'>
                    <div className='films__content_cntr'>
                        <input className='app__search_input'
                            type="text"
                            placeholder={DICT[props.lang].search}
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                        {props.films
                            .filter(item => item.title.toLowerCase().includes(searchName.toLowerCase()))
                            .map((film, index) =>
                                <div className='films__content' key={index}>
                                    <h3>{DICT[props.lang].filmsTitle}
                                        <span className='films__film_title'>{film.title}</span>
                                    </h3>
                                    <p>
                                        <span className='films__film_item_desc'>
                                            {DICT[props.lang].filmsReleaseDate}
                                        </span>
                                        {film.release_date}
                                    </p>
                                    <div className='films__film_cntr'>
                                        <p>
                                            <span className='films__film_item_desc'>
                                                {DICT[props.lang].filmsEpisodeId} </span>
                                            {film.episode_id}</p>
                                        <Link to={`/films/${film.id}`}
                                            className='films__more'>
                                            {DICT[props.lang].moreInfoLink}
                                        </Link>
                                    </div>
                                </div>
                            )}
                    </div>
                    <figure className='films_background_figure'>
                        <img src={films__backgroud_img} alt='star wars poster' className='films_background_img' />
                    </figure>
                </div>}
        </>
    )
}

export default Films