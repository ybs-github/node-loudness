const execa = require('execa')
const path = require('path')

const executablePath = path.join(__dirname, 'adjust_get_current_system_volume_vista_plus.exe').replace('\\app.asar\\', '\\app.asar.unpacked\\')

async function runProgram (...args) {
  return (await execa(executablePath, args)).stdout
}

async function getVolumeInfo () {
  const data = await runProgram()
  const args = data.split(' ')

  return { volume: parseInt(args[0], 10), muted: Boolean(parseInt(args[1], 10)) }
}

exports.getVolume = async function getVolume () {
  return (await getVolumeInfo()).volume
}

exports.setVolume = async function setVolume (val) {
  await runProgram(String(val))
}

exports.getMuted = async function getMuted () {
  return (await getVolumeInfo()).muted
}

exports.setMuted = async function setMuted (val) {
  await runProgram(val ? 'mute' : 'unmute')
}
