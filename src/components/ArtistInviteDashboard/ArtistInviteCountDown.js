import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

function getSecondsRemaining(closedAt) {
  const remaining = moment(closedAt).unix() - moment().unix()
  return remaining < 0 ? 0 : remaining
}

class ArtistInviteCountDown extends React.PureComponent {
  static propTypes = {
    status: PropTypes.string.isRequired,
    openedAt: PropTypes.string.isRequired,
    closedAt: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = { secondsRemaining: getSecondsRemaining(props.closedAt) }
    this.timer = 0;
  }

  componentDidMount() {
    const { status } = this.props
    if (status === 'open') {
      this.interval = setInterval(this.tick, 1000)
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  tick = () => {
    const { closedAt } = this.props
    this.setState({ secondsRemaining: getSecondsRemaining(closedAt) })
  }

  countDown() {
    const { secondsRemaining } = this.state
    const pad = n => `${n}`.padStart(2, '0')
    const r = moment.duration(secondsRemaining, 'seconds')
    if (r.asDays() > 2.0) {
      return `${Math.floor(r.asDays())} Days Remaining`
    }
    return `${pad(r.hours())}:${pad(r.minutes())}:${pad(r.seconds())} Remaining`
  }

  renderByStatus() {
    const { status, openedAt } = this.props
    switch (status) {
      case 'preview':
      case 'upcoming':
        return ''
      case 'open':
        return this.countDown()
      case 'selecting':
        return 'Hold Tight'
      case 'closed':
        return moment(openedAt).format('MMMM YYYY')
      default:
        return ''
    }
  }

  render() {
    const { className } = this.props
    return (
      <span className="countdown">{this.renderByStatus()}</span>
    )
  }

}

export default ArtistInviteCountDown
