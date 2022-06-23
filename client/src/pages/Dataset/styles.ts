import styled from 'styled-components'

export const Container = styled.div``

export const ImgPreview = styled.img`
  border: 0px;
  border-radius: 1.2rem;
  object-fit: cover;
  overflow: hidden;
  height: 14.2rem;
  width: 28.1rem;
`

export const DownloadButton = styled.div`
  padding: 1rem;
  font-size: 2rem;
  border: 0.2rem solid #000;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  white-space: nowrap;
  width: fit-content;

  &:hover {
    background: #b9b9b9;
  }
`

export const Title = styled.div`
  font-size: 3rem;
  margin: 2rem 0;
`

export const Description = styled.div``

export const Header = styled.div`
  min-height: 30rem;
  border-bottom: 1px solid #000;
  margin: 0 10rem;
`

export const SettingsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Date = styled.div`
  padding: 1rem;
  font-size: 2rem;
  border: 0.2rem dashed #000;
  border-radius: 0.5rem;
`

export const MainInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 3rem 0 0;
`

export const Body = styled.div`
  display: flex;
  gap: 2rem;
  min-height: 30rem;
  margin: 2rem 10rem 0 10rem;
  border-bottom: 1px solid #000;
`

export const Column1 = styled.div`
  width: 70%;
  height: 100%;
`

export const Column2 = styled.div`
  width: 30%;
  height: 100%;
`

export const SubTitle = styled.div`
  font-size: 2rem;
  margin: 0 0 2rem;
  font-weight: bold;
`

export const Property = styled.div`
  font-size: 1.5rem;
`

export const Comments = styled.div`
  min-height: 40rem;
`
