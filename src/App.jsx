import { useState, useCallback, useEffect,useRef } from "react";

function App() {

  //ref hook
  const passwordRef = useRef(null);

  const [length, setLength] = useState(8);
  const [copy,copied] = useState('Copy')
  const [allowNumber, setallowNumber] = useState(false);
  const [allowChar, setallowChar] = useState(false);
  const [password, setpassword] = useState(" ");

  const passwordGen = useCallback(() => {
    let pass = " ";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (allowNumber) str += "0123456789";

    if (allowChar) str += "!@#$%^&*()_-+=<>?";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setpassword(pass)

  }, [length, allowNumber, allowChar, setpassword]);

  const copyPass = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    copied('Copied!')
  },[password])

  useEffect(() => {
    passwordGen();
  }, [length, allowChar, allowNumber, passwordGen]);

  return (
    <>
      <div className=" w-screen  h-screen bg-gray-950 flex flex-wrap items-center justify-center">
        <div
          className=" w-1/2 h-1/2 bg-slate-600 shadow-xl rounded-lg flex flex-col items-center justify-start
         gap-3"
        >
          <div className="mt-5">
            <h1 className=" text-amber-500 text-3xl">Password Generator</h1>
          </div>
          <div className="flex shadow-md rounded-lg overflow-hidden">
            <input
              type="text"
              value={password}
              className=" outline-none w-96 h-8  bg-slate-300 px-2 py-1  placeholder-slate-600"
              placeholder="WXCG_Qp12"
              readOnly
              ref={passwordRef}
            />
            <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 "
            onClick={copyPass}>
              {copy}
            </button>
          </div>
          <div className="flex  gap-x-4 text-amber-500">
            <div className="flex items-center gap-x-3">
              <input
                type="range"
                min={8}
                max={20}
                value={length}
                onChange={(e) => {
                  copied("Copy")
                  setLength(e.target.value);
                }}
                className="cursor-pointer"
                />
              <label>Length : {length}</label>
            </div>
            <div>
              <input
                type="checkbox"
                defaultChecked={allowNumber}
                id="numberInput"
                onChange={() => {
                  copied("Copy")
                  setallowNumber((prev)=>!prev);
                }}
                />
              <label htmlFor="numberInput"> Numbers</label>
            </div>
            <div>
              <input
                type="checkbox"
                defaultChecked={allowChar}
                id="characterInput"
                onChange={() => {
                  copied("Copy")
                  setallowChar((prev)=>!prev);
                }}
              />
              <label htmlFor="characterInput"> Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
