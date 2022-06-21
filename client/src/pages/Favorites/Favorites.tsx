import { observer } from 'mobx-react-lite'
import { Container, NothingContainer } from './styles'
import { Empty } from 'antd'
import { Container as DatasetCardsContainer } from '../../components/DatasetCards/styles'
import DatasetCard from '../../components/DatasetCard/DatasetCard'
import { Context } from '../../main'
import { useContext, useEffect } from 'react'

function Favorites() {
  const { datasetStore } = useContext(Context)

  useEffect(() => {
    datasetStore.getAllFavorites()
  }, [])

  return (
    <Container>
      {datasetStore?.favorites?.length ? (
        <DatasetCardsContainer>
          {datasetStore?.favorites?.map((dataset: any) => (
            <DatasetCard key={dataset.id} {...dataset} />
          ))}
        </DatasetCardsContainer>
      ) : (
        <NothingContainer>
          <Empty
            description={
              <span style={{ color: '#1990FF' }}>Нет избранного</span>
            }
          />
        </NothingContainer>
      )}
    </Container>
  )
}

export default observer(Favorites)
