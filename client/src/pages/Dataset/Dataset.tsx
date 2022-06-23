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
  Comments,
  CommentsWrapper
} from './styles'
import defaultPhoto from '../../assets/images/no-image.png'
import Comment from '../../components/Comment/Comment'
import { Button, Input } from 'antd'

function Dataset() {
  const params = useParams()
  const { store, datasetStore, commentStore } = useContext(Context)
  const [dataset, setDataset] = useState<any>()
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    const getDataset = async () => {
      const dataset = await datasetStore.getDatasetById(Number(params.id))
      setDataset(dataset)
    }

    getDataset()
    commentStore.getAll(Number(params.id))
  }, [])

  const handleAddComment = () => {
    if (value.trim()) {
      commentStore.addComment(store.user.id, Number(params.id), value)
      setValue('')
    }
  }

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
        <SubTitle>Комментарии</SubTitle>
        <CommentsWrapper>
          {commentStore.comments.map((comment: any) => (
            <Comment
              userId={comment.userId}
              text={comment.text}
              createdAt={comment.createdAt}
            />
          ))}
        </CommentsWrapper>

        <Input value={value} onChange={event => setValue(event.target.value)} />
        <Button
          type="primary"
          onClick={handleAddComment}
          style={{ marginTop: 10 }}
        >
          Добавить комментарий
        </Button>
      </Comments>
    </Container>
  )
}

export default observer(Dataset)
