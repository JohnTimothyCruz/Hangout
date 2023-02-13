import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import EventList from "./components/Events";
import GroupList from "./components/Groups";
import MainPage from "./components/MainPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/events'>
            <EventList />
          </Route>

          <Route exact path='/groups'>
            <GroupList />
          </Route>

          <Route exact path='/'>
            <MainPage />
          </Route>

          <Route>
            <h1>Page not found</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
