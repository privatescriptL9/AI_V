import { observer } from 'mobx-react-lite'
import { Container, EmptyContainer } from './styles'
import DatasetCard from '../DatasetCard/DatasetCard'
import { Empty } from 'antd'
import { Context } from '../../main'
import { useContext, useEffect } from 'react'

function DatasetCards({ data }: any) {
  const { datasetStore, store } = useContext(Context)

  useEffect(() => {
    datasetStore.setFavorites(store.user.favorites)
  }, [])

  return (
    <Container>
      {data?.length ? (
        data.map((dataset: any) => (
          <DatasetCard key={dataset.id} {...dataset} />
        ))
      ) : (
        <EmptyContainer>
          <Empty
            description={
              <span style={{ color: '#1990FF' }}>Ничего не найдено</span>
            }
          />
        </EmptyContainer>
      )}
    </Container>
  )
}

export default observer(DatasetCards)
