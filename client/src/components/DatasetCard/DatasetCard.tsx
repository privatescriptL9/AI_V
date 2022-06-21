import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  ImgPreview,
  Name,
  Dropdown,
  Size,
  DetailsButton,
  Date
} from './styles'
import { BookOutlined, DownloadOutlined, StarOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { toLocaleDateString } from '../../pages/Profile/Profile'
import { Context } from '../../main'
import { useContext, useEffect, useState } from 'react'

interface IDatasetCard {
  id: number
  createdAt: Date
  updatedAt: Date
  name: string
  description: string
  size: number
  filesAmount: number
  archiveLink: string
  preview_image: string
}

function DatasetCard({
  id,
  createdAt,
  updatedAt,
  name,
  description,
  size,
  filesAmount,
  archiveLink,
  preview_image
}: IDatasetCard) {
  const navigate = useNavigate()
  const { datasetStore } = useContext(Context)
  const [isFavorite, setFavotire] = useState(false)

  useEffect(() => {
    const favoriteIds = datasetStore.favorites.map((item: any) => item.id)

    if (favoriteIds.includes(id)) {
      setFavotire(true)
    }
  }, [])

  const handleAddFavoriteClick = async () => {
    setFavotire(true)
    datasetStore.addToFavorite(id)
  }

  const handleRemoveFavoriteClick = async () => {
    setFavotire(false)
    datasetStore.removeFromFavorite(id)
  }

  const menu = (
    <Menu
      items={[
        {
          style: isFavorite
            ? {
                backgroundColor: '#B9B9B9'
              }
            : {},
          label: isFavorite ? 'Добавлено' : 'В избранное',
          key: '1',
          icon: isFavorite ? <StarOutlined /> : <BookOutlined />,
          onClick: isFavorite
            ? handleRemoveFavoriteClick
            : handleAddFavoriteClick
        },
        {
          label: 'Скачать',
          key: '2',
          icon: <DownloadOutlined />,
          onClick() {
            location.href = archiveLink
          }
        }
      ]}
    />
  )

  const handleDatasetClick = () => {
    navigate(`/data/${id}`)
  }

  return (
    <Container>
      <ImgPreview src={preview_image} alt="dataset_preview" />
      <Name>{name}</Name>
      <Dropdown overlay={menu} />
      <Size>Размер архива {size}</Size>
      <Date>Добавлен {toLocaleDateString(createdAt)}</Date>
      <DetailsButton onClick={handleDatasetClick}>
        Перейти на страницу
      </DetailsButton>
    </Container>
  )
}

export default observer(DatasetCard)
