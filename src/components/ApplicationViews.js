import { Login } from "../auth/Login";
import { Register } from "../auth/Register";

export const ApplicationViews = () => {
  


    const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("yaheard_user") !== null)
  
    const setAuthUser = (user) => {
      sessionStorage.setItem("yaheard_user", JSON.stringify(user))
      setIsAuthenticated(sessionStorage.getItem("yaheard_user") !== null)
    }
  
    return (
        <>
        <div>
        <Route path="/login">
        <Login setAuthUser={setAuthUser} />
      </Route>

      <Route path="/register">
        <Register setAuthUser={setAuthUser} />
      </Route>
        </div>
        </>
    )
}