import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Context } from '../../main'
import { Container, ImgPreview, DownloadButton, Title, Description } from './styles'

function Dataset() {
  const params = useParams()
  const { datasetStore } = useContext(Context)
  const [dataset, setDataset] = useState<any>()

  useEffect(() => {
    const getDataset = async () => {
      const dataset = await datasetStore.getDatasetById(Number(params.id))
      setDataset(dataset)
    }

    getDataset()
  }, [])

  return (
    <Container>
      <ImgPreview src={dataset?.preview_image} />
      <Title>{dataset?.name}</Title>
      <Description>{dataset?.description}</Description>
      {/* <div>{dataset?.filesAmount}</div> */}
      <DownloadButton onClick={() => (location.href = dataset?.archiveLink)}>
        Скачать [{dataset?.size}]
      </DownloadButton>
    </Container>
  )
}

export default observer(Dataset)
