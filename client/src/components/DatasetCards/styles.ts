import styled from 'styled-components'

export const Container = styled.div`
  grid-template-columns: repeat(auto-fill, minmax(224px, 1fr));
  display: grid;
  gap: 2.4rem;
  overflow-y: hidden;
  height: 32rem;
`

export const EmptyContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
`
