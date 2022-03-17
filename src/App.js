import {useState} from "react";
import axios from "axios";


function App() {
  const SECRET_API_KEY = process.env.REACT_APP_API_KEY;
  const [data, setData] = useState(null);
  const onClick = async () => {
    try{
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${SECRET_API_KEY}`);
    setData(response.data);
    } catch(e){
      console.log(e);
    }
  };

  return (
    <div>
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && <textarea rows={7} value={JSON.stringify(data, null, 2)} readOnly={true} />}
    </div>
  );
}

export default App;
