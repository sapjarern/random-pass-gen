'use client'
import { SyntheticEvent, useEffect, useState } from "react";

type GeneratorConfig = {
  useLowwer: boolean
  useUpper: boolean
  useNumber: boolean
  useSpecial: boolean
  length: number
}

const defaultConfig: GeneratorConfig = {
  useLowwer: true,
  useUpper: true,
  useNumber: false,
  useSpecial: false,
  length: 8
}

export default function Home() {

  const CHAR_POOLS: { [key: string]: string } = {
    useLowwer: 'abcdefghijklmnopqrstuvwxyz',
    useUpper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    useNumber: '0123456789',
    useSpecial: '!@#$%^&*()-_=+[]{}|;:,.<>?/~'
  };
  const OUTPUT_COUNT = 5

  const [outputs, setOutputs] = useState<Array<string>>([])
  const [template, setTemplate] = useState<string>("")
  const [config, setConfig] = useState<GeneratorConfig>(defaultConfig)

  const generatePassword = (config: GeneratorConfig) => {
    const charectors = Object.entries(config)
      .filter(([key]) => key.startsWith('use'))
      .filter(([value]) => value)
      .map(([key]) => CHAR_POOLS[key])
      .join('');

    let password: string
    const out_temp: Array<string> = []
    for (let i = 0; i < OUTPUT_COUNT; i++) {
      password = '';
      for (let i = 0; i < config.length; i++) {
        const randomIndex = Math.floor(Math.random() * charectors.length);
        password += charectors[randomIndex];
      }
      out_temp.push(password)
    }
    setOutputs(out_temp)
  }

  useEffect(() => {
    const arr_tmp = []
    for (let i = 0; i < OUTPUT_COUNT; i++) {
      arr_tmp.push("")
    }
    setOutputs(arr_tmp)
  }, [])

  useEffect(() => {
    if (template === "MEM") {
      setConfig({
        useLowwer: true,
        useUpper: true,
        useNumber: true,
        useSpecial: false,
        length: 10
      })
    }
    else if (template === "STRONG") {
      setConfig({
        useLowwer: true,
        useUpper: true,
        useNumber: true,
        useSpecial: true,
        length: 15
      })
    }
    else if (template === "KNOX") {
      setConfig({
        useLowwer: true,
        useUpper: true,
        useNumber: true,
        useSpecial: true,
        length: 30
      })
    }
    else if (template === "ENCRYPT") {
      setConfig({
        useLowwer: true,
        useUpper: true,
        useNumber: true,
        useSpecial: false,
        length: 32
      })
    }
  }, [template])

  const onGenerateClick = () => {
    const arr_tmp = []
    for (let i = 0; i < OUTPUT_COUNT; i++) {
      arr_tmp.push((Math.random() * (10 - 1) + 1).toString())
    }
    setOutputs(arr_tmp)
    generatePassword(config)
  }


  const onConfigChange = (event: SyntheticEvent) => {
    const target = event.currentTarget as HTMLInputElement
    if (["useLowwer", "useUpper", "useNumber", "useSpecial"].includes(target.id)) {
      setConfig((prev) => ({
        ...prev,
        [target.id]: target.checked
      }))
    }
    else if (target.id === "template") {
      setTemplate(target.value)
    }
    else if (target.id === "length") {
      setConfig((prev) => ({
        ...prev,
        length: parseInt(target.value)
      }))
    }
  }

  const onClickOutput = (event: SyntheticEvent) => {
    const target = event.currentTarget as HTMLInputElement
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(target.value.toString())
        .then(() => {})
        .catch((error) => {
          console.error(error)
        })
    }
  }

  return (
    <div className="min-w-[50%] p-6 m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-row flex-wrap justify-around">
        <div className="flex-1 mx-2 min-w-40">
          <div className="flex flex-col">
            <div className="flex-1">
              <label htmlFor="template" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an Template</label>
              <select id="template" defaultValue={template} onChange={onConfigChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Choose a template</option>
                <option value="MEM">Memorable Passwords</option>
                <option value="STRONG">Strong Passwords</option>
                <option value="KNOX">Fort Knox Passwords</option>
                <option value="ENCRYPT">Encryption Keys</option>
              </select>
            </div>
            <div className="flex-1 mt-2">
              <input id="useLowwer" type="checkbox" checked={config.useLowwer} onChange={onConfigChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="useLowwer" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Lower Character</label>
            </div>
            <div className="flex-1 mt-2">
              <input id="useUpper" type="checkbox" checked={config.useUpper} onChange={onConfigChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="useUpper" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Upper Character</label>
            </div>
            <div className="flex-1 mt-2">
              <input id="useNumber" type="checkbox" checked={config.useNumber} onChange={onConfigChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="useNumber" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Number Character</label>
            </div>
            <div className="flex-1 mt-2">
              <input id="useSpecial" type="checkbox" checked={config.useSpecial} onChange={onConfigChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="useSpecial" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Special Character</label>
            </div>
            <div className="flex-1 mt-2">
              <label htmlFor="length" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">length</label>
              <input type="number" id="length" value={config.length} min="8" max="50" onChange={onConfigChange} aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="12" required />
            </div>
            <div className="flex-1 mt-2">
              <button type="button" onClick={onGenerateClick} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Generate</button>
            </div>
          </div>
        </div>
        <div className="flex-1 mx-2 min-w-60">
          <div className="flex flex-col">
            {outputs.map((output, index) => {
              return (
                <div className="flex-1" key={`output-${index}`}>
                  <div className="relative w-full">
                    <input type="text" id={`output-${index}`} value={output} onClick={onClickOutput} aria-label="disabled input" className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block min-w-fit w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly />
                    {/* <button className="absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center">
                      <span id="default-icon">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                          <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                        </svg>
                      </span>
                    </button> */}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
