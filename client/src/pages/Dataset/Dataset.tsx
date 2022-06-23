import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Context } from '../../main'
import { toLocaleDateString } from '../Profile/Profile'
import {
  Container,
  ImgPreview,
  DownloadButton,
  Title,
  Description,
  Header,
  SettingsContainer,
  Date,
  MainInfoContainer,
  Body,
  Column1,
  Column2,
  SubTitle,
  Property,
  Comments
} from './styles'
import defaultPhoto from '../../assets/images/no-image.png'

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
      <Header>
        <SettingsContainer>
          <Date>{toLocaleDateString(dataset?.createdAt)}</Date>
          <DownloadButton
            onClick={() => {
              datasetStore.addDownload(dataset.id)
              location.href = dataset?.archiveLink
            }}
          >
            Скачать [{dataset?.size}]
          </DownloadButton>
        </SettingsContainer>
        <MainInfoContainer>
          <Title>{dataset?.name}</Title>
          <ImgPreview src={dataset?.preview_image || defaultPhoto} />
        </MainInfoContainer>
      </Header>
      <Body>
        <Column1>
          <SubTitle>Описание набора данных</SubTitle>
          <Description>{dataset?.description}</Description>
        </Column1>
        <Column2>
          <Property>Размер архива: {dataset?.size}</Property>
          <Property>Колличество скачиваний: {dataset?.downloads}</Property>
          <Property>
            Колличетво файлов в архиве: {dataset?.filesAmount}
          </Property>
          <Property>
            Дата добавления: {toLocaleDateString(dataset?.createdAt)}
          </Property>
        </Column2>
      </Body>
      <Comments>

      </Comments>
    </Container>
  )
}

export default observer(Dataset)
