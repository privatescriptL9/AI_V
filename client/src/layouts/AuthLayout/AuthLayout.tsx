import { Outlet } from 'react-router-dom'
import { Container, FormCard, Name, ABC } from './styles'

export default function AuthLayout() {
  return (
    <Container>
      <FormCard>
        <ABC>AI_V</ABC>
        <Name>Artificial Intelligence Vault</Name>
        <Outlet />
      </FormCard>
    </Container>
  )
}
