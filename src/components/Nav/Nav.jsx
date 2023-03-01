import './Nav.css'
import { useEffect, useState } from 'react'
import { DICT, LANG } from '../../utils/constans'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/Star_Wars_Logo.svg'

const Nav = (props) => {

    // const [isHamburgerActive, setIsHamburgerActive] = useState(false)

    // useEffect(() => {
    //     window.addEventListener('resize', (e) => {
    //         e.target.innerWidth > 768 && setIsHamburgerActive(false)
    //     })

    //     return () => window.removeEventListener('resize', (e) => {
    //         e.target.innerWidth > 768 && setIsHamburgerActive(false)
    //     })

    // }, [])

    // useEffect(() => {
    //     console.log('isHamburgerActive: ', isHamburgerActive);
    // }, [isHamburgerActive])

    const navigate = useNavigate()

    const homeNavigate = () => {
        navigate('/home')
    }

    return (
        <div>

            <div className={props.isHamburgerActive ? 'nav__cntr_hamburger' : 'nav__cntr'}
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
                        className={props.isHamburgerActive ? 'hamburger_active' : 'hamburger'}

                        onClick={() => props.setIsHamburgerActive(prevState => !prevState)}>
                        <span className='bar'></span>
                        <span className='bar'></span>
                        <span className='bar'></span>
                    </div>


                    <nav className={props.isHamburgerActive
                        ? 'nav__navbar_el_cntr_hamburger_active'
                        : 'nav__navbar_el_cntr'}>
                        <NavLink to='/home'
                            className={props.isHamburgerActive ? 'nav__navbar_el_hamburger_active' : 'nav__navbar_el'}
                            onClick={() => props.setIsHamburgerActive(false)}>
                            {DICT[props.lang].home}
                        </NavLink>
                        <NavLink to='/people'
                            className={props.isHamburgerActive ? 'nav__navbar_el_hamburger_active' : 'nav__navbar_el'}
                            onClick={() => props.setIsHamburgerActive(false)}>
                            {DICT[props.lang].characters}
                        </NavLink>
                        <NavLink to='/planets'
                            className={props.isHamburgerActive ? 'nav__navbar_el_hamburger_active' : 'nav__navbar_el'}
                            onClick={() => props.setIsHamburgerActive(false)}>
                            {DICT[props.lang].planets}
                        </NavLink>
                        <NavLink to='/films'
                            className={props.isHamburgerActive ? 'nav__navbar_el_hamburger_active' : 'nav__navbar_el'}
                            onClick={() => props.setIsHamburgerActive(false)}>
                            {DICT[props.lang].films}
                        </NavLink>
                        <NavLink to='/contact'
                            className={props.isHamburgerActive ? 'nav__navbar_el_hamburger_active' : 'nav__navbar_el'}
                            onClick={() => props.setIsHamburgerActive(false)}>
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