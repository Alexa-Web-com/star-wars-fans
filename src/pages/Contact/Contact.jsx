import './Contact.css'
import { DICT } from '../../utils/constans'
import { useEffect, useState } from 'react'
import contact__backgroud_img from '../../assets/backgrounds/contact.webp'

const Contact = (props) => {
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userMessage, setUserMessage] = useState('')

    const [isUserNameValid, setIsUserNameValid] = useState(true)
    const [isUserEmailValid, setIsUserEmailValid] = useState(true)
    const [isUserMessageValid, setIsUserMessageValid] = useState(true)

    const [valid, setValid] = useState(true)

    const [sentMessage, setSentMessage] = useState(false)

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    const handleUserNameChange = e => {
        if (e.target.value.length < 2) {
            setIsUserNameValid(false)
        } else {
            setIsUserNameValid(true);
        }
        setUserName(e.target.value);
    }

    const handleUserEmailChange = e => {
        if (!isValidEmail(e.target.value)) {
            setIsUserEmailValid(false)
        } else {
            setIsUserEmailValid(true);
        }
        setUserEmail(e.target.value);
    }

    const handleUserMessageChange = e => {
        if (e.target.value.length < 5) {
            setIsUserMessageValid(false);
        } else {
            setIsUserMessageValid(true);
        }
        setUserMessage(e.target.value);
    }

    const checkElemValidations = () => {
        let dataValid = true
        if (!isUserNameValid) { dataValid = false }
        if (!isUserEmailValid) { dataValid = false }
        if (!isUserMessageValid) { dataValid = false }
        console.log('dataValid from function: ', dataValid);
        return dataValid
    }

    const sendBtnClicked = (e) => {
        e.preventDefault()
        const dataValid = checkElemValidations()
        console.log('dataValid from sendBtn: ', dataValid);

        if (dataValid) {
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
        if (!dataValid) { setValid(false) }
    }

    useEffect(() => { console.log('valid: ', valid) }, [valid])

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

                                <input className={(valid || isUserNameValid) ? 'contact__form_el' : 'contact__form_el_error'}
                                    type="text"
                                    value={userName}
                                    onChange={(e) => handleUserNameChange(e)}
                                    placeholder={DICT[props.lang].contactFormUserNameInputPlaceholder} />
                                {!valid && !isUserNameValid &&
                                    <p className='contact__form_el_errMessage'>{DICT[props.lang].contactNameInvalid}</p>}

                                <input className={(valid || isUserEmailValid) ? 'contact__form_el' : 'contact__form_el_error'}
                                    id="email"
                                    type="email"
                                    value={userEmail}
                                    onChange={(e) => handleUserEmailChange(e)}
                                    placeholder={DICT[props.lang].contactFormUserEmailInputPlaceholder} />
                                {!valid && !isUserEmailValid &&
                                    <p className='contact__form_el_errMessage'>{DICT[props.lang].contactEmailInvalid}</p>}

                                <textarea className={(valid || isUserMessageValid) ? 'contact__form_el' : 'contact__form_el_error'}
                                    type="text"
                                    value={userMessage}
                                    onChange={(e) => handleUserMessageChange(e)}
                                    placeholder={DICT[props.lang].contactFormUserMessageInputPlaceholder} />
                                {!valid && !isUserMessageValid &&
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

