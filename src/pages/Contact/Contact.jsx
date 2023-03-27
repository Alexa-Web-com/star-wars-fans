import './Contact.css'
import { DICT } from '../../utils/constans'
import { useState } from 'react'
import contact__backgroud_img from '../../assets/backgrounds/contact.webp'

const Contact = (props) => {
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userMessage, setUserMessage] = useState('')

    const [error, setError] = useState(null);

    const [sentMessage, setSentMessage] = useState(false)

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    const checkAndSetEmail = e => {
        if (!isValidEmail(e.target.value)) {
            setError(DICT[props.lang].contactEmailInvalid);
        } else {
            setError(null);
        }
        setUserEmail(e.target.value);
    };

    const sendUserMessage = (e) => {
        e.preventDefault()

        setSentMessage(true)

        setTimeout(() => {
            setSentMessage(false)
        }, 1000)

        setUserName('')
        setUserEmail('')
        setUserMessage('')
    }

    return (
        <>
            {sentMessage
                ?
                <div className='contact__cntr'>

                    <figure className='contact__background_figure'>
                        <img src={contact__backgroud_img} alt='star wars wallpaper' className='contact__background_img' />
                    </figure>

                    <div className='contact__wrapper'>
                        {error
                            ?
                            <h1 style={{ color: 'red' }}>{error}</h1>
                            :
                            <h1 className='contact__form_title'>{DICT[props.lang].contactSentMessageFromPage}</h1>
                        }
                    </div>
                </div>
                :
                <div className='contact__cntr'>

                    <figure className='contact__background_figure'>
                        <img src={contact__backgroud_img} alt='star wars wallpaper' className='contact__background_img' />
                    </figure>

                    <div className='contact__wrapper'>
                        <div className='contact_form_cntr'>
                            <h1 className='contact__form_title'>
                                {DICT[props.lang].contactFormTitle}
                            </h1>
                            <form className='contact__form_el_cntr'
                                onSubmit={sendUserMessage}>
                                <input className='contact__form_el'
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder={DICT[props.lang].contactFormUserNameInputPlaceholder} />
                                <input className='contact__form_el'
                                    id="email"
                                    type="email"
                                    value={userEmail}
                                    onChange={(e) => checkAndSetEmail(e)}
                                    placeholder={DICT[props.lang].contactFormUserEmailInputPlaceholder} />
                                <textarea className='contact__form_el'
                                    type="text"
                                    value={userMessage}
                                    onChange={(e) => setUserMessage(e.target.value)}
                                    placeholder={DICT[props.lang].contactFormUserMessageInputPlaceholder} />
                                <button className='contact__form_send_btn'
                                    type='submit'>
                                    {DICT[props.lang].contactFormSendBtn}
                                </button>
                            </form>
                        </div>
                        <div className='contact_details_cntr'>
                            <h1 className='contact__form_title'>
                                {DICT[props.lang].contactOurDetailsTitle}
                            </h1>
                            <p className='contact__details_el'>
                                {DICT[props.lang].contactOurDetailsName}
                            </p>
                            <p className='contact__details_el'>
                                {DICT[props.lang].contactOurDetailsAddressOne}
                            </p>
                            <p className='contact__details_el'>
                                {DICT[props.lang].contactOurDetailsAddressTwo}
                            </p>
                            <p className='contact__details_el' style={{ paddingTop: "10px" }}>
                                <span>www: </span>
                                <a href='https://alexa-web.com/home'>alexa-web.com</a>
                            </p>
                        </div>
                    </div>
                </div>
            }
        </>
    )

}

export default Contact

