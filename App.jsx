/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import SearchBar from "./components/SearchBar"
import AddItem from "./AddItem";
import ItemsDisplay from "./components/ItemsDisplay";

function App() {
  const [filters, setFilters] = useState({});
  const [data, setData] = useState({ items: [] });

  const updateFilters = (searchParams) => {
    setFilters(searchParams);
  }

  useEffect(()=>{
     const showData = async() =>{
      
      const res = await fetch("http://localhost:3000/items")
      const data = await res.json()
      setData({items:data})  
  
     }
     showData()

  },[])

//   const addItemToDatas = (item) => {
//     let items = data["items"];

//     const requestOption = {
//       method:"POST",
//       headers:{
//         "Content-Type":"application/json"
//       },
//       body: JSON.stringify(item)
//     }
//     fetch("http://localhost:3000/items", requestOption).then((response)=>
//       response.json()
//     ).then((data) => {
//       items.push(data);
//       setData({ items: items });
//     })
// }


const deleteItem = async (item) =>{
  const items = data["items"]
  const res = await fetch(`http://localhost:3000/items/${item.id}`,{
    method: "DELETE"
  })
  if(res.ok){
    const idx = items.indexOf(item)
    items.splice(idx, 1)
    setData({items:items})
  }

}
const addItemToData =  async(item) =>{
  let items = data["items"];

  const res = await fetch("http://localhost:3000/items",{
    method:"POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(item)
  })
  const newItem = await res.json()
  items.push(newItem)
  setData({items: items})
}

  const filterData = (data) => {
    const filteredData = [];
    

    if (!filters.name) {
      return data;
    }

    for (const item of data) {
      if (filters.name !== "" && item.name !== filters.name) {
        continue;
      }
      if (filters.price !== 0 && item.price > filters.price) {
        continue;
      }
      if (filters.type !=="" && item.type !== filters.type) {
        continue;
      }
      if (filters.brand !== "" && item.brand !== filters.brand) {
        continue;
      }
      filteredData.push(item);
    }

    return filteredData;
  }

  return (
    <div className="container">
      <div className="row mt-3">
        <ItemsDisplay deleteItem={deleteItem} items={filterData(data["items"])} />
      </div>
      <div className="row mt-3">
        <SearchBar updateSearchParams={updateFilters} />
      </div>

      <div className="row mt-3">
        <AddItem addItem={addItemToData} />
      </div>
    </div>
  )
}

export default App;
