import { useState, useEffect } from 'react'
import './Characters.css'
import { DICT } from '../../utils/constans'
import { Link } from 'react-router-dom'
import Spinner from '../../components/Spinner/Spinner'
import { useGetDataUrl } from '../../utils/useGetDataUrl'
import { API } from '../../utils/constans'
import characters__backgroud_img from '../../assets/backgrounds/characters.webp'

const Characters = (props) => {
    const [searchName, setSearchName] = useState('')

    // USTALENIE STANU W App NIEZALEŻNĄ FUNKCJĄ
    const [respUrlDataCharacters, isSpinnerCharacters] = useGetDataUrl(API.characters)
    useEffect(() => {
        if (respUrlDataCharacters) {
            const charactersWithId = respUrlDataCharacters.results.map(person => ({
                ...person,
                id: respUrlDataCharacters.results.indexOf(person) + 1
            }))
            props.setCharacters(charactersWithId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [respUrlDataCharacters])

    return (
        <>
            {isSpinnerCharacters
                ?
                <Spinner />
                :
                <div className='characters__cntr'>

                    <figure className='characters__background_figure'>
                        <img src={characters__backgroud_img} alt='star wars wallpaper' className='characters__background_img' />
                    </figure>

                    <div className='characters__wrapper'>
                        <input className='app__search_input'
                            type="text"
                            placeholder={DICT[props.lang].search}
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                        <div className='characters__content_cntr'>
                            {props.characters
                                .filter(item => item.name.toLowerCase().includes(searchName.toLowerCase()))
                                .map((person, index) =>
                                    <div className='characters__person_cntr' key={index}>
                                        <h3 className='characters__person_name'>{person.name}</h3>
                                        <p>
                                            <span className='characters__person_item_desc'>{DICT[props.lang].charactersGender}</span>
                                            {person.gender}
                                        </p>
                                        <p>
                                            <span className='characters__person_item_desc'>{DICT[props.lang].charactersBirthYear}</span>
                                            {person.birth_year}
                                        </p>
                                        <Link to={`/people/${person.id}`} className='characters__more'>
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

export default Characters