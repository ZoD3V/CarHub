
import Hero from '@/components/Hero'
import SearchBar from '@/components/SearchBar'
import {fetchCars} from "@/utils"
import Image from 'next/image'
import CarCard from '@/components/CarCard'
import {fuels,yearsOfProduction} from "@/constants"
import CustomFilter from '@/components/CustomFilter'

export default async function Home() {
  const allCars = await fetchCars(); 
  
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars

  return (
    <main className="overflow-hidden">
     <Hero/>

     <div className="mt-12 padding-x padding-y max-width" id="discover">
      <div className="home__text-container">
        <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
        <p>Explore the cars you might like</p>
      </div>

      <div className="home__filters">
        <SearchBar/>

        <div className="home__filter-container">
          <CustomFilter title="fuel" options={fuels}/>
          <CustomFilter title="year" options={yearsOfProduction}/>
        </div>
      </div>

      {
        !isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {
                allCars.map((item)=>(
                  <CarCard car={item}/>
                ))
              }
            </div>
          </section>
        ): (
          <div className="home__error-container">
            <div className="text-black text-xl font-bold">Oops,no results</div>
            <p>{allCars?.message}</p>
          </div>
        )
      }
     </div>
    </main>
  )
}
