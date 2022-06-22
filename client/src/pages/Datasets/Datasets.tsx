import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { Context } from '../../main'
import { Container, CutText } from './styles'
import { Table, Tooltip } from 'antd'

function Datasets() {
  const { datasetStore } = useContext(Context)

  useEffect(() => {
    datasetStore.getAllDatasets()
  }, [])

  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Tooltip placement="bottom" title={text}>
          <CutText>{text}</CutText>
        </Tooltip>
      )
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => (
        <Tooltip placement="bottom" title={text}>
          <CutText>{text}</CutText>
        </Tooltip>
      )
    },
    {
      title: 'Размер',
      dataIndex: 'size',
      key: 'size'
    },
    {
      title: 'Колличество файлов',
      dataIndex: 'filesAmount',
      key: 'filesAmount'
    },
    {
      title: 'Ссылка на архив',
      dataIndex: 'archiveLink',
      key: 'archiveLink',
      render: (text: string) => (
        <Tooltip placement="bottom" title={text}>
          <CutText>{text}</CutText>
        </Tooltip>
      )
    },
    {
      title: 'Ссылка на фото',
      dataIndex: 'preview_image',
      key: 'preview_image',
      render: (text: string) => (
        <Tooltip placement="bottom" title={text}>
          <CutText>{text}</CutText>
        </Tooltip>
      )
    }
  ]

  return (
    <Container>
      <Table columns={columns} dataSource={datasetStore.datasets} />
    </Container>
  )
}

export default observer(Datasets)
