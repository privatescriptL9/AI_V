import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { Context } from '../../main'
import { Container, CutText, Title } from './styles'
import { Table, Tooltip as TooltipAnt } from 'antd'
import { toLocaleDateString } from '../Profile/Profile'
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from 'recharts'

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
        <TooltipAnt placement="bottom" title={text}>
          <CutText>{text}</CutText>
        </TooltipAnt>
      )
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => (
        <TooltipAnt placement="bottom" title={text}>
          <CutText>{text}</CutText>
        </TooltipAnt>
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
        <TooltipAnt placement="bottom" title={text}>
          <CutText>{text}</CutText>
        </TooltipAnt>
      )
    },
    {
      title: 'Ссылка на фото',
      dataIndex: 'preview_image',
      key: 'preview_image',
      render: (text: string) => (
        <TooltipAnt placement="bottom" title={text}>
          <CutText>{text}</CutText>
        </TooltipAnt>
      )
    },
    {
      title: 'Дата загрузки',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: any) => (
        <TooltipAnt placement="bottom" title={text}>
          <CutText>{toLocaleDateString(text)}</CutText>
        </TooltipAnt>
      )
    }
  ]

  const data = datasetStore.datasets.map((dataset: any) => {
    return {
      name: dataset.name,
      downloads: dataset.downloads
    }
  })

  return (
    <Container>
      <Table columns={columns} dataSource={datasetStore.datasets} />
      <Title>Колличество скачиваний наборов данных</Title>
      <BarChart width={1000} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" allowDecimals={false} />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="downloads" fill="#8884d8" />
      </BarChart>
    </Container>
  )
}

export default observer(Datasets)
