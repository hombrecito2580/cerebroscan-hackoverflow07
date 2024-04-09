import {motion, useAnimation, useInView} from "framer-motion"
import { useEffect, useRef, useState } from "react"

const Reveal = ({children , width = "fit-content"}) => {
    //Animation 1
    const view = useRef(null);
    const isInView = useInView(view);
    const mainControls = useAnimation();
    useEffect(() => {
        const divRect = view.current.getBoundingClientRect();
        if(isInView) {
            if(divRect.y > 0)  mainControls.start("visible");
        }
        else{
            if(divRect.y > 0) mainControls.start("hidden")
        }
        // if(isInView) mainControls.start("visible");
        // else mainControls.start("hidden")
    } , [isInView])



    return(
        <div ref={view} style={{position : "relative" , width , overflow : "hidden"}} >
            <motion.div
            variants={{
                hidden : {opacity : 0, y : 75},
                visible : {opacity : 1 , y : 0}
            }}
            initial="hidden"
            animate={mainControls}
            transition={{duration : 1 , delay : 0.1}}
            >
                {children}
            </motion.div>
        </div>
    )
}

export default Reveal