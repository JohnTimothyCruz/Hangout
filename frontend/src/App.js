import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import EventList from "./components/Events";
import GroupList from "./components/Groups";

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
          <Route path='/events'>
            <EventList />
          </Route>

          <Route path='/groups'>
            <GroupList />
          </Route>

          <Route path=''>
            <h1>Page not found</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
