import styled from 'styled-components'

export const Container = styled.div``

export const TopContainer = styled.div`
  display: flex;
  gap: 2rem;
`

export const Info = styled.div`
  font-size: 2rem;
`

export const AvatarContainer = styled.div`
  max-width: 25rem;
  max-height: 25rem;
  position: relative;
`

export const ChangeAvatar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #001628;
  position: absolute;
  top: 0;
  opacity: 0;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`
