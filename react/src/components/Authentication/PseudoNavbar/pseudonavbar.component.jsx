import { Fragment } from "react"
import Logo from "../../assets/img/Logo.png"

const PseudoNavbar = () => {


    return(
        <Fragment>
            <div className="pseudo-cont"
            style={{height : "10vh" , width : "100vw" , display : "flex" , justifyContent :"flex-start", alignItems : "center"}}
            >
                <img src={Logo} alt="" style={{width : "100px"}} />
                <h1 className="mx-3">CerebroScan</h1>
                
            </div>
        </Fragment>
    )
}


export default PseudoNavbar;