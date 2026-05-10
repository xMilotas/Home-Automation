const express = require('express')
const router = express.Router()

const { exec } = require('child_process')

// Required routes
const tpRoutes = require('./tp')

router.use('/tp', tpRoutes)

// Independent outlet timers
const activeTimers = new Map()

// RF configuration
const RF_REPEAT_INTERVAL = 200
const RF_TRANSMIT_DURATION = 1200

router.post(
  '/PowerPlugs',
  async function (req, res, next) {
    try {
      const {
        outletID,
        outletStatus,
        timer
      } = req.body

      console.log(
        '[PowerPlug]',
        req.body
      )

      // ALL outlets
      if (String(outletID) === '6') {
        triggerAllOutlets(outletStatus)

        return res.send('Success')
      }

      // Timer handling
      if (timer) {
        startOutletTimer(
          outletID,
          outletStatus,
          Number(timer)
        )

        return res.send('Success')
      }

      // Normal send
      sendCodes(
        readCodes(
          outletID,
          outletStatus
        )
      )

      return res.send('Success')
    }
    catch (error) {
      console.error(error)
      next(error)
    }
  }
)

function triggerAllOutlets(
  outletStatus
) {
  const outletIds = [
    '1',
    '2',
    '3',
    '4'
  ]

  let index = 0

  const repeat = setInterval(() => {
    const outletID =
      outletIds[index]

    sendCodes(
      readCodes(
        outletID,
        outletStatus
      )
    )

    index++

    if (index >= outletIds.length) {
      clearInterval(repeat)
    }
  }, 1200)
}

function startOutletTimer(
  outletID,
  outletStatus,
  minutes
) {
  // Replace existing timer
  if (
    activeTimers.has(outletID)
  ) {
    clearTimeout(
      activeTimers.get(outletID)
    )
  }

  // Turn outlet on immediately
  sendCodes(
    readCodes(
      outletID,
      outletStatus
    )
  )

  console.log(
    `[Timer Started] Outlet ${outletID} -> ${minutes} min`
  )

  const timeout = setTimeout(() => {
    sendCodes(
      readCodes(
        outletID,
        0
      )
    )

    activeTimers.delete(
      outletID
    )

    console.log(
      `[Timer Finished] Outlet ${outletID}`
    )
  }, minutes * 60000)

  activeTimers.set(
    outletID,
    timeout
  )
}

function sendCodes(plugcode) {
  if (!plugcode) {
    console.error(
      'Invalid plugcode'
    )

    return
  }

  let pulseLength = 185

  // Special pulse length
  if (String(plugcode).startsWith('5')) {
    pulseLength = 301;
  }

  const command =
    `sudo ./codesend ${plugcode} -l ${pulseLength}`

  const startTime = Date.now()

  const spammer = setInterval(() => {
    exec(command, (error) => {
      if (error) {
        console.error(
          '[RF ERROR]',
          error
        )
      }
    })
    console.log('[RF SEND]', command)

    const elapsed =
      Date.now() - startTime

    if (
      elapsed >=
      RF_TRANSMIT_DURATION
    ) {
      clearInterval(spammer)
    }
  }, RF_REPEAT_INTERVAL)
}

function readCodes(
  outletID,
  outletStatus
) {
  const powerOnMap = {
    '1': '4478403',
    '2': '4478723',
    '3': '5571921',
    '4': '5575953'
  }

  const powerOffMap = {
    '1': '4478412',
    '2': '4478732',
    '3': '5571924',
    '4': '5575956'
  }

  return outletStatus == 1
    ? powerOnMap[outletID]
    : powerOffMap[outletID]
}

module.exports = router