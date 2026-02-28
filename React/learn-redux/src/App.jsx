import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment , decrement, increaseByAmount} from './redux/features/counterSlice'

const App = () => {

  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);

  const [amount, setAmount] = useState(0);

  return (
    <div><h1>Count Value: {count} </h1>
    <button onClick={() => {
      dispatch(increment());
    }}>Increment</button>
    <button onClick={() => {
      dispatch(decrement());
    }}>Decrement</button>
    

<input type="number" placeholder='Enter amount' onChange={(e) => setAmount(Number(e.target.value))} value={amount} />

      <button onClick={() => {
        dispatch(increaseByAmount(amount));
      }}>Increase by {amount}</button>

    </div>
  );
};

export default App;