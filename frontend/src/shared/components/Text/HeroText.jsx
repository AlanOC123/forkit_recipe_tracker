import styles from './HeroText.module.css'
import { cn } from '../../utils'

function HeroText ({ text, ...classNames }) {

    return (
        <h1 className={cn('text-6xl md:text-7xl lg:text-8xl xl:text-9xl', classNames)}>{text}</h1>
    )
}

export default HeroText;