import React, { useState } from 'react'
const defaultCode = ` import java.util.*;
public class Main{
public static void main(String[] args) {
Scanner sc = new Scanner(System.in);
int n = sc.nextInt();
System.out.println("You entered: " + n);
}
}`

export default function App() {
  const [code, setCode] = useState(defaultCode)
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [className, setClassName] = useState('Main')
  const [stdin, setStdin] = useState('')

  async function runCode() {
    setLoading(true)
    setOutput('')
    try {
      const resp = await fetch('http://localhost:4000/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, className, stdin }),
      })
      const data = await resp.json()
      if (data.error) setOutput('Error: ' + data.error)
      else setOutput(data.output || '(no output)')
    } catch (e) {
      setOutput('Request failed: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 20 }}>
      <h1>Java Runner</h1>

      <div style={{ marginBottom: 8 }}>
        <label>Public class name: </label>
        <input
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          style={{ width: 120 }}
        />
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        style={{
          width: '100%',
          height: 320,
          fontFamily: 'monospace',
          fontSize: 14,
        }}
      />

      <div style={{ marginTop: 8 }}>
        <label>Standard Input (stdin):</label>
        <textarea
          value={stdin}
          onChange={(e) => setStdin(e.target.value)}
          placeholder="Enter input here"
          style={{
            width: '100%',
            height: 80,
            fontFamily: 'monospace',
            fontSize: 14,
            marginTop: 4,
          }}
        />
      </div>

      <div style={{ marginTop: 8 }}>
        <button onClick={runCode} disabled={loading}>
          Run
        </button>
        <button
          onClick={() => {
            setCode(defaultCode)
            setClassName('Main')
            setStdin('')
          }}
          style={{ marginLeft: 8 }}
        >
          Reset
        </button>
      </div>

      <h3>Output</h3>
      <pre style={{ background: '#f5f5f5', padding: 12, minHeight: 120 }}>
        {loading ? 'Running...' : output}
      </pre>
    </div>
  )
}
