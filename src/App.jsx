import { useState, useEffect } from 'react';

function App() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');
    

    useEffect(() => {
        document.title = `Count: ${count}`;
    }, [count]);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    const reset = () => setCount(0);

    return (
        <div>
            <h1>useState & useEffect </h1>

            <div>
                <h2>Count: {count}</h2>
                <button onClick={increment}>
                    + Increment
                </button>
                
                <button onClick={decrement}>
                    - Decrement
                </button>
                
                <button onClick={reset}>
                    Reset
                </button>
                
            </div>
            
            <br /><br />
            
            <div>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
                <p>Hello, {name || 'Guest'}!</p>
            </div>
        </div>
    );
}

export default App;
