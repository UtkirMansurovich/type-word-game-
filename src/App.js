import React, {useState, useEffect, useRef} from 'react'
// import randomcolor from 'randomcolor'
import './style.css'

const App = () => {
    const [text, setText] = useState(' ');
    const [timeRemain, setTimeRemain] = useState(5);
    const [istimeRunning, setistimeRunning] = useState(false);
    const [word, setWord] = useState(0)
    const focusRef = useRef(null)

    function handlerChange(e){
        setText(e.target.value)
        console.log(text)
    }

    function calcWords(text){
        const wordArray = text.trim().split(" ")
        const filteredDate = wordArray.filter( word => word !== "")
        return filteredDate.length
    }
    useEffect(() => {
        if(istimeRunning==true && timeRemain>0){
            setTimeout( () => {
                setTimeRemain(timeRemain=> timeRemain-1)
            }, 1000);
        }else if(timeRemain == 0){
            setistimeRunning(false)
            const wordsNumber =  calcWords(text)
            setWord(wordsNumber)
        }
        
    }, [timeRemain, istimeRunning])

    function startClock(){
        setistimeRunning(true);
        setTimeRemain(5)
        setText(" ")
        focusRef.current.disabled=false
        focusRef.current.focus()
        setWord(0)
    }

    return (
        <div className="App">
            <h1>Test your speed</h1>
            <textarea 
                ref={focusRef} 
                disabled={!istimeRunning} 
                onChange={handlerChange} 
                value={text}>
            </textarea>
            <h4>Time left: {timeRemain}</h4>
            <button disabled={istimeRunning} onClick={startClock} >Start</button>
            <h1>Number of words: {word}</h1>
        </div>
    )
}

export default App
