import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import EventList from "./components/Events";
import GroupList from "./components/Groups";
import MainPage from "./components/MainPage";
import SingleEvent from "./components/SingleEvent";
import SingleGroup from "./components/SingleGroup";
import CreateGroupForm from "./components/CreateGroupForm";
import CreateEvent from "./components/CreateEventForm";
import UpdateGroup from "./components/UpdateGroupForm";
import ProfilePage from "./components/ProfilePage";

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
          <Route path='/events/:id'>
            <SingleEvent />
          </Route>

          <Route path='/groups/:id/events/new'>
            <CreateEvent />
          </Route>

          <Route path='/groups/:id/edit'>
            <UpdateGroup />
          </Route>

          <Route path='/groups/new'>
            <CreateGroupForm />
          </Route>

          <Route path='/groups/:id'>
            <SingleGroup />
          </Route>

          <Route path='/events'>
            <EventList />
          </Route>

          <Route path='/groups'>
            <GroupList />
          </Route>

          <Route path='/profile/users/:id'>
            <ProfilePage />
          </Route>

          <Route exact path='/'>
            <MainPage />
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
