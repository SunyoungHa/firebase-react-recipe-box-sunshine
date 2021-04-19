import React from 'react';
//import GetFirebase from './GetFirebase';
//import SnapshotFirebase from './SnapshotFirebase';
import { AuthProvider } from './auth/Auth';
// import Login from './auth/Login';
import RecipeBox from './components/RecipeBox'


function App() {
  //const get = false;

  return (
    <>
          <AuthProvider>

      <h1>React Recipe box - Freecodecamp</h1>
        <p>Create, edit, delete your recipes. Uses session storage so that a page refresh will keep stored data (but not after page close)</p>
        <br />
        <RecipeBox />
</AuthProvider>
    </>
  );
}

export default App;

