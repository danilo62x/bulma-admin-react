import { useEffect, useMemo, useRef, useState } from 'react'
import { useUiStore } from '@/stores/ui'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now())
  const totalSeconds = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

export default function ComingSoon() {
  const ui = useUiStore()
  const target = useRef(Date.now() + 30 * 24 * 60 * 60 * 1000)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(target.current))
  const [email, setEmail] = useState('')

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(target.current)), 1000)
    return () => clearInterval(interval)
  }, [])

  const units = useMemo(
    () => [
      { label: 'Dias', value: timeLeft.days },
      { label: 'Horas', value: timeLeft.hours },
      { label: 'Minutos', value: timeLeft.minutes },
      { label: 'Segundos', value: timeLeft.seconds },
    ],
    [timeLeft]
  )

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    ui.notifySuccess('Você será avisado!')
    setEmail('')
  }

  return (
    <div className="tx-state-page">
      <div className="tx-state-bg">
        <span className="tx-state-blob tx-state-blob--one" />
        <span className="tx-state-blob tx-state-blob--two" />
      </div>

      <div className="tx-state-content has-text-centered">
        <span className="tx-state-icon">
          <span className="mdi mdi-rocket-launch mdi-48px" />
        </span>

        <h1 className="title is-2 has-text-white mt-5">Em breve</h1>

        <p className="subtitle is-6 tx-state-text mt-3">
          Estamos preparando algo incrível para você. Inscreva-se abaixo e seja o primeiro a saber quando lançarmos.
        </p>

        <div className="columns is-mobile is-variable is-2 tx-state-countdown mt-5">
          {units.map((unit) => (
            <div key={unit.label} className="column">
              <div className="box tx-state-unit">
                <span className="tx-state-unit-value">{String(unit.value).padStart(2, '0')}</span>
                <span className="tx-state-unit-label">{unit.label}</span>
              </div>
            </div>
          ))}
        </div>

        <form className="tx-state-form mt-5" onSubmit={handleSubscribe}>
          <div className="field has-addons">
            <p className="control has-icons-left is-expanded">
              <input
                className="input is-medium"
                type="email"
                required
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="icon is-small is-left">
                <span className="mdi mdi-email" />
              </span>
            </p>
            <p className="control">
              <button type="submit" className="button is-primary is-medium">
                <span className="icon">
                  <span className="mdi mdi-bell" />
                </span>
                <span>Avise-me</span>
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
