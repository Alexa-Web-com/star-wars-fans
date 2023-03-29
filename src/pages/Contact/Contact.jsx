import './Contact.css'
import { DICT } from '../../utils/constans'
import { useEffect, useState } from 'react'
import contact__backgroud_img from '../../assets/backgrounds/contact.webp'
import { isValidEmail } from '../../utils/isValidEmail'

const Contact = (props) => {
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userMessage, setUserMessage] = useState('')

    const [isUserNameValid, setIsUserNameValid] = useState(true)
    const [isUserEmailValid, setIsUserEmailValid] = useState(true)
    const [isUserMessageValid, setIsUserMessageValid] = useState(true)

    const [sentMessage, setSentMessage] = useState(false)

    useEffect(() => { setIsUserNameValid(true) }, [userName])
    useEffect(() => { setIsUserEmailValid(true) }, [userEmail])
    useEffect(() => { setIsUserMessageValid(true) }, [userMessage])

    const isFormValid = () => {
        let dataValid = true
        if (userName.length < 2) {
            dataValid = false
            setIsUserNameValid(false)
        }
        if (!isValidEmail(userEmail)) {
            dataValid = false
            setIsUserEmailValid(false)
        }
        if (userMessage.length < 5) {
            dataValid = false
            setIsUserMessageValid(false)
        }
        return dataValid
    }

    const sendBtnClicked = (e) => {
        e.preventDefault()

        if (!isFormValid()) { return }

        setSentMessage(true)

        setTimeout(() => {
            setSentMessage(false)
        }, 1000)

        setUserName('')
        setUserEmail('')
        setUserMessage('')
        setIsUserNameValid(true)
        setIsUserEmailValid(true)
        setIsUserMessageValid(true)
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
                        <h1 className='contact__form_title'>{DICT[props.lang].contactSentMessageFromPage}</h1>

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
                                onSubmit={sendBtnClicked}>

                                <input className={(isUserNameValid) ? 'contact__form_el' : 'contact__form_el_error'}
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder={DICT[props.lang].contactFormUserNameInputPlaceholder} />
                                {!isUserNameValid &&
                                    <p className='contact__form_el_errMessage'>{DICT[props.lang].contactNameInvalid}</p>}

                                <input className={(isUserEmailValid) ? 'contact__form_el' : 'contact__form_el_error'}
                                    id="email"
                                    type="email"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    placeholder={DICT[props.lang].contactFormUserEmailInputPlaceholder} />
                                {!isUserEmailValid &&
                                    <p className='contact__form_el_errMessage'>{DICT[props.lang].contactEmailInvalid}</p>}

                                <textarea className={(isUserMessageValid) ? 'contact__form_el' : 'contact__form_el_error'}
                                    type="text"
                                    value={userMessage}
                                    onChange={(e) => setUserMessage(e.target.value)}
                                    placeholder={DICT[props.lang].contactFormUserMessageInputPlaceholder} />
                                {!isUserMessageValid &&
                                    <p className='contact__form_el_errMessage'>{DICT[props.lang].contactMessageInvalid}</p>}

                                <button
                                    className={userName && userEmail && userMessage ? 'contact__form_send_btn' : 'contact__form_send_btn_error'}
                                    type='submit'
                                    disabled={!userName || !userEmail || !userMessage}
                                >
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

