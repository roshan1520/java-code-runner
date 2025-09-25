const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const { v4: uuidv4 } = require('uuid')

const app = express()
app.use(cors())
app.use(bodyParser.json({ limit: '1mb' }))

app.post('/run', async (req, res) => {
  try {
    const { code, className, stdin } = req.body
    if (!code || !className)
      return res.status(400).json({ error: 'code and className required' })

    const id = uuidv4()
    const workdir = path.join(__dirname, 'tmp', id)
    fs.mkdirSync(workdir, { recursive: true })

    const filePath = path.join(workdir, `${className}.java`)
    fs.writeFileSync(filePath, code, 'utf8')

    // write stdin to a file
    const stdinPath = path.join(workdir, 'input.txt')
    fs.writeFileSync(stdinPath, stdin || '', 'utf8')

    // Docker command: compile + run Java program with stdin
    const dockerCmd = `docker run --rm -v ${workdir}:/workspace -w /workspace openjdk:17 bash -c "javac ${className}.java 2>compile_err.txt || true; if [ -s compile_err.txt ]; then cat compile_err.txt; exit 0; fi; java ${className} < input.txt"`

    exec(
      dockerCmd,
      { timeout: 30000, maxBuffer: 1024 * 1024 },
      (error, stdout, stderr) => {
        let out = stdout || ''
        let err = stderr || ''

        if (error && error.killed) out += '\n\n[Execution timed out]'

        // fallback compile error
        try {
          const compileErrPath = path.join(workdir, 'compile_err.txt')
          if (fs.existsSync(compileErrPath)) {
            const compileErr = fs.readFileSync(compileErrPath, 'utf8').trim()
            if (compileErr) out = compileErr
          }
        } catch (e) {}

        fs.rmSync(workdir, { recursive: true, force: true })
        res.json({ output: out + (err ? '\n[stderr]\n' + err : '') })
      }
    )
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Server error' })
  }
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Java runner backend listening on ${PORT}`))
