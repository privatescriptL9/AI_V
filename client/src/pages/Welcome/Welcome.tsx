import { Container, MainInfo, Logo } from './styles'

function Welcome() {
  return (
    <Container>
      <Logo>Artificial Intelligence Vault</Logo>
      <MainInfo>
        Добро пожаловать на стартовую страницу приложения "AI_V" для хранения
        наборов данных, используемых с целью обучения нейросетей. Для того чтобы
        начать работать с приложением для начала необходимо{' '}
        <a href='/register'>зарегистрировать новый аккаунт</a>
      </MainInfo>
    </Container>
  )
}

export default Welcome
