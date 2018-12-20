import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Auth from './Containers/Auth/Auth';
import QuizCreator from './Containers/QuizCreator/QuizCreator';
import QuizList from './Containers/QuizList/QuizList';
import Quiz from './Containers/Quiz/Quiz';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/quiz-creator" component={QuizCreator} />
            <Route path="/quiz/:id" component={Quiz} />
            <Route path="/" component={QuizList} />
          </Switch>

        </Layout>
      </div>
    );
  }
}

export default App;
