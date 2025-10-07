
import './Subscribe.css';

const SubscribePart = () => {
  return (
    <div className='subscribe-part'>
        <p id='first-p'>Never Miss a Blog!</p>
        <p id='second-p'>Subscribe to get the latest blog, new tech, and exclusive news.</p>
        <div className="subscribe-input" id='subscribe-input'>
            <input type="text" placeholder='Enter your email' />
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default SubscribePart