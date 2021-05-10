// import logo from './logo.svg';
import './App.css';
import React,{useState, useEffect} from "react";
import {
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Button,
  Typography,
  makeStyles
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';

// import { make } from 'acorn-walk';

const dict = new Map();

const useStyles = makeStyles(theme => (
  {
    FormControl:{
      minWidth:300,
      minHeight:100
    }
  }
))

export default function App() {
  const classes = useStyles();
  const [meal, setMeal] = useState("");
  const [fruit, setFruit] = useState("");
  const [fruit1, setFruit1] = useState("");
  const [fruit2, setFruit2] = useState("");
  const [fruit3, setFruit3] = useState("");
  const [popup, setPopup] = useState(false);

  const handleMealChange = e => {
    setMeal(e.target.value);
    updateFruits();
    setPopup(false);
    setFruit(fruit1);

  }
  const handleFruitChange = e => {
    setFruit(e.target.value);
    updateFruits();
    setPopup(false);
  }
  const handleSubmit = e => {
    // Stringify before inserting to dictionary
    const entry = JSON.stringify({
      meal: meal,
      fruit: fruit
    });
    if (!dict.has(entry)) {
      dict.set(entry, 1);
    } else {
      dict.set(entry, dict.get(entry) + 1);
    }
    updateFruits();
    setPopup(true);
  }

  const updateFruits = () => {
    let appleFreq = dict.get(JSON.stringify({meal: meal, fruit: "Apple"}));
    let bananaFreq = dict.get(JSON.stringify({meal: meal, fruit: "Banana"}));
    let orangeFreq = dict.get(JSON.stringify({meal: meal, fruit: "Orange"}));
    appleFreq = appleFreq ? appleFreq : 0;
    bananaFreq = bananaFreq ? bananaFreq : 0;
    orangeFreq = orangeFreq ? orangeFreq : 0;
    // Compare the three numbers
    if (bananaFreq >= orangeFreq && bananaFreq >= appleFreq) {
      setFruit1("Banana");
      if (orangeFreq >= appleFreq) {
        setFruit2("Orange");
        setFruit3("Apple");
      } else {
        setFruit2("Apple");
        setFruit3("Orange");
      }
    } else if (appleFreq >= orangeFreq && appleFreq >= bananaFreq) {
      setFruit1("Apple");
      if (orangeFreq >= bananaFreq) {
        setFruit2("Orange");
        setFruit3("Banana");
      } else {
        setFruit2("Banana");
        setFruit3("Orange");
      }
    } else if (orangeFreq >= appleFreq && orangeFreq >= bananaFreq) {
      setFruit1("Orange");
      if (appleFreq >= bananaFreq) {
        setFruit2("Apple");
        setFruit3("Banana");
      } else {
        setFruit2("Banana");
        setFruit3("Apple");
      }
    }
  };

  return (
    <div className="App" >
      <Typography style={{color: "purple", fontSize: "30px"}}>select from dropdown :)</Typography>
      <div className="firstDropdown">
      <FormControl className = {classes.FormControl}>
          <InputLabel>Meals</InputLabel>
          <Select value = {meal} onChange ={handleMealChange}>
            <MenuItem value = "Breakfast">Breakfast</MenuItem>
            <MenuItem value = "Lunch">Lunch</MenuItem>
            <MenuItem value = "Dinner">Dinner</MenuItem>
            </Select>
        </FormControl> 
      </div>
      <div className="secondDropdown">
      <FormControl className = {classes.FormControl}> 
          <InputLabel>Fruits</InputLabel>
          <Select value = {fruit} onChange = {handleFruitChange}>
            <MenuItem value = {fruit1}>{fruit1}</MenuItem>
            <MenuItem value = {fruit2}>{fruit2}</MenuItem>
            <MenuItem value = {fruit3}>{fruit3}</MenuItem>
          </Select> 
       
      </FormControl>
        </div>
      <div>
        <Button variant="outlined" onClick = {handleSubmit} color="primary" size="medium" type="submit">Submit</Button>
      </div>
      {popup &&
      <div style={{paddingTop: 50}}>
        <Alert style={{width: "40%", marginLeft: "auto", marginRight: "auto"}}
        variant="outlined"
        severity="success">Selection recorded</Alert>
      </div>}
    </div>
    
  );

}


// export default App;
