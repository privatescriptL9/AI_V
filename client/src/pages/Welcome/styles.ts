import styled from 'styled-components'
import welcome from '../../assets/images/welcome.jpg'

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Kdam Thmor Pro', sans-serif;
  gap: 5rem;
  background: url(${welcome}) no-repeat center/cover;
`

export const MainInfo = styled.div`
  width: 70rem;
  padding: 2rem;
  color: white;
  font-size: 2rem;
  height: 40rem;
  background-color: rgba(255, 255, 255, 0.5);

  a {
    color: yellow;
    opacity: 1;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.5;
    }
  }
`

export const Logo = styled.div`
  font-size: 3rem;
  color: white;
`
