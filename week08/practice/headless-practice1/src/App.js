import '@radix-ui/themes/styles.css';
import PrimitivesExample from './components/PrimitivesExample';
import ThemeExample from './components/ThemeExample';
import './App.css';

function App() {
  return (
    <>
      <div style={{ width:300,height:50 }}>
        <PrimitivesExample></PrimitivesExample>
      </div>

      <div style={{ width:300,height:50 }}>
        <ThemeExample></ThemeExample>
      </div>
    </>
  );
}

export default App;