import styled from 'styled-components'
import bg from '../../assets/images/bg.jpg'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #011e3c;
  display: grid;
  grid-template-columns: 45rem 1fr;
  background: url(${bg}) center/cover no-repeat;
  font-family: 'Kdam Thmor Pro', sans-serif;
`

export const FormCard = styled.div`
  max-width: 45rem;
  background-color: rgba(255, 255, 255, 0.9);
`

export const ABC = styled.h1`
  margin: 1rem 0 0;
  text-align: center;
  opacity: 0.8;
`

export const Name = styled.h1`
  text-align: center;
  opacity: 0.8;
  margin: 0 0 2rem;
`
