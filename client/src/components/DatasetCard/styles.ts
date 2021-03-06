import styled from 'styled-components'
import { Dropdown as DropdownAnt } from 'antd'

export const Container = styled.div`
  min-width: 20rem;
  height: 32rem;
  border-radius: 1.6rem;
  border: 1px solid #fff;
  background-color: #fff;
  overflow: hidden;
  width: 25.6rem;
  display: flex;
  flex-direction: column;
  position: relative;
`

export const ImgPreview = styled.img`
  width: 100%;
  height: 10.8rem;
  object-fit: cover;
  margin: 0 0 1rem;
`

export const Name = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  overflow: hidden;
  margin: 0 0 0 1rem;
  padding: 0 0 2rem;
`

export const Dropdown = styled(DropdownAnt.Button)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`

export const Size = styled.div`
  margin: 0 0 0 1rem;
  font-size: 1.4rem;
`

export const Date = styled.div`
  margin: 0 0 0 1rem;
`

export const DetailsButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
  overflow: hidden;
  border-top: 1px solid #b9b9b9;
  background-color: #fff;
  transition: background-color 0.3s ease;
  margin: auto 0 0;

  &:hover {
    background-color: #e9e9e9;
  }
`
