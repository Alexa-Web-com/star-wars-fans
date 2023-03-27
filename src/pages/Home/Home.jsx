import './Home.css'
import { Link } from 'react-router-dom'
import { DICT } from '../../utils/constans'
import home__backgroud_img from '../../assets/backgrounds/home.webp'

const Home = (props) => {
    return (
        <div className='home__cntr'>
            <figure className='home__background_figure'>
                <img src={home__backgroud_img} alt='star wars wallpaper' className='home__background_img' />
            </figure>
            <div className='home__wrapper'>
                <div> {DICT[props.lang].descOne}
                    <span>
                        <Link to='/films' className='home__links'>
                            {DICT[props.lang].films}
                        </Link>
                    </span>

                    {` ${DICT[props.lang].descTwo}`}
                    <span>
                        <Link to='/people' className='home__links'>
                            {DICT[props.lang].characters}
                        </Link>
                    </span>

                    {` ${DICT[props.lang].descTree}`}
                    <span>
                        <Link to='/planets' className='home__links'>
                            {DICT[props.lang].planets}
                        </Link>
                    </span>

                    {` ${DICT[props.lang].descFour}`}
                    <div>
                        {` ${DICT[props.lang].descFive}`}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Home