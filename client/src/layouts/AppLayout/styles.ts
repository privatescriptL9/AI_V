import styled from 'styled-components'
import { Layout } from 'antd'

const { Header: HeaderAnt } = Layout

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  font-family: 'Kdam Thmor Pro', sans-serif;

  .trigger {
    padding: 0 0 0 1rem;
    font-size: 2rem;
    path {
      fill: #fff;
    }
  }
`

export const Header = styled(HeaderAnt)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Logo = styled.div`
  color: #fff;
  font-size: 2rem;
  padding: 1.4rem 1.4rem 1.4rem 2.5rem;
`

export const LeftBlock = styled.div`
  margin: 0 1rem 0 0;
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const Username = styled.div`
  color: #fff;
`
