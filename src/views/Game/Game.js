import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import People from "@material-ui/icons/People";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";
import loadingImg from "assets/img/loading_orange_pink.gif";

const useStyles = makeStyles(styles);

export default function Game(props) {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const [msg2user, setMsg2User] = useState("Por gentileza, preencha os campos");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [dt1, setDt1] = useState('');
  const [dt2, setDt2] = useState('');
  const [scoreGlobal, setScoreGlobal] = useState('');

  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  function handleClick(e) {
    e.preventDefault();
    const firstNameInputValue = document.getElementById('firstName').value;
    const dt1InputValue = document.getElementById('dt1').value;
    const secondNameInputValue = document.getElementById('secondName').value;
    const dt2InputValue = document.getElementById('dt2').value;
    
    if ( !firstNameInputValue.trim() ) {
        setMsg2User('Precisamos do nome da primeira pessoa');
        return
    }
    if ( !dt1InputValue.trim() ) {
        setMsg2User('Precisamos do nascimento da primeira pessoa');
        return
    }
    if ( !secondNameInputValue.trim() ) {
        setMsg2User('Precisamos do nome da segunda pessoa');
        return
    }
    if ( !dt2InputValue.trim() ) {
        setMsg2User('Precisamos do nascimento da segunda pessoa');
        return
    }

    setLoading(true);
    
    console.log('firstName: '+firstNameInputValue);
    console.log('dt1: '+dt1InputValue);
    console.log('secondName: '+secondNameInputValue);
    console.log('dt2: '+dt2InputValue);

    setFirstName(firstNameInputValue);
    setSecondName(secondNameInputValue);
    setDt1(dt1InputValue);
    setDt2(dt2InputValue);

    // O algoritmo
    const diffD = diffDates(dt1InputValue, dt2InputValue);
    const levenshtein = levenshteinDistance(firstNameInputValue, secondNameInputValue);
    let sum = 0;
    let divisor = 1;
    if (diffD > levenshtein) {
        sum = diffD;
        if (levenshtein === 0) {
            divisor = 1;
        } else {
            divisor = levenshtein;
        }
    } else {
        sum = levenshtein;
        if (diffD === 0) {
            divisor = 1;
        } else {
            divisor = diffD;
        }
    }
    const divisao = sum / divisor;

    let score = divisao;
    while (score > 100) {
        if (divisor < 2) {
          divisor = 2;
        }
        score = score / divisor;
    }
    console.log('score final: ', score);
    score = roundToTwo(score);
    const porcent = 100.00 - score;
    setScoreGlobal(porcent);

    setTimeout(function() {
        setLoading(false);
        setResult(true);
    }, 5000);


  }

  function resetState(e) {
    e.preventDefault();
    setLoading(false);
    setResult(false);
  }


  function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
  }

  function diffDates(dt1, dt2) {
    var date1 = new Date(dt1);
    var date2 = new Date(dt2);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }

  function levenshteinDistance(a, b) {
    // Ref.: https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/string/levenshtein-distance
    const distanceMatrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
  
    for (let i = 0; i <= a.length; i += 1) {
      distanceMatrix[0][i] = i;
    }
  
    for (let j = 0; j <= b.length; j += 1) {
      distanceMatrix[j][0] = j;
    }
  
    for (let j = 1; j <= b.length; j += 1) {
      for (let i = 1; i <= a.length; i += 1) {
        const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
        distanceMatrix[j][i] = Math.min(
          distanceMatrix[j][i - 1] + 1, // deletion
          distanceMatrix[j - 1][i] + 1, // insertion
          distanceMatrix[j - 1][i - 1] + indicator, // substitution
        );
      }
    }
  
    return distanceMatrix[b.length][a.length];
  }

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Matching Game"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Matching Game</h4>
                  </CardHeader>
                  <CardBody>
                    { loading 
                        ? <div 
                            id='loading'
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        > 
                            <img src={loadingImg} width='400px' height='300px'  alt="loadingImg" />
                        </div>
                        : null
                    }
                    { (!loading && !result)
                        ? <div id='formDiv'>
                            <p className={classes.divider}>Nos informe nome e data de nascimento</p>
                            <h5>Primeira Pessoa</h5>
                            <CustomInput
                            labelText="Nome da primeira pessoa..."
                            id='firstName'
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "text",
                                endAdornment: (
                                <InputAdornment position="end">
                                    <People className={classes.inputIconsColor} />
                                </InputAdornment>
                                )
                            }}
                            />
                            <CustomInput
                            id="dt1"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "date",
                                endAdornment: (
                                <InputAdornment position="end">
                                    <CalendarTodayIcon className={classes.inputIconsColor} />
                                </InputAdornment>
                                )
                            }}
                            />
                            <h5>Segunda Pessoa</h5>
                            <CustomInput
                            labelText="Nome da segunda pessoa..."
                            id="secondName"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "text",
                                endAdornment: (
                                <InputAdornment position="end">
                                    <People className={classes.inputIconsColor} />
                                </InputAdornment>
                                )
                            }}
                            />
                            <CustomInput
                            id="dt2"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "date",
                                endAdornment: (
                                <InputAdornment position="end">
                                    <CalendarTodayIcon className={classes.inputIconsColor} />
                                </InputAdornment>
                                )
                            }}
                            />
                            <div 
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <div id="msgToUser">{msg2user}</div>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <Button round color="primary" size="lg" onClick={handleClick}>
                                    Verificar
                                </Button>
                            </div>
                        </div>
                        : null
                    }
                    {
                        (!loading && result)
                        ? <div id='result'>
                            <div id='resultMsg'>
                                <h4>Resultado do Match</h4>
                                <p>
                                    <b>{scoreGlobal}%</b><br></br>
                                    Participantes: <br></br>
                                    {firstName} ({dt1}) <br></br>
                                    {secondName} ({dt2})
                                </p>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <Button round color="primary" size="lg" onClick={resetState}>
                                    Jogar novamente
                                </Button>
                            </div>
                        </div>
                        : null
                    }
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    {/*
                    <Button round color="primary" size="lg" onClick={handleClick}>
                      Verificar
                    </Button>
                    */}
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
          <Footer whiteFont />
        </div>
    </div>
  );
}