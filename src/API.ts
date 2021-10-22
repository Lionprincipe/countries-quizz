import axios from 'axios'
import { IData } from './types'

interface APIDataType {
  capital: string[]
  name: { official: string }
  flags: { svg: string }
}

export const fetchCoutriesData = async (): Promise<IData[]> => {
  const endpoint = 'https://restcountries.com/v3.1/all'
  const response: { data: APIDataType[] } = await axios.get(endpoint)
  return parseDataFromAPI(response.data)
}

function parseDataFromAPI<T extends APIDataType>(data: T[]): IData[] {
  return data.map(({ name, capital, flags }) => ({
    flag: flags ? flags.svg : '',
    name: name ? name.official : '',
    capital: capital ? capital[0] : '',
  }))
}
