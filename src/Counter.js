import React from 'react'  
import {withStateHandlers} from 'recompose'
import Button from './Button'

const BaseComponent = props => {
 let { name, counter, random, incrementOn, decrementOn, resetCounter, onRandom } = {...props}
 return (
   <React.Fragment>
    <h1> Hello {name}!</h1>
    <Button onClick={() => incrementOn(2)}>Inc</Button>
    <Button onClick={() => decrementOn(3)}>Dec</Button>
    <Button onClick={onRandom}>Random</Button>
    <Button onClick={resetCounter}>Reset</Button>
    <div>Counter: {counter} </div>
    <div>Random: {random} </div>
  </React.Fragment>
   )
}

// Can use a function, or 'initStateObject'
const initStateFunction = ({ initialCounter = 0, initRandom = 0 }) => ({
      counter: initialCounter,
      random: initRandom
    })

// Can use an object, or 'initStateFunction'
const initStateObject = ({
      counter: 0,
      random: 0
    }
)

const Counter = withStateHandlers(
    initStateObject,
    {
      incrementOn: ({ counter }) => (value) => ({
        counter: counter + value,
      }),
      decrementOn: ({ counter }) => (value) => ({
        counter: counter - value,
      }),
      resetCounter: (_, { initialCounter = 0, initRandom = 0})  => () => ({
        counter: initialCounter,
        random: initRandom,
      }),
      onRandom: (value) => () => {
       console.log(value) // Just show that we are getting the props 'counter' and 'random'
       return {
         random: Math.random().toString(36).substring(6),
       } 
      }
    }
  )(BaseComponent)
  
  export default Counter