import { Search, SearchResult } from 'semantic-ui-react';
import './App.css';

import SearchQuery from './components/SearchQuery';
import SearchResults from './components/SearchResults';

function App() {
  return (
    <div>
      <SearchQuery />
      {/* <SearchResults /> */}
    </div>
  );
}

export default App;
