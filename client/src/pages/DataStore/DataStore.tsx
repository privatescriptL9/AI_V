import { observer } from 'mobx-react-lite'
import DatasetCards from '../../components/DatasetCards/DatasetCards'
import { SettingsContainer, Title, Result, FilterItem } from './styles'
import { Input, DatePicker, Divider } from 'antd'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Context } from '../../main'
import * as moment from 'moment'

const { RangePicker } = DatePicker

function DataStore() {
  const [value, setValue] = useState<string>('')
  const [start, setStart] = useState<any>(null)
  const [end, setEnd] = useState<any>(null)
  const { datasetStore } = useContext(Context)

  useEffect(() => {
    datasetStore.getAllDatasets()
  }, [])

  const searchedData = useMemo(() => {
    return datasetStore.datasets.filter((item: any) =>
      item.name.toLowerCase().includes(value.toLowerCase().trim())
    )
  }, [datasetStore.datasets, value])

  const filteredData = useMemo(() => {
    if (!start || !end) {
      return searchedData
    }

    return searchedData.filter((item: any) => {
      const date = moment(item.createdAt)
      console.log(date)
      return date >= start && date <= end
    })
  }, [searchedData, start, end])

  return (
    <div>
      <SettingsContainer>
        <Title>Поиск</Title>
        <Input
          placeholder="Поиск"
          width="300px"
          style={{ marginBottom: '1rem' }}
          value={value}
          onChange={event => setValue(event.target.value)}
        />
        <Title>Фильтры</Title>
        <FilterItem>
          <div>Сортировка по дате</div>
          <RangePicker
            placeholder={['Начальная дата', 'Конечная дата']}
            allowEmpty={[true, true]}
            value={[start, end]}
            onChange={(dates: any, dateStrings) => {
              setStart(dates[0])
              setEnd(dates[1])
            }}
            disabledDate={currentDate => Number(currentDate) > Date.now()}
          />
        </FilterItem>
      </SettingsContainer>
      <Divider style={{ borderColor: '#000' }}>
        <Result>Результат поиска</Result>
      </Divider>
      <DatasetCards data={filteredData} />
    </div>
  )
}

export default observer(DataStore)
