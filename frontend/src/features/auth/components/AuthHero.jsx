import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'

function AuthHero({ title, description}) {
    return (
        <div className='hero-img-bg p-5 text-white d-flex flex-column justify-content-end'>
            <h1 className='fs-1 fw-semi-bold lh-lg'>{ title }</h1>
            <p>{ description }</p>
        </div>
    )
}

export default AuthHero