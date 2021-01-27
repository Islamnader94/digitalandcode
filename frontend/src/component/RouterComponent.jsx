import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListUserComponent from "./teacher/ListTeachersComponent";
import AddUserComponent from "./teacher/AddTeachersComponent";
import EditUserComponent from "./teacher/ViewTeacherComponent";
import Login from "./teacher/Login";
import React from "react";

const AppRouter = () => {
    return(
        <div style={style}>
            <Router>
                    <Switch>
                        <Route path="/" exact component={ListUserComponent} />
                        <Route path="/teachers" component={ListUserComponent} />
                        <Route path="/add-teachers" component={AddUserComponent} />
                        <Route path="/view-teacher" component={EditUserComponent} />
                        <Route path="/login" component={Login} />
                    </Switch>
            </Router>
        </div>
    )
}

const style={
    marginTop:'20px'
}

export default AppRouter;