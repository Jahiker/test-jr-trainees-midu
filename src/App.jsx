import { useState, useEffect } from 'react'

const API_CAR_RANDOM_FACT_URL = 'https://catfact.ninja/fact'
const API_CAT_IMAGE_PREFIX_URL = 'https://cataas.com'

export const App = () => {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    fetch(API_CAR_RANDOM_FACT_URL)
      .then(resp => resp.json())
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
  }, [])

  useEffect(() => {
    if (!fact) return

    const firstWord = fact.split(' ', 3).join(' ')

    fetch(`https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`)
      .then(resp => resp.json())
      .then(response => {
        const { url } = response
        setImageUrl(`${API_CAT_IMAGE_PREFIX_URL}${url}`)
      })
  }, [fact])

  return (
    <main className='flex flex-col items-center gap-8 p-6'>
      <h1 className='text-3xl font-bold underline text-purple-800'>App de gatitos</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={imageUrl} alt={`Image gotten by a cat fact for ${fact}`} className='rounded-xl shadow-md' />}
    </main>
  )
}
