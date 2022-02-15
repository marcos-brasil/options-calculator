import styles from './index.module.css'

type Props = {
  children: JSX.Element | JSX.Element[]
}

export default function Card ({children}: Props) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}