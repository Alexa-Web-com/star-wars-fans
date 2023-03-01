import './Nav.css'
import { useEffect, useState } from 'react'
import { DICT, LANG } from '../../utils/constans'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/Star_Wars_Logo.svg'

const Nav = (props) => {

    const [isHamburgerActive, setIsHamburgerActive] = useState(false)

    useEffect(() => {
        window.addEventListener('resize', (e) => {
            console.log(e.target.innerWidth);
            e.target.innerWidth > 768 && setIsHamburgerActive(false)
        })

        return () => window.removeEventListener('resize', (e) => {
            e.target.innerWidth > 768 && setIsHamburgerActive(false)
        })

    }, [])

    const navigate = useNavigate()

    const homeNavigate = () => {
        navigate('/home')
    }

    return (
        <div>

            <div className={isHamburgerActive ? 'nav__hamburger_cntr' : 'nav__cntr'}
            >
                <div className='nav__logo_and_title'
                    onClick={homeNavigate}
                >
                    <figure>
                        <img src={logo} alt='star wars logo' className='nav_logo' />
                    </figure>
                    <h1 className='nav_title'>Star Wars Funs</h1>
                </div>

                <div className='nav__navbar'>
                    <div
                        className={isHamburgerActive && 'hamburger'}

                        onClick={() => setIsHamburgerActive(prevState => !prevState)}>
                        <span
                            className='bar'
                        // className={isHamburgerActive ? 'bar bar_first_child' : 'bar'}
                        ></span>
                        <span
                            className='bar'
                        // className={isHamburgerActive ? 'bar bar_second_child' : 'bar'}
                        ></span>
                        <span
                            className='bar'
                        // className={isHamburgerActive ? 'bar bar_third_child' : 'bar'}
                        ></span>
                    </div>


                    <nav className={isHamburgerActive
                        ? 'nav__el_cntr_hamburger_active'
                        : 'nav__el_cntr'}>
                        <NavLink to='/home'
                            className={isHamburgerActive ? 'nav__hamburger_active_el' : 'nav__el'}
                            onClick={() => setIsHamburgerActive(false)}>
                            {DICT[props.lang].home}
                        </NavLink>
                        <NavLink to='/people'
                            className={isHamburgerActive ? 'nav__hamburger_active_el' : 'nav__el'}
                            onClick={() => setIsHamburgerActive(false)}>
                            {DICT[props.lang].characters}
                        </NavLink>
                        <NavLink to='/planets'
                            className={isHamburgerActive ? 'nav__hamburger_active_el' : 'nav__el'}
                            onClick={() => setIsHamburgerActive(false)}>
                            {DICT[props.lang].planets}
                        </NavLink>
                        <NavLink to='/films'
                            className={isHamburgerActive ? 'nav__hamburger_active_el' : 'nav__el'}
                            onClick={() => setIsHamburgerActive(false)}>
                            {DICT[props.lang].films}
                        </NavLink>
                        <NavLink to='/contact'
                            className={isHamburgerActive ? 'nav__hamburger_active_el' : 'nav__el'}
                            onClick={() => setIsHamburgerActive(false)}>
                            {DICT[props.lang].contact}
                        </NavLink>
                    </nav>
                </div >


                <div className='nav__lang'>
                    {LANG.map((languageEl, index) =>
                        <div className='nav__language_el'
                            key={index}
                            onClick={(e) => {
                                props.setLang(LANG.find(item => item.name === languageEl.name).value)
                            }}>
                            <span className='nav__language_text'
                                style={{ color: languageEl.value === props.lang && "grey" }}
                            >{languageEl.name}</span>
                            <img src={languageEl.icon} alt={`${languageEl.name} flag`}
                                className='nav__language_icon'
                                style={{ opacity: languageEl.value === props.lang && "0.3" }} />
                        </div>
                    )}
                </div>
            </div>

        </div>

    )
}

export default Nav