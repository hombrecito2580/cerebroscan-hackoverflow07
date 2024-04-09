import { Fragment, useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
const Hello = () => {
    const [value, setValue] = useState("");
    const [value2 , setValue2] = useState("");
    const debouncedSave = useCallback(
		debounce(nextValue => setValue(nextValue), 1000),
		[],
	);
         
    const onChange = (e) => {
		const { value: nextValue } = e.target;
		debouncedSave(nextValue);
    }

    return(
        <Fragment>
            <input type="email" onChange={onChange}/>
            <div className="">
                <h1>realtime : {value2}</h1>
                <h1>debounce : {value} </h1>
            </div>
        </Fragment>
    )
}

export default Hello;