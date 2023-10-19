import ListHeader from './components/ListHeader'
import { useEffect, useState } from 'react'
import ListItem from './components/ListItem'
import Auth from './components/Auth'
import { useCookies } from 'react-cookie'


const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const userEmail = cookies.Email
  const authToken = cookies.AuthToken
  const [ tasks, setTasks ] = useState(null)

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
      const json = await response.json()
      setTasks(json)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => getData, {
    if (authToken) {
      getData()
    }
  }
,[])

  console.log(tasks)

  // Sort by date
  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))


  return (
    <div className="app">

      {!authToken && <Auth/>}
      {authToken &&
        <>
      <ListHeader listName={'📋 Task List'} getData={getData} />
      <p className="user-email">Welcome back {userEmail}</p>
      {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
      </>}
      <p className="copyright">© Trendy Tasks LLC</p>
    </div>
  )
}

export default App
