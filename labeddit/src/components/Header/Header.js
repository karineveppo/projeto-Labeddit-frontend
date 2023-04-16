/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalContext'
import { HeaderStyled } from './HeaderStyled'
import fecharpag from '../../assets/fecharpag.svg'
import logopeq from '../../assets/logopeq.svg'
import { goToLoginPage } from '../../Router/coordinator'



function Header() {
    const navigate = useNavigate()
    const context = useContext(GlobalContext)
    const location = useLocation()
    
    //fechar ModalPost?
    const closeModal = () => {
        context.setModal(false)
        context.setActionModal("")
        context.setUrlPost("")
    }

    //sair da conta do usuario e limpar os modais 
    const logOut = () => {
        context.setModal(false)
        context.setActionModal("")
        localStorage.clear()
        goToLoginPage(navigate)
    }


    return (
        <HeaderStyled>
            <div>
                {context.modal && context.actionModal === "post" ?
                    <img src={fecharpag} alt="botão-fechar" onClick={() => closeModal()} />
                    : 
                    ''}
            </div>

            <div>
                <img src={logopeq} alt="logo" />
            </div>

            <div>
                {location.pathname === "/signup" ?
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <h2><a onClick={() => goToLoginPage(navigate)}>Entrar</a></h2>
                    :
                    <h2><a onClick={() => logOut()}>Logout</a></h2>
                }
            </div>
        </HeaderStyled>
    )
}

export default Header